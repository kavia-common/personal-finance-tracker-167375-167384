# Expense Tracker Frontend

Modern, minimalist React frontend following the "Ocean Professional" style.

Features:
- Sidebar navigation
- Dashboard (summary + recent transactions)
- Expense Entry (income/expense form)
- Transactions (filters, table, delete)
- Reports (CSS charts + tables)
- Categories (manage categories)
- Settings (theme toggle, API base)

Configuration:
- Set REACT_APP_API_BASE_URL in .env (see .env.example)

Tech:
- React 18, react-router-dom v6
- Vanilla CSS with theme variables

Styling:
- Primary #2563EB, Secondary #F59E0B
- Rounded corners, subtle shadows, gradients
- Light/Dark theme ready using data-theme attribute

API:
- Assumes REST backend:
  - GET/POST/PUT/DELETE /api/expenses
  - GET/POST/PUT/DELETE /api/categories
  - GET /api/reports/summary, /api/reports/cashflow, /api/reports/export
