import { generateReceiptHTML } from './skills/todo-cover-skill/index';
import * as fs from 'fs';

const html = generateReceiptHTML(
  [
    { name: '铁拳教育', count: 1 },
    { name: '吃维生素', count: 1 },
    { name: '胸闷', count: 1 },
    { name: '用药', count: 1 },
    { name: '太平记', count: 2 },
  ],
  new Date('2026-06-19')
);

fs.writeFileSync('receipt.html', html, 'utf-8');
console.log('已生成 receipt.html');
