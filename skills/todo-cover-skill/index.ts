export type TodoItem = {
  name: string;
  count?: number;
};

function pad(n: number): string {
  return n.toString().padStart(2, '0');
}

function formatDate(date: Date): string {
  return `${date.getFullYear()}年${pad(date.getMonth() + 1)}月${pad(date.getDate())}日`;
}

function generateOrderNo(date: Date): string {
  const y = date.getFullYear();
  const m = pad(date.getMonth() + 1);
  const d = pad(date.getDate());
  const h = pad(date.getHours());
  const min = pad(date.getMinutes());
  const s = pad(date.getSeconds());
  return `#${y}${m}${d}${h}${min}${s}`;
}

function mountainSVG(): string {
  return `<svg width="80" height="60" viewBox="0 0 80 60" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 50 L30 20 L40 35 L55 10 L70 50 Z" fill="none" stroke="#1a1a1a" stroke-width="3" stroke-linejoin="round"/>
    <line x1="55" y1="10" x2="55" y2="4" stroke="#1a1a1a" stroke-width="2"/>
    <polygon points="53,4 57,4 55,0" fill="#1a1a1a"/>
    <rect x="12" y="12" width="10" height="4" fill="#1a1a1a"/>
    <rect x="58" y="8" width="10" height="4" fill="#1a1a1a"/>
  </svg>`;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * 生成小票风格的 Todo List HTML
 * @param items 任务列表
 * @param date  日期，默认当前时间
 */
export function generateReceiptHTML(items: TodoItem[], date: Date = new Date()): string {
  const normalized = items.map((item) => ({ name: item.name, count: item.count ?? 1 }));
  const totalItems = normalized.length;
  const totalCount = normalized.reduce((sum, item) => sum + item.count, 0);

  const rows = normalized
    .map((item, index) => {
      const no = (index + 1).toString().padStart(2, '0');
      return `
      <div class="row">
        <span class="col-no">${no}</span>
        <span class="col-name">${escapeHtml(item.name)}</span>
        <span class="col-dots"></span>
        <span class="col-qty">x${item.count}</span>
      </div>`;
    })
    .join('');

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>今日 Todo 小票</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #f5f0e8;
      font-family: "SF Mono", Monaco, "Courier New", monospace;
      color: #1a1a1a;
      display: flex;
      justify-content: center;
      padding: 40px 16px;
    }
    .receipt {
      width: 360px;
      background: #faf7f2;
      padding: 32px 24px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.08);
    }
    .logo { text-align: center; margin-bottom: 16px; }
    .date { text-align: center; font-size: 14px; margin-bottom: 24px; letter-spacing: 1px; }
    .divider {
      border-bottom: 2px dashed #c9c0b1;
      margin: 16px 0;
    }
    .header-row {
      display: flex;
      justify-content: space-between;
      font-weight: bold;
      font-size: 13px;
      margin-bottom: 8px;
    }
    .row {
      display: flex;
      align-items: baseline;
      font-size: 13px;
      line-height: 2;
    }
    .col-no { width: 28px; flex-shrink: 0; }
    .col-name { flex-shrink: 0; max-width: 120px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .col-dots {
      flex: 1;
      border-bottom: 1px dashed #c9c0b1;
      margin: 0 8px;
      min-width: 20px;
      position: relative;
      top: -4px;
    }
    .col-qty { width: 32px; text-align: right; flex-shrink: 0; }
    .summary {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      font-weight: bold;
      line-height: 2;
    }
    .footer { text-align: center; margin-top: 24px; }
    .order-no { font-size: 13px; margin-bottom: 12px; letter-spacing: 1px; }
    .welcome { font-size: 12px; margin-bottom: 6px; }
    .brand { font-size: 11px; letter-spacing: 2px; }
  </style>
</head>
<body>
  <div class="receipt">
    <div class="logo">${mountainSVG()}</div>
    <div class="date">${formatDate(date)}</div>
    <div class="divider"></div>
    <div class="header-row">
      <span>#</span>
      <span style="flex:1; text-align:center;">事件</span>
      <span>数量</span>
    </div>
    <div class="divider"></div>
    ${rows}
    <div class="divider"></div>
    <div class="summary">
      <span>合计项:</span>
      <span>${totalItems} 项</span>
    </div>
    <div class="summary">
      <span>合计数量:</span>
      <span>x${totalCount}</span>
    </div>
    <div class="divider"></div>
    <div class="footer">
      <div class="order-no">${generateOrderNo(date)}</div>
      <div class="welcome">~欢迎您再次光临~</div>
      <div class="brand">MARKTIMES</div>
    </div>
    <div class="divider"></div>
  </div>
</body>
</html>`;
}
