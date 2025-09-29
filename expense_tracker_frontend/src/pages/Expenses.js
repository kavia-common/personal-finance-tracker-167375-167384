import { useEffect, useMemo, useState } from "react";
import { CategoriesAPI, ExpensesAPI } from "../services/api";
import { Card, Input, Select, DateInput, NumberInput, Button, Notice } from "../shared";

const defaultForm = {
  date: new Date().toISOString().slice(0, 10),
  categoryId: "",
  amount: "",
  note: "",
  type: "expense", // income or expense
};

// PUBLIC_INTERFACE
export default function Expenses() {
  const [form, setForm] = useState(defaultForm);
  const [categories, setCategories] = useState([]);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState(null);

  const filteredCategories = useMemo(
    () => categories.filter(c => form.type === "income" ? c.type === "income" : c.type !== "income"),
    [categories, form.type]
  );

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const list = await CategoriesAPI.list();
        setCategories(Array.isArray(list) ? list : []);
      } catch {
        // fallback
        setCategories([
          { id: "groc", name: "Groceries", type: "expense" },
          { id: "util", name: "Utilities", type: "expense" },
          { id: "inc", name: "Salary", type: "income" },
        ]);
      }
    };
    loadCategories();
  }, []);

  const onChange = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setNotice(null);
    try {
      const payload = {
        date: form.date,
        categoryId: form.categoryId,
        amount: Number(form.amount),
        note: form.note,
        type: form.type,
      };
      await ExpensesAPI.create(payload);
      setNotice({ type: "success", text: "Transaction saved." });
      setForm(defaultForm);
    } catch (err) {
      setNotice({ type: "error", text: err.message || "Failed to save transaction." });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="stack-lg">
      <Card title="Add Income / Expense" subtitle="Record a new transaction">
        {notice && <Notice type={notice.type} text={notice.text} />}
        <form className="form-grid" onSubmit={onSubmit}>
          <Select
            label="Type"
            value={form.type}
            onChange={(v) => onChange("type", v)}
            options={[
              { value: "expense", label: "Expense" },
              { value: "income", label: "Income" },
            ]}
          />
          <DateInput label="Date" value={form.date} onChange={(v) => onChange("date", v)} />
          <Select
            label="Category"
            value={form.categoryId}
            onChange={(v) => onChange("categoryId", v)}
            options={filteredCategories.map(c => ({ value: c.id, label: c.name }))}
            placeholder="Select category"
          />
          <NumberInput label="Amount" value={form.amount} onChange={(v) => onChange("amount", v)} min="0" step="0.01" />
          <Input label="Note" value={form.note} onChange={(v) => onChange("note", v)} placeholder="Description (optional)" />
          <div className="form-actions">
            <Button type="submit" loading={saving} className="primary">Save</Button>
            <Button type="button" className="ghost" onClick={() => setForm(defaultForm)}>Reset</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
