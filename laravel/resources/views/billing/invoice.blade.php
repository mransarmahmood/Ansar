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
  .doc h1 { margin: 0; font-family: 'DejaVu Serif', serif; font-size: 30px; color: #15265E; letter-spacing: 1px; }
  .doc .num { color: #1E8A3C; font-weight: bold; font-size: 13px; }
  .rule { height: 4px; background: #15265E; margin: 16px 0 0; }
  .rule .g { height: 4px; width: 120px; background: #1E8A3C; }
  .meta { width: 100%; border-collapse: collapse; margin-top: 22px; }
  .meta td { vertical-align: top; width: 50%; padding: 0; }
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
  .status { display: inline-block; padding: 5px 14px; border-radius: 20px; font-size: 10px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; }
  .foot { clear: both; margin-top: 36px; color: #555E70; font-size: 11px; line-height: 1.6; }
  .foot .h { color: #15265E; font-weight: bold; font-size: 11px; letter-spacing: .5px; text-transform: uppercase; margin-top: 14px; }
</style>
</head>
<body>
<div class="wrap">
  <table class="top"><tr>
    <td><div class="brand">Ansar Mahmood<small>HSE CONSULTANCY &amp; TRAINING</small></div></td>
    <td class="doc">
      <h1>INVOICE</h1>
      <div class="num">{{ $inv->number }}</div>
      <div class="status" style="background:#E9F5ED;color:#14662B;">{{ strtoupper($inv->status) }}</div>
    </td>
  </tr></table>
  <div class="rule"><div class="g"></div></div>

  <table class="meta"><tr>
    <td>
      <div class="label">Bill To</div>
      <div class="party">{{ $inv->company ?: $inv->bill_to_name ?: '—' }}</div>
      <div class="muted">
        @if($inv->bill_to_name && $inv->company){{ $inv->bill_to_name }}<br>@endif
        {{ $inv->company_address }}<br>
        {{ $inv->company_email }} @if($inv->phone) · {{ $inv->phone }} @endif
      </div>
    </td>
    <td>
      <table style="width:100%;border-collapse:collapse;">
        <tr><td class="label" style="padding-bottom:4px;">Invoice Date</td><td class="muted" style="text-align:right;">{{ optional($inv->invoice_date)->format('d M Y') ?: '—' }}</td></tr>
        <tr><td class="label" style="padding-bottom:4px;">Due Date</td><td class="muted" style="text-align:right;">{{ optional($inv->due_date)->format('d M Y') ?: '—' }}</td></tr>
        <tr><td class="label">Currency</td><td class="muted" style="text-align:right;">{{ $inv->currency }}</td></tr>
      </table>
    </td>
  </tr></table>

  @if($inv->title)<p class="muted" style="margin-top:18px;font-size:13px;color:#15265E;"><b>{{ $inv->title }}</b></p>@endif

  <table class="items">
    <thead><tr><th>Description</th><th class="r">Qty</th><th class="r">Unit Price</th><th class="r">Amount</th></tr></thead>
    <tbody>
      @foreach($inv->line_items ?? [] as $li)
        <tr>
          <td>{{ $li['description'] ?? '' }}</td>
          <td class="r">{{ rtrim(rtrim(number_format((float)($li['qty'] ?? 0), 2), '0'), '.') }}</td>
          <td class="r">{{ $inv->currency }} {{ number_format((float)($li['unitPrice'] ?? 0), 2) }}</td>
          <td class="r">{{ $inv->currency }} {{ number_format((float)($li['qty'] ?? 0) * (float)($li['unitPrice'] ?? 0), 2) }}</td>
        </tr>
      @endforeach
    </tbody>
  </table>

  <table class="totals">
    <tr><td class="tlabel">Subtotal</td><td class="tval">{{ $inv->currency }} {{ number_format($inv->subtotal(), 2) }}</td></tr>
    <tr><td class="tlabel">VAT ({{ rtrim(rtrim(number_format($inv->vat_percent, 2), '0'), '.') }}%)</td><td class="tval">{{ $inv->currency }} {{ number_format($inv->vatAmount(), 2) }}</td></tr>
    <tr class="grand"><td>Total Due</td><td style="text-align:right;">{{ $inv->currency }} {{ number_format($inv->total(), 2) }}</td></tr>
  </table>

  <div class="foot">
    @if($inv->notes)<div class="h">Notes</div>{{ $inv->notes }}@endif
    @if($inv->terms)<div class="h">Terms</div>{{ $inv->terms }}@endif
    <div class="h">Verify</div>This invoice can be viewed online with reference code {{ $inv->share_token }}.
  </div>
</div>
</body>
</html>
