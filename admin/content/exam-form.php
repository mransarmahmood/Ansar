<?php
require_once __DIR__ . '/../includes/auth.php';
require_login();
require_once __DIR__ . '/../includes/config.php';
require_once __DIR__ . '/../includes/layout.php';

$pdo = exam_pdo();
$id = (int)($_GET['id'] ?? 0);

$exam = ['id'=>0,'title'=>'','description'=>'','instructions'=>'','time_limit'=>30,'pass_mark'=>50,
         'status'=>'draft','shuffle_questions'=>0,'shuffle_options'=>0];
$questions = [];

if ($id) {
    $row = $pdo->prepare("SELECT * FROM exams WHERE id=?");
    $row->execute([$id]);
    $row = $row->fetch();
    if ($row) $exam = $row;

    $qStmt = $pdo->prepare("SELECT q.*, GROUP_CONCAT(o.id,'::',o.option_text,'::',o.is_correct,'::',o.sort_order ORDER BY o.sort_order,o.id SEPARATOR '||') AS opts_raw FROM exam_questions q LEFT JOIN exam_question_options o ON o.question_id=q.id WHERE q.exam_id=? GROUP BY q.id ORDER BY q.sort_order,q.id");
    $qStmt->execute([$id]);
    foreach ($qStmt->fetchAll() as $q) {
        $opts = [];
        if ($q['opts_raw']) {
            foreach (explode('||', $q['opts_raw']) as $o) {
                [$oid,$otxt,$ocorr,$osort] = explode('::', $o, 4);
                $opts[] = ['id'=>$oid,'text'=>$otxt,'correct'=>(bool)(int)$ocorr,'sort'=>$osort];
            }
        }
        $questions[] = ['id'=>$q['id'],'text'=>$q['question_text'],'type'=>$q['question_type'],'marks'=>$q['marks'],'sort'=>$q['sort_order'],'opts'=>$opts];
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    verify_csrf();
    $title    = trim($_POST['title'] ?? '');
    $desc     = trim($_POST['description'] ?? '');
    $instr    = trim($_POST['instructions'] ?? '');
    $timeL    = max(0,(int)($_POST['time_limit'] ?? 30));
    $passM    = min(100,max(1,(int)($_POST['pass_mark'] ?? 50)));
    $status   = in_array($_POST['status']??'',['draft','active','archived']) ? $_POST['status'] : 'draft';
    $shuffleQ = isset($_POST['shuffle_questions']) ? 1 : 0;
    $shuffleO = isset($_POST['shuffle_options']) ? 1 : 0;

    if (!$title) { set_flash('error','Exam title is required.'); }
    else {
        if ($id) {
            $pdo->prepare("UPDATE exams SET title=?,description=?,instructions=?,time_limit=?,pass_mark=?,status=?,shuffle_questions=?,shuffle_options=?,updated_at=NOW() WHERE id=?")
                ->execute([$title,$desc,$instr,$timeL,$passM,$status,$shuffleQ,$shuffleO,$id]);
        } else {
            $pdo->prepare("INSERT INTO exams (title,description,instructions,time_limit,pass_mark,status,shuffle_questions,shuffle_options) VALUES (?,?,?,?,?,?,?,?)")
                ->execute([$title,$desc,$instr,$timeL,$passM,$status,$shuffleQ,$shuffleO]);
            $id = (int)$pdo->lastInsertId();
        }

        $qTexts  = $_POST['q_text']   ?? [];
        $qTypes  = $_POST['q_type']   ?? [];
        $qMarks  = $_POST['q_marks']  ?? [];
        $qIds    = $_POST['q_id']     ?? [];
        $oTexts  = $_POST['o_text']   ?? [];
        $oCorrect= $_POST['o_correct']?? [];

        $existingQ = $pdo->prepare("SELECT id FROM exam_questions WHERE exam_id=?");
        $existingQ->execute([$id]);
        $existingQIds = array_column($existingQ->fetchAll(), 'id');

        $submittedQIds = [];
        foreach ($qTexts as $qi => $qtext) {
            $qtext = trim($qtext);
            if (!$qtext) continue;
            $qtype = in_array($qTypes[$qi]??'',['multiple_choice','true_false']) ? $qTypes[$qi] : 'multiple_choice';
            $qmarks = max(1,(int)($qMarks[$qi]??1));
            $qid_existing = (int)($qIds[$qi] ?? 0);

            if ($qid_existing && in_array($qid_existing, $existingQIds)) {
                $pdo->prepare("UPDATE exam_questions SET question_text=?,question_type=?,marks=?,sort_order=? WHERE id=? AND exam_id=?")
                    ->execute([$qtext,$qtype,$qmarks,$qi,$qid_existing,$id]);
                $qdb = $qid_existing;
            } else {
                $pdo->prepare("INSERT INTO exam_questions (exam_id,question_text,question_type,marks,sort_order) VALUES (?,?,?,?,?)")
                    ->execute([$id,$qtext,$qtype,$qmarks,$qi]);
                $qdb = (int)$pdo->lastInsertId();
            }
            $submittedQIds[] = $qdb;

            $theOpts = $oTexts[$qi] ?? [];
            $correctIdx = isset($oCorrect[$qi]) ? (int)$oCorrect[$qi] : -1;
            $pdo->prepare("DELETE FROM exam_question_options WHERE question_id=?")->execute([$qdb]);

            foreach ($theOpts as $oi => $otxt) {
                $otxt = trim($otxt);
                if (!$otxt) continue;
                $isCorrect = ($oi === $correctIdx) ? 1 : 0;
                $pdo->prepare("INSERT INTO exam_question_options (question_id,option_text,is_correct,sort_order) VALUES (?,?,?,?)")
                    ->execute([$qdb,$otxt,$isCorrect,$oi]);
            }
        }

        $toDelete = array_diff($existingQIds, $submittedQIds);
        foreach ($toDelete as $dqid) {
            $pdo->prepare("DELETE FROM exam_questions WHERE id=?")->execute([$dqid]);
        }

        set_flash('success', $title . ' saved successfully.');
        header('Location: exam-form.php?id=' . $id); exit;
    }
}

$pageTitle = $id ? 'Edit Exam' : 'Create Exam';
admin_head($pageTitle, 'content/exam-form');
admin_topbar($pageTitle, '', ['<a href="exams.php" class="btn btn--outline"><i class="fas fa-arrow-left"></i> Back to Exams</a>']);
?>

<form method="POST" id="examForm">
  <?= csrf_field() ?>

  <div style="display:grid;grid-template-columns:1fr 300px;gap:20px;align-items:start;">
    <div>
      <!-- Exam Details -->
      <div class="card" style="margin-bottom:20px;">
        <h3 style="margin-bottom:16px;font-size:15px;color:var(--navy);"><i class="fas fa-info-circle" style="color:var(--teal);"></i> Exam Details</h3>
        <div class="form-group">
          <label class="form-label">Exam Title *</label>
          <input type="text" name="title" class="form-control" value="<?= e($exam['title']) ?>" required placeholder="e.g. IOSH Managing Safely Assessment">
        </div>
        <div class="form-group">
          <label class="form-label">Description</label>
          <textarea name="description" class="form-control" rows="2" placeholder="Brief description..."><?= e($exam['description'] ?? '') ?></textarea>
        </div>
        <div class="form-group">
          <label class="form-label">Instructions</label>
          <textarea name="instructions" class="form-control" rows="3" placeholder="Instructions shown before exam starts..."><?= e($exam['instructions'] ?? '') ?></textarea>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;">
          <div class="form-group">
            <label class="form-label">Time Limit (min)</label>
            <input type="number" name="time_limit" class="form-control" value="<?= (int)$exam['time_limit'] ?>" min="0">
            <small style="color:var(--text-muted);">0 = no limit</small>
          </div>
          <div class="form-group">
            <label class="form-label">Pass Mark (%)</label>
            <input type="number" name="pass_mark" class="form-control" value="<?= (int)$exam['pass_mark'] ?>" min="1" max="100" required>
          </div>
          <div class="form-group">
            <label class="form-label">Status</label>
            <select name="status" class="form-control">
              <option value="draft" <?= ($exam['status']??'draft')==='draft'?'selected':'' ?>>Draft</option>
              <option value="active" <?= ($exam['status']??'')==='active'?'selected':'' ?>>Active</option>
              <option value="archived" <?= ($exam['status']??'')==='archived'?'selected':'' ?>>Archived</option>
            </select>
          </div>
        </div>
        <div style="display:flex;gap:20px;margin-top:8px;">
          <label style="display:flex;align-items:center;gap:6px;font-size:13px;cursor:pointer;">
            <input type="checkbox" name="shuffle_questions" <?= !empty($exam['shuffle_questions'])?'checked':'' ?>> Shuffle questions
          </label>
          <label style="display:flex;align-items:center;gap:6px;font-size:13px;cursor:pointer;">
            <input type="checkbox" name="shuffle_options" <?= !empty($exam['shuffle_options'])?'checked':'' ?>> Shuffle options
          </label>
        </div>
      </div>

      <!-- Questions -->
      <div class="card" style="margin-bottom:20px;">
        <h3 style="margin-bottom:16px;font-size:15px;color:var(--navy);"><i class="fas fa-list" style="color:var(--teal);"></i> Questions</h3>
        <div id="questionsContainer">
          <?php foreach ($questions as $qi => $q):
            $correctOptIdx = -1;
            foreach ($q['opts'] as $oi => $o) if ($o['correct']) { $correctOptIdx=$oi; break; }
          ?>
          <div class="question-block" data-qi="<?= $qi ?>" style="border:1px solid var(--border);border-radius:var(--radius);padding:14px;margin-bottom:14px;">
            <input type="hidden" name="q_id[<?= $qi ?>]" value="<?= (int)$q['id'] ?>">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">
              <span style="background:var(--navy);color:#fff;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;flex-shrink:0;">Q<?= $qi+1 ?></span>
              <input type="text" name="q_text[<?= $qi ?>]" class="form-control" value="<?= e($q['text']) ?>" placeholder="Question text..." required style="flex:1;">
              <select name="q_type[<?= $qi ?>]" class="form-control" style="width:150px;" onchange="renderOpts(<?= $qi ?>)">
                <option value="multiple_choice" <?= $q['type']==='multiple_choice'?'selected':'' ?>>Multiple Choice</option>
                <option value="true_false" <?= $q['type']==='true_false'?'selected':'' ?>>True / False</option>
              </select>
              <input type="number" name="q_marks[<?= $qi ?>]" class="form-control" style="width:60px;" value="<?= (int)$q['marks'] ?>" min="1" title="Marks">
              <button type="button" class="btn btn--sm btn--danger" onclick="removeQuestion(this)"><i class="fas fa-trash"></i></button>
            </div>
            <div class="opts-wrap" data-qi="<?= $qi ?>" style="margin-left:36px;">
              <?php if ($q['type'] === 'true_false'): ?>
              <div style="display:flex;gap:16px;margin-top:6px;">
                <?php foreach ([['True',0],['False',1]] as $oi=>[$label,$val]): ?>
                <label style="display:flex;align-items:center;gap:6px;font-size:13px;cursor:pointer;">
                  <input type="radio" name="o_correct[<?= $qi ?>]" value="<?= $oi ?>" <?= $correctOptIdx===$oi?'checked':'' ?>>
                  <?= $label ?>
                  <input type="hidden" name="o_text[<?= $qi ?>][<?= $oi ?>]" value="<?= $label ?>">
                </label>
                <?php endforeach; ?>
                <small style="color:var(--text-muted);">(select correct answer)</small>
              </div>
              <?php else: ?>
              <div class="mc-opts" data-qi="<?= $qi ?>">
                <?php foreach ($q['opts'] as $oi => $o): ?>
                <div class="opt-row" style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
                  <input type="radio" name="o_correct[<?= $qi ?>]" value="<?= $oi ?>" <?= $correctOptIdx===$oi?'checked':'' ?> title="Mark as correct">
                  <input type="text" name="o_text[<?= $qi ?>][<?= $oi ?>]" class="form-control" value="<?= e($o['text']) ?>" placeholder="Option text..." style="flex:1;">
                  <button type="button" class="btn btn--sm btn--outline" onclick="removeOpt(this)"><i class="fas fa-minus"></i></button>
                </div>
                <?php endforeach; ?>
              </div>
              <button type="button" class="btn btn--sm btn--outline" onclick="addOpt(<?= $qi ?>)" style="margin-top:4px;"><i class="fas fa-plus"></i> Add Option</button>
              <?php endif; ?>
            </div>
          </div>
          <?php endforeach; ?>
        </div>
        <button type="button" class="btn btn--primary" onclick="addQuestion()" style="width:100%;margin-top:8px;">
          <i class="fas fa-plus"></i> Add Question
        </button>
      </div>
    </div>

    <!-- Sidebar -->
    <div>
      <div class="card">
        <h3 style="margin-bottom:12px;font-size:15px;color:var(--navy);">Save</h3>
        <button type="submit" class="btn btn--primary" style="width:100%;margin-bottom:8px;"><i class="fas fa-save"></i> Save Exam</button>
        <?php if ($id): ?>
        <a href="exam-access.php?exam=<?= $id ?>" class="btn btn--outline" style="width:100%;margin-bottom:8px;display:block;text-align:center;"><i class="fas fa-key"></i> Manage Access</a>
        <?php endif; ?>
        <a href="exams.php" class="btn btn--outline" style="width:100%;display:block;text-align:center;">Cancel</a>
        <hr style="margin:14px 0;border:0;border-top:1px solid var(--border);">
        <small style="color:var(--text-muted);"><i class="fas fa-info-circle"></i> Set status to <strong>Active</strong> for subscribers to see the exam.</small>
      </div>
    </div>
  </div>
</form>

<script>
let qCount = <?= count($questions) ?>;

function addQuestion(){
    const qi=qCount++;
    const block=document.createElement('div');
    block.className='question-block';
    block.dataset.qi=qi;
    block.style.cssText='border:1px solid var(--border);border-radius:var(--radius);padding:14px;margin-bottom:14px;';
    block.innerHTML=`
        <input type="hidden" name="q_id[${qi}]" value="0">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">
            <span style="background:var(--navy);color:#fff;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;flex-shrink:0;">Q${qCount}</span>
            <input type="text" name="q_text[${qi}]" class="form-control" placeholder="Question text..." required style="flex:1;">
            <select name="q_type[${qi}]" class="form-control" style="width:150px;" onchange="renderOpts(${qi})">
                <option value="multiple_choice">Multiple Choice</option>
                <option value="true_false">True / False</option>
            </select>
            <input type="number" name="q_marks[${qi}]" class="form-control" style="width:60px;" value="1" min="1" title="Marks">
            <button type="button" class="btn btn--sm btn--danger" onclick="removeQuestion(this)"><i class="fas fa-trash"></i></button>
        </div>
        <div class="opts-wrap" data-qi="${qi}" style="margin-left:36px;">
            <div class="mc-opts" data-qi="${qi}">
                ${optRow(qi,0)}${optRow(qi,1)}${optRow(qi,2)}${optRow(qi,3)}
            </div>
            <button type="button" class="btn btn--sm btn--outline" onclick="addOpt(${qi})" style="margin-top:4px;"><i class="fas fa-plus"></i> Add Option</button>
        </div>`;
    document.getElementById('questionsContainer').appendChild(block);
}

function optRow(qi,oi){
    return `<div class="opt-row" style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
        <input type="radio" name="o_correct[${qi}]" value="${oi}" title="Mark as correct">
        <input type="text" name="o_text[${qi}][${oi}]" class="form-control" placeholder="Option text..." style="flex:1;">
        <button type="button" class="btn btn--sm btn--outline" onclick="removeOpt(this)"><i class="fas fa-minus"></i></button>
    </div>`;
}

function addOpt(qi){
    const mc=document.querySelector(`.mc-opts[data-qi="${qi}"]`);
    const oi=mc.querySelectorAll('.opt-row').length;
    const div=document.createElement('div');
    div.innerHTML=optRow(qi,oi);
    mc.appendChild(div.firstElementChild);
}

function removeOpt(btn){
    const row=btn.closest('.opt-row');
    const mc=row.closest('.mc-opts');
    if(mc.querySelectorAll('.opt-row').length<=2){alert('Minimum 2 options.');return;}
    row.remove();
}

function removeQuestion(btn){
    if(!confirm('Remove this question?'))return;
    btn.closest('.question-block').remove();
}

function renderOpts(qi){
    const sel=document.querySelector(`select[name="q_type[${qi}]"]`);
    const wrap=document.querySelector(`.opts-wrap[data-qi="${qi}"]`);
    if(sel.value==='true_false'){
        wrap.innerHTML=`<div style="display:flex;gap:16px;margin-top:6px;">
            <label style="display:flex;align-items:center;gap:6px;font-size:13px;cursor:pointer;"><input type="radio" name="o_correct[${qi}]" value="0"> True<input type="hidden" name="o_text[${qi}][0]" value="True"></label>
            <label style="display:flex;align-items:center;gap:6px;font-size:13px;cursor:pointer;"><input type="radio" name="o_correct[${qi}]" value="1"> False<input type="hidden" name="o_text[${qi}][1]" value="False"></label>
            <small style="color:var(--text-muted);">(select correct answer)</small></div>`;
    } else {
        wrap.innerHTML=`<div class="mc-opts" data-qi="${qi}">${optRow(qi,0)}${optRow(qi,1)}${optRow(qi,2)}${optRow(qi,3)}</div>
            <button type="button" class="btn btn--sm btn--outline" onclick="addOpt(${qi})" style="margin-top:4px;"><i class="fas fa-plus"></i> Add Option</button>`;
    }
}
</script>

<?php admin_foot(); ?>
