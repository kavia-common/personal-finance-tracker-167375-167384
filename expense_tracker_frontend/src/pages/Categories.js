import { useEffect, useState } from "react";
import { CategoriesAPI } from "../services/api";
import { Card, Table, Input, Select, Button, Notice } from "../shared";

export default function Categories() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ name: "", type: "expense" });
  const [notice, setNotice] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await CategoriesAPI.list();
      setList(Array.isArray(res) ? res : []);
    } catch {
      setList([
        { id: "groc", name: "Groceries", type: "expense" },
        { id: "util", name: "Utilities", type: "expense" },
        { id: "sal", name: "Salary", type: "income" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const onCreate = async (e) => {
    e.preventDefault();
    setCreating(true);
    setNotice(null);
    try {
      await CategoriesAPI.create(form);
      setForm({ name: "", type: "expense" });
      setNotice({ type: "success", text: "Category created." });
      load();
    } catch (err) {
      setNotice({ type: "error", text: err.message || "Failed to create category." });
    } finally {
      setCreating(false);
    }
  };

  const remove = async (id) => {
    try {
      await CategoriesAPI.remove(id);
      load();
    } catch {
      // ignore
    }
  };

  return (
    <div className="stack-lg">
      <Card title="Create Category">
        {notice && <Notice type={notice.type} text={notice.text} />}
        <form className="form-inline" onSubmit={onCreate}>
          <Input label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="e.g., Groceries" />
          <Select
            label="Type"
            value={form.type}
            onChange={(v) => setForm({ ...form, type: v })}
            options={[
              { value: "expense", label: "Expense" },
              { value: "income", label: "Income" },
            ]}
          />
          <Button type="submit" loading={creating} className="primary">Add</Button>
        </form>
      </Card>

      <Card title="Categories">
        <Table
          columns={[
            { key: "name", header: "Name" },
            { key: "type", header: "Type" },
            {
              key: "actions",
              header: "",
              align: "right",
              render: (_v, row) => <Button size="sm" className="danger" onClick={() => remove(row.id)}>Delete</Button>,
            },
          ]}
          data={list}
          loading={loading}
          emptyText="No categories yet."
        />
      </Card>
    </div>
  );
}
