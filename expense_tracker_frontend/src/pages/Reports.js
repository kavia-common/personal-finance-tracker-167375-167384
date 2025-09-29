import { useEffect, useState } from "react";
import { ReportsAPI } from "../services/api";
import { Card, Table, Legend, Tag } from "../shared";

const mockByCategory = [
  { category: "Groceries", amount: 320 },
  { category: "Transport", amount: 110 },
  { category: "Dining", amount: 230 },
  { category: "Utilities", amount: 180 },
];

const mockCashflow = [
  { month: "Jan", income: 4000, expenses: 2100 },
  { month: "Feb", income: 4000, expenses: 2500 },
  { month: "Mar", income: 4200, expenses: 2300 },
  { month: "Apr", income: 4200, expenses: 2400 },
];

export default function Reports() {
  const [byCategory, setByCategory] = useState(mockByCategory);
  const [cashflow, setCashflow] = useState(mockCashflow);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const s = await ReportsAPI.summary({ group: "category", period: "month" });
        if (Array.isArray(s?.byCategory)) setByCategory(s.byCategory);
      } catch {
        setByCategory(mockByCategory);
      }
      try {
        const cf = await ReportsAPI.cashflow({ period: "12m" });
        if (Array.isArray(cf)) setCashflow(cf);
      } catch {
        setCashflow(mockCashflow);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const total = byCategory.reduce((acc, r) => acc + Number(r.amount || 0), 0) || 1;

  return (
    <div className="stack-lg">
      <div className="grid-2">
        <Card title="Spending by Category" subtitle="Current month" loading={loading}>
          <div className="bars">
            {byCategory.map((r) => {
              const pct = Math.round((r.amount / total) * 100);
              return (
                <div className="bar-row" key={r.category}>
                  <div className="bar-label">{r.category}</div>
                  <div className="bar">
                    <div className="bar-fill" style={{ width: `${pct}%` }} />
                  </div>
                  <div className="bar-value">${Number(r.amount).toFixed(2)}</div>
                </div>
              );
            })}
          </div>
          <Legend items={[
            { label: "Spending share", color: "var(--primary)" },
          ]} />
        </Card>

        <Card title="Cashflow" subtitle="Income vs Expenses" loading={loading}>
          <div className="chart">
            {cashflow.map((m) => (
              <div className="chart-col" key={m.month}>
                <div className="bar income" style={{ height: `${Math.min(100, (m.income / 4500) * 100)}%` }} title={`Income ${m.income}`} />
                <div className="bar expense" style={{ height: `${Math.min(100, (m.expenses / 4500) * 100)}%` }} title={`Expenses ${m.expenses}`} />
                <div className="chart-label">{m.month}</div>
              </div>
            ))}
          </div>
          <Legend items={[
            { label: "Income", color: "var(--secondary)" },
            { label: "Expenses", color: "var(--primary)" },
          ]} />
        </Card>
      </div>

      <Card title="Detailed Summary">
        <Table
          columns={[
            { key: "category", header: "Category" },
            { key: "amount", header: "Spent", align: "right", render: (v) => `$${Number(v).toFixed(2)}` },
            { key: "status", header: "Status", render: (_v, row) => <Tag type="neutral">{row.amount > 200 ? "High" : "Normal"}</Tag> },
          ]}
          data={byCategory.map(r => ({ ...r, status: r.amount > 200 ? "High" : "Normal" }))}
          loading={loading}
          emptyText="No data."
        />
      </Card>
    </div>
  );
}
