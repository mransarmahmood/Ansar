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
  .doc h1 { margin: 0; font-family: 'DejaVu Serif', serif; font-size: 30px; color: #1E8A3C; letter-spacing: 1px; }
  .doc .num { color: #15265E; font-weight: bold; font-size: 13px; }
  .rule { height: 4px; background: #1E8A3C; margin: 16px 0 0; }
  .rule .g { height: 4px; width: 120px; background: #15265E; }
  .label { font-size: 9px; letter-spacing: 1.5px; text-transform: uppercase; color: #8A93A6; font-weight: bold; margin-bottom: 4px; }
  .party { font-size: 13px; color: #15265E; font-weight: bold; }
  .muted { color: #555E70; font-size: 11px; line-height: 1.5; }
  table.items { width: 100%; border-collapse: collapse; margin-top: 26px; }
  table.items th { background: #15265E; color: #fff; text-align: left; padding: 9px 12px; font-size: 10px; letter-spacing: 1px; text-transform: uppercase; }
  table.items th.r, table.items td.r { text-align: right; }
  table.items td { padding: 10px 12px; border-bottom: 1px solid #E6EAF2; font-size: 12px; }
  .totals { width: 46%; border-collapse: collapse; margin-top: 14px; float: right; }
  .totals td { padding: 6px 12px; font-size: 12px; }
  .totals .tlabel { color: #555E70; }
  .totals .tval { text-align: right; font-weight: bold; color: #15265E; }
  .totals .grand td { background: #1E8A3C; color: #fff; font-size: 15px; font-weight: bold; }
  .stamp { margin-top: 24px; display: inline-block; border: 3px solid #1E8A3C; color: #1E8A3C; font-weight: bold; font-size: 18px; letter-spacing: 3px; padding: 8px 22px; border-radius: 8px; transform: rotate(-4deg); }
  .foot { clear: both; margin-top: 30px; color: #555E70; font-size: 11px; line-height: 1.6; }
</style>
</head>
<body>
<div class="wrap">
  <table class="top"><tr>
    <td><div class="brand">Ansar Mahmood<small>HSE CONSULTANCY &amp; TRAINING</small></div></td>
    <td class="doc"><h1>RECEIPT</h1><div class="num">For {{ $inv->number }}</div></td>
  </tr></table>
  <div class="rule"><div class="g"></div></div>

  <table style="width:100%;border-collapse:collapse;margin-top:22px;"><tr>
    <td style="width:55%;vertical-align:top;">
      <div class="label">Received From</div>
      <div class="party">{{ $inv->company ?: $inv->bill_to_name ?: '—' }}</div>
      <div class="muted">{{ $inv->company_email }}</div>
    </td>
    <td style="vertical-align:top;text-align:right;">
      <div class="label">Invoice Total</div>
      <div class="muted">{{ $inv->currency }} {{ number_format($inv->total(), 2) }}</div>
    </td>
  </tr></table>

  <table class="items">
    <thead><tr><th>Date</th><th>Method</th><th>Reference</th><th class="r">Amount</th></tr></thead>
    <tbody>
      @foreach($inv->payments as $p)
        <tr>
          <td>{{ optional($p->paid_on)->format('d M Y') }}</td>
          <td>{{ $p->method }}</td>
          <td>{{ $p->reference }}</td>
          <td class="r">{{ $inv->currency }} {{ number_format($p->amount, 2) }}</td>
        </tr>
      @endforeach
    </tbody>
  </table>

  <table class="totals">
    <tr><td class="tlabel">Total Paid</td><td class="tval">{{ $inv->currency }} {{ number_format($inv->amountPaid(), 2) }}</td></tr>
    <tr class="grand"><td>Balance Due</td><td style="text-align:right;">{{ $inv->currency }} {{ number_format(max($inv->balance(), 0), 2) }}</td></tr>
  </table>

  @if($inv->balance() <= 0.001)
    <div class="stamp">PAID IN FULL</div>
  @endif

  <div class="foot">Thank you for your business. Reference code {{ $inv->share_token }}.</div>
</div>
</body>
</html>
