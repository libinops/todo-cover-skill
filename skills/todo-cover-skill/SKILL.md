---
name: "todo-cover-skill"
description: "Generates a receipt-style (小票风格) todo list HTML when the user lists today's tasks. Invoke when user tells you what they need to do today or asks for a daily todo receipt."
---

# Todo Cover Skill

当用户告诉你他今天需要做哪些事情时，使用本 skill 生成一张小票风格的 Todo List HTML。

## 触发条件

- 用户列出今天的待办事项
- 用户要求生成小票 / 收据风格的 todo list
- 用户说"帮我做一张今日 todo 小票"

## 用法

1. 解析用户提到的任务和数量（未说明数量时默认为 1）。
2. 调用 `skills/todo-cover-skill/index.ts` 中的 `generateReceiptHTML(items, date)`。
3. 将生成的 HTML 返回给用户，或保存为 `.html` 文件供其打开。

## 输入格式

```ts
type TodoItem = {
  name: string;   // 事件名称
  count?: number; // 数量，默认 1
};
```

## 示例

```ts
import { generateReceiptHTML } from './skills/todo-cover-skill/index';

const html = generateReceiptHTML([
  { name: '铁拳教育', count: 1 },
  { name: '吃维生素', count: 1 },
  { name: '胸闷', count: 1 },
  { name: '用药', count: 1 },
  { name: '太平记', count: 2 },
], new Date('2026-06-19'));

// 保存或返回 html
```

## 输出效果

生成的 HTML 包含：

- 顶部山峰图标
- 日期
- 虚线分隔
- `#` / `事件` / `数量` 表头
- 每项任务带虚线连接和数量
- 合计项 / 合计数量
- 订单号 + 条形码
- 底部欢迎语和 `MARKTIMES`
