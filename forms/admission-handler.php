<?php
/* ================================================================
   ANSAR MAHMOOD — Course Admission Form Handler
   Logs applications to CSV and sends notification email
   ================================================================ */

header('Content-Type: application/json');
header('X-Content-Type-Options: nosniff');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
    exit;
}

// AJAX-only
if (empty($_SERVER['HTTP_X_REQUESTED_WITH']) ||
    strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) !== 'xmlhttprequest') {
    http_response_code(403);
    echo json_encode(['success' => false, 'message' => 'Forbidden.']);
    exit;
}

// Honeypot
if (!empty($_POST['website'])) {
    echo json_encode(['success' => true, 'message' => 'Application received.']);
    exit;
}

// ── Sanitise inputs ──────────────────────────────────────────
function clean($v) {
    return htmlspecialchars(strip_tags(trim((string)$v)), ENT_QUOTES, 'UTF-8');
}

$first_name          = clean($_POST['first_name']          ?? '');
$last_name           = clean($_POST['last_name']           ?? '');
$email               = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
$phone               = clean($_POST['phone']               ?? '');
$dob                 = clean($_POST['dob']                 ?? '');
$nationality         = clean($_POST['nationality']         ?? '');
$country             = clean($_POST['country']             ?? '');
$course              = clean($_POST['course']              ?? '');
$preferred_intake    = clean($_POST['preferred_intake']    ?? '');
$delivery_mode       = clean($_POST['delivery_mode']       ?? '');
$job_title           = clean($_POST['job_title']           ?? '');
$organisation        = clean($_POST['organisation']        ?? '');
$industry            = clean($_POST['industry']            ?? '');
$experience_years    = clean($_POST['experience_years']    ?? '');
$education_level     = clean($_POST['education_level']     ?? '');
$study_field         = clean($_POST['study_field']         ?? '');
$quals               = isset($_POST['quals']) && is_array($_POST['quals'])
                        ? implode('; ', array_map('clean', $_POST['quals']))
                        : '';
$motivation          = clean($_POST['motivation']          ?? '');
$funding             = clean($_POST['funding']             ?? '');
$sponsor_name        = clean($_POST['sponsor_name']        ?? '');
$emergency_name      = clean($_POST['emergency_name']      ?? '');
$emergency_rel       = clean($_POST['emergency_relationship'] ?? '');
$emergency_phone     = clean($_POST['emergency_phone']     ?? '');
$special_req         = clean($_POST['special_requirements'] ?? '');
$referral_source     = clean($_POST['referral_source']     ?? '');
$newsletter_opt      = isset($_POST['newsletter_opt']) ? 'Yes' : 'No';

// ── Validation ───────────────────────────────────────────────
$errors = [];
if (empty($first_name))       $errors[] = 'First name is required.';
if (empty($last_name))        $errors[] = 'Last name is required.';
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'Valid email address is required.';
if (empty($phone))            $errors[] = 'Phone number is required.';
if (empty($course))           $errors[] = 'Please select a course.';
if (empty($preferred_intake)) $errors[] = 'Please select a preferred intake.';
if (empty($delivery_mode))    $errors[] = 'Please select a delivery mode.';
if (empty($job_title))        $errors[] = 'Job title is required.';
if (empty($organisation))     $errors[] = 'Organisation name is required.';
if (empty($country))          $errors[] = 'Country of residence is required.';
if (empty($motivation))       $errors[] = 'Motivation statement is required.';

if (!empty($errors)) {
    echo json_encode(['success' => false, 'message' => implode(' ', $errors)]);
    exit;
}

// ── Log to CSV ───────────────────────────────────────────────
$csvFile = dirname(__DIR__) . '/data/admissions.csv';
$csvDir  = dirname($csvFile);
if (!is_dir($csvDir)) mkdir($csvDir, 0755, true);

$isNew = !file_exists($csvFile);
$fp    = fopen($csvFile, 'a');
if ($fp) {
    if ($isNew) {
        fputcsv($fp, [
            'first_name','last_name','email','phone','dob','nationality','country',
            'course','preferred_intake','delivery_mode',
            'job_title','organisation','industry','experience_years',
            'education_level','study_field','existing_quals',
            'motivation','funding','sponsor_name',
            'emergency_name','emergency_relationship','emergency_phone',
            'special_requirements','referral_source','newsletter_opt',
            'submitted_at','ip'
        ]);
    }
    fputcsv($fp, [
        $first_name, $last_name, $email, $phone, $dob, $nationality, $country,
        $course, $preferred_intake, $delivery_mode,
        $job_title, $organisation, $industry, $experience_years,
        $education_level, $study_field, $quals,
        $motivation, $funding, $sponsor_name,
        $emergency_name, $emergency_rel, $emergency_phone,
        $special_req, $referral_source, $newsletter_opt,
        date('Y-m-d H:i:s'),
        $_SERVER['REMOTE_ADDR'] ?? 'unknown'
    ]);
    fclose($fp);
}

// ── Notification Email ───────────────────────────────────────
$to      = 'info@ansarmahmood.org';
$cc      = 'mransarmahmood@gmail.com';
$subject = "New Course Application: {$course} — {$first_name} {$last_name}";
$body    = "A new course admission application has been received.\n\n";
$body   .= "=== COURSE DETAILS ===\n";
$body   .= "Course:          {$course}\n";
$body   .= "Intake:          {$preferred_intake}\n";
$body   .= "Delivery:        {$delivery_mode}\n\n";
$body   .= "=== APPLICANT ===\n";
$body   .= "Name:            {$first_name} {$last_name}\n";
$body   .= "Email:           {$email}\n";
$body   .= "Phone:           {$phone}\n";
$body   .= "Country:         {$country}\n";
$body   .= "Nationality:     {$nationality}\n\n";
$body   .= "=== PROFESSIONAL ===\n";
$body   .= "Title:           {$job_title}\n";
$body   .= "Organisation:    {$organisation}\n";
$body   .= "Industry:        {$industry}\n";
$body   .= "Experience:      {$experience_years}\n\n";
$body   .= "=== EDUCATION ===\n";
$body   .= "Highest Level:   {$education_level}\n";
$body   .= "Field:           {$study_field}\n";
$body   .= "Existing Quals:  {$quals}\n\n";
$body   .= "=== MOTIVATION ===\n{$motivation}\n\n";
$body   .= "Funding:         {$funding}\n";
$body   .= "Sponsor:         {$sponsor_name}\n\n";
$body   .= "Special Req:     {$special_req}\n";
$body   .= "Referral:        {$referral_source}\n";
$body   .= "Newsletter:      {$newsletter_opt}\n";
$body   .= "IP:              " . ($_SERVER['REMOTE_ADDR'] ?? 'unknown') . "\n";
$body   .= "Submitted:       " . date('Y-m-d H:i:s') . "\n";

require_once dirname(__DIR__) . '/includes/mailer.php';

ansar_send_mail([
    'to'        => $to,
    'cc'        => $cc,
    'subject'   => $subject,
    'body'      => $body,
    'reply_to'  => $email,
    'from_name' => 'Ansar Mahmood Admissions',
    'from_email'=> 'admissions@ansarmahmood.org',
]);

// ── Confirmation email to applicant ─────────────────────────
$confSubject = "Your Course Application — {$course} | Ansar Mahmood";
$confBody    = "Dear {$first_name},\n\n";
$confBody   .= "Thank you for applying for: {$course} ({$preferred_intake}, {$delivery_mode})\n\n";
$confBody   .= "Your application has been received and will be reviewed within 24 hours.\n\n";
$confBody   .= "=== NEXT STEPS ===\n";
$confBody   .= "1. Our team will review your application and eligibility\n";
$confBody   .= "2. You will receive an enrolment offer with fee and payment details\n";
$confBody   .= "3. Confirm your place by paying within 7 days of the offer\n";
$confBody   .= "4. Receive your welcome pack and course materials 48 hours before the start date\n\n";
$confBody   .= "If you have any questions, reply to this email or WhatsApp: +92 333 928 4928\n\n";
$confBody   .= "Kind regards,\nAnsar Mahmood\nSenior HSE Consultant & Trainer\ninfo@ansarmahmood.org | +92 333 928 4928\n";

ansar_send_mail([
    'to'        => $email,
    'subject'   => $confSubject,
    'body'      => $confBody,
    'reply_to'  => $to,
    'from_name' => 'Ansar Mahmood Admissions',
    'from_email'=> 'admissions@ansarmahmood.org',
]);

echo json_encode(['success' => true, 'message' => 'Application received.']);
exit;
