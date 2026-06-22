<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  @page { margin: 0; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'DejaVu Serif', Georgia, serif; color: #15265E; }
  .sheet { width: 100%; height: 560px; padding: 26px; }
  .frame {
    border: 3px solid #15265E; height: 100%; position: relative; padding: 38px 60px;
    text-align: center;
  }
  .frame::after {
    content: ""; position: absolute; top: 8px; left: 8px; right: 8px; bottom: 8px;
    border: 1px solid #1E8A3C;
  }
  .inner { position: relative; }
  .brand { font-size: 13px; letter-spacing: 6px; color: #1E8A3C; font-weight: bold; text-transform: uppercase; }
  .brand-name { font-size: 22px; color: #15265E; font-weight: bold; margin-top: 4px; letter-spacing: 1px; }
  .rule { width: 90px; height: 3px; background: #1E8A3C; margin: 14px auto 22px; }
  .title { font-size: 40px; color: #15265E; font-weight: bold; letter-spacing: 1px; }
  .subtitle { font-size: 13px; letter-spacing: 4px; color: #6B7280; text-transform: uppercase; margin-top: 6px; }
  .awarded { font-size: 14px; color: #6B7280; margin-top: 30px; }
  .holder { font-size: 34px; color: #15265E; font-weight: bold; margin: 8px 0 6px; }
  .holder-rule { width: 320px; height: 1px; background: #C8D0DC; margin: 0 auto 18px; }
  .desc { font-size: 15px; color: #374151; line-height: 1.6; width: 640px; margin: 0 auto; }
  .score { color: #1E8A3C; font-weight: bold; }
  .meta { width: 100%; margin-top: 40px; }
  .meta td { width: 33%; vertical-align: bottom; text-align: center; font-size: 12px; color: #6B7280; }
  .meta .val { font-size: 15px; color: #15265E; font-weight: bold; }
  .meta .ln { border-top: 1px solid #15265E; width: 180px; margin: 0 auto 6px; padding-top: 6px; }
  .seal { width: 78px; height: 78px; border: 3px solid #1E8A3C; border-radius: 50%; margin: 0 auto;
          text-align: center; color: #15265E; }
  .seal .am { font-size: 26px; font-weight: bold; line-height: 72px; }
  .verify { margin-top: 14px; font-size: 11px; color: #9098A8; }
  .verify b { color: #15265E; letter-spacing: 1px; }
</style>
</head>
<body>
  <div class="sheet">
    <div class="frame">
      <div class="inner">
        <div class="brand">Ansar Mahmood</div>
        <div class="brand-name">HSE &middot; Training &middot; AI</div>
        <div class="rule"></div>

        <div class="title">Certificate of Achievement</div>
        <div class="subtitle">Practice Assessment</div>

        <div class="awarded">This certificate is proudly presented to</div>
        <div class="holder">{{ $cert->holder_name }}</div>
        <div class="holder-rule"></div>

        <div class="desc">
          for successfully completing the <b>{{ $cert->exam_title }}</b> practice assessment,
          achieving a score of <span class="score">{{ $cert->percentage }}%</span> and demonstrating
          a strong command of the subject material.
        </div>

        <table class="meta">
          <tr>
            <td>
              <div class="val">{{ $cert->issued_on->format('d M Y') }}</div>
              <div class="ln"></div>Date Issued
            </td>
            <td>
              <div class="seal"><div class="am">AM</div></div>
            </td>
            <td>
              <div class="val">Ansar Mahmood</div>
              <div class="ln"></div>Authorised Signature
            </td>
          </tr>
        </table>

        <div class="verify">
          Verify the authenticity of this certificate &mdash; code <b>{{ $cert->hash }}</b>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
