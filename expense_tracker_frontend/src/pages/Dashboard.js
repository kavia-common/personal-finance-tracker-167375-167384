import { useEffect, useState } from "react";
import { ExpensesAPI, ReportsAPI } from "../services/api";
import { Card, Stat, Table } from "../shared";

const mockSummary = {
  month: "This Month",
  income: 4200,
  expenses: 2350,
  net: 1850,
};

const mockRecent = [
  { id: "1", date: "2025-09-15", category: "Groceries", amount: 85.99, note: "Weekly shop" },
  { id: "2", date: "2025-09-14", category: "Transport", amount: 25.0, note: "Gas" },
  { id: "3", date: "2025-09-13", category: "Dining", amount: 42.75, note: "Dinner out" },
];

export default function Dashboard() {
  const [summary, setSummary] = useState(mockSummary);
  const [recent, setRecent] = useState(mockRecent);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Try fetching live data; fall back to mock if fails
    const load = async () => {
      setLoading(true);
      try {
        const s = await ReportsAPI.summary({ period: "month" });
        setSummary({
          month: s?.periodLabel || "This Month",
          income: s?.income ?? mockSummary.income,
          expenses: s?.expenses ?? mockSummary.expenses,
          net: s?.net ?? mockSummary.net,
        });
      } catch {
        setSummary(mockSummary);
      }
      try {
        const list = await ExpensesAPI.list({ limit: 5, sort: "-date" });
        setRecent(Array.isArray(list) ? list : mockRecent);
      } catch {
        setRecent(mockRecent);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="stack-lg">
      <div className="grid-3">
        <Stat label="Income" value={`$${summary.income.toLocaleString()}`} trend="+2.8%" type="positive" loading={loading} />
        <Stat label="Expenses" value={`$${summary.expenses.toLocaleString()}`} trend="-1.4%" type="negative" loading={loading} />
        <Stat label="Net" value={`$${summary.net.toLocaleString()}`} trend="+1.1%" type={summary.net >= 0 ? "positive" : "negative"} loading={loading} />
      </div>

      <Card title="Recent Transactions" subtitle="Latest 5 records">
        <Table
          columns={[
            { key: "date", header: "Date" },
            { key: "category", header: "Category" },
            { key: "note", header: "Note" },
            { key: "amount", header: "Amount", render: (v) => `$${Number(v).toFixed(2)}`, align: "right" },
          ]}
          data={recent}
          loading={loading}
          emptyText="No transactions yet."
        />
      </Card>
    </div>
  );
}
