<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { font-family: DejaVu Sans, sans-serif; }
  body { margin: 0; color: #1C2230; font-size: 12px; }
  .wrap { padding: 38px 42px; }
  .top { width: 100%; border-collapse: collapse; }
  .brand { font-family: 'DejaVu Serif', serif; font-size: 24px; font-weight: bold; color: #15265E; }
  .brand small { display: block; font-family: DejaVu Sans; font-size: 10px; letter-spacing: 2px; color: #1E8A3C; font-weight: normal; }
  .doc { text-align: right; }
  .doc h1 { margin: 0; font-family: 'DejaVu Serif', serif; font-size: 28px; color: #15265E; letter-spacing: 1px; }
  .doc .num { color: #1E8A3C; font-weight: bold; font-size: 13px; }
  .rule { height: 4px; background: #15265E; margin: 16px 0 0; }
  .rule .g { height: 4px; width: 120px; background: #1E8A3C; }
  .label { font-size: 9px; letter-spacing: 1.5px; text-transform: uppercase; color: #8A93A6; font-weight: bold; margin-bottom: 4px; }
  .party { font-size: 13px; color: #15265E; font-weight: bold; }
  .muted { color: #555E70; font-size: 11px; line-height: 1.5; }
  .subject { font-family: 'DejaVu Serif', serif; font-size: 18px; color: #15265E; margin: 24px 0 6px; }
  .body { color: #333B4D; font-size: 12px; line-height: 1.7; margin-top: 10px; white-space: pre-line; }
  table.items { width: 100%; border-collapse: collapse; margin-top: 22px; }
  table.items th { background: #15265E; color: #fff; text-align: left; padding: 9px 12px; font-size: 10px; letter-spacing: 1px; text-transform: uppercase; }
  table.items th.r, table.items td.r { text-align: right; }
  table.items td { padding: 10px 12px; border-bottom: 1px solid #E6EAF2; font-size: 12px; }
  .grand { margin-top: 12px; float: right; background: #1E8A3C; color: #fff; padding: 9px 18px; font-weight: bold; font-size: 14px; border-radius: 4px; }
  .foot { clear: both; margin-top: 34px; color: #555E70; font-size: 11px; line-height: 1.6; }
  .foot .h { color: #15265E; font-weight: bold; font-size: 11px; letter-spacing: .5px; text-transform: uppercase; margin-top: 14px; }
</style>
</head>
<body>
<div class="wrap">
  <table class="top"><tr>
    <td><div class="brand">Ansar Mahmood<small>HSE CONSULTANCY &amp; TRAINING</small></div></td>
    <td class="doc"><h1>PROPOSAL</h1><div class="num">{{ $p->number }}</div></td>
  </tr></table>
  <div class="rule"><div class="g"></div></div>

  <table style="width:100%;border-collapse:collapse;margin-top:22px;"><tr>
    <td style="width:60%;vertical-align:top;">
      <div class="label">Prepared For</div>
      <div class="party">{{ $p->company_name ?: $p->contact_name ?: '—' }}</div>
      <div class="muted">
        @if($p->contact_name && $p->company_name){{ $p->contact_name }}<br>@endif
        {{ $p->company_address }}<br>
        {{ $p->company_email }} @if($p->phone) · {{ $p->phone }} @endif
      </div>
    </td>
    <td style="vertical-align:top;text-align:right;">
      <div class="label">Date</div>
      <div class="muted">{{ optional($p->proposal_date)->format('d M Y') ?: '—' }}</div>
    </td>
  </tr></table>

  @if($p->subject)<div class="subject">{{ $p->subject }}</div>@endif
  @if($p->body)<div class="body">{{ $p->body }}</div>@endif

  @if(!empty($p->line_items))
  <table class="items">
    <thead><tr><th>Item</th><th class="r">Qty</th><th class="r">Unit</th><th class="r">Amount</th></tr></thead>
    <tbody>
      @foreach($p->line_items as $li)
        <tr>
          <td>{{ $li['description'] ?? '' }}</td>
          <td class="r">{{ rtrim(rtrim(number_format((float)($li['qty'] ?? 0), 2), '0'), '.') }}</td>
          <td class="r">{{ $p->currency }} {{ number_format((float)($li['unitPrice'] ?? 0), 2) }}</td>
          <td class="r">{{ $p->currency }} {{ number_format((float)($li['qty'] ?? 0) * (float)($li['unitPrice'] ?? 0), 2) }}</td>
        </tr>
      @endforeach
    </tbody>
  </table>
  <div class="grand">Total: {{ $p->currency }} {{ number_format($p->total(), 2) }}</div>
  @endif

  <div class="foot">
    @if($p->terms)<div class="h">Terms</div>{{ $p->terms }}@endif
    <div class="h">Reference</div>{{ $p->share_token }}
  </div>
</div>
</body>
</html>
