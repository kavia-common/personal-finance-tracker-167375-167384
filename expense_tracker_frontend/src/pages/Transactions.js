import { useEffect, useState } from "react";
import { ExpensesAPI } from "../services/api";
import { Card, Table, Tag, Input, Select, DateInput, Button, Confirm } from "../shared";

export default function Transactions() {
  const [filters, setFilters] = useState({ q: "", type: "all", start: "", end: "" });
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toDelete, setToDelete] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const params = {};
      if (filters.q) params.q = filters.q;
      if (filters.type !== "all") params.type = filters.type;
      if (filters.start) params.start = filters.start;
      if (filters.end) params.end = filters.end;
      const res = await ExpensesAPI.list(params);
      setData(Array.isArray(res) ? res : []);
    } catch {
      setData([
        { id: "1", date: "2025-09-12", category: "Groceries", note: "Veggies", type: "expense", amount: 22.4 },
        { id: "2", date: "2025-09-10", category: "Salary", note: "Monthly", type: "income", amount: 4200 },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  const onDelete = async () => {
    if (!toDelete) return;
    try {
      await ExpensesAPI.remove(toDelete.id);
      setToDelete(null);
      fetchData();
    } catch {
      setToDelete(null);
    }
  };

  return (
    <div className="stack-lg">
      <Card title="Filters">
        <div className="filters">
          <Input label="Search" value={filters.q} onChange={(v) => setFilters({ ...filters, q: v })} placeholder="Search note/category" />
          <Select
            label="Type"
            value={filters.type}
            onChange={(v) => setFilters({ ...filters, type: v })}
            options={[
              { value: "all", label: "All" },
              { value: "income", label: "Income" },
              { value: "expense", label: "Expense" },
            ]}
          />
          <DateInput label="Start" value={filters.start} onChange={(v) => setFilters({ ...filters, start: v })} />
          <DateInput label="End" value={filters.end} onChange={(v) => setFilters({ ...filters, end: v })} />
          <div className="filter-actions">
            <Button onClick={fetchData} className="primary">Apply</Button>
            <Button onClick={() => setFilters({ q: "", type: "all", start: "", end: "" })} className="ghost">Reset</Button>
          </div>
        </div>
      </Card>

      <Card title="Transactions">
        <Table
          columns={[
            { key: "date", header: "Date" },
            { key: "category", header: "Category" },
            { key: "note", header: "Note" },
            {
              key: "type",
              header: "Type",
              render: (v) => <Tag type={v === "income" ? "success" : "neutral"}>{v}</Tag>,
            },
            { key: "amount", header: "Amount", align: "right", render: (v, row) => <span className={row.type === "income" ? "pos" : "neg"}>${Number(v).toFixed(2)}</span> },
            {
              key: "actions",
              header: "",
              render: (_v, row) => (
                <div className="row-actions">
                  <Button size="sm" className="ghost" onClick={() => alert(`Edit ${row.id}`)}>Edit</Button>
                  <Button size="sm" className="danger" onClick={() => setToDelete(row)}>Delete</Button>
                </div>
              ),
              align: "right",
            },
          ]}
          data={data}
          loading={loading}
          emptyText="No transactions found."
        />
      </Card>

      <Confirm
        open={!!toDelete}
        title="Delete transaction?"
        message={`This action cannot be undone. Proceed to delete "${toDelete?.note || ""}"?`}
        onCancel={() => setToDelete(null)}
        onConfirm={onDelete}
      />
    </div>
  );
}
