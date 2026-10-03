import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { categories } from "../data/seed";
import { useFinance } from "../context/FinanceContext";

const blank = { title:"", amount:"", type:"expense", category:"Food", date:new Date().toISOString().slice(0,10), note:"", payment:"UPI" };

export default function TransactionForm({ editing, onClose }) {
  const { addTransaction, updateTransaction } = useFinance();
  const [form, setForm] = useState(editing || blank);
  useEffect(() => setForm(editing || blank), [editing]);

  const submit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !Number(form.amount) || Number(form.amount) <= 0) return;
    const payload = { ...form, amount: Number(form.amount), category: form.category };
    editing ? updateTransaction(editing.id, payload) : addTransaction(payload);
    onClose();
  };

  const set = (key, value) => setForm(f => ({...f, [key]: value}));
  const opts = categories[form.type];

  return <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/50 p-4">
    <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl dark:bg-slate-900">
      <div className="mb-5 flex items-center justify-between"><div><h2 className="text-xl font-extrabold dark:text-white">{editing ? "Edit transaction" : "Add transaction"}</h2><p className="text-sm text-slate-500">Keep your money history accurate.</p></div><button onClick={onClose}><X/></button></div>
      <form onSubmit={submit} className="space-y-4">
        <div><label className="label">Title</label><input className="input" value={form.title} onChange={e=>set("title",e.target.value)} placeholder="e.g. Grocery shopping" required /></div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div><label className="label">Amount</label><input className="input" type="number" min="1" value={form.amount} onChange={e=>set("amount",e.target.value)} required /></div>
          <div><label className="label">Date</label><input className="input" type="date" value={form.date} onChange={e=>set("date",e.target.value)} required /></div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div><label className="label">Type</label><select className="input" value={form.type} onChange={e=>{set("type",e.target.value);set("category",categories[e.target.value][0])}}><option value="expense">Expense</option><option value="income">Income</option></select></div>
          <div><label className="label">Category</label><select className="input" value={form.category} onChange={e=>set("category",e.target.value)}>{opts.map(c=><option key={c}>{c}</option>)}</select></div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div><label className="label">Payment method</label><select className="input" value={form.payment} onChange={e=>set("payment",e.target.value)}><option>UPI</option><option>Card</option><option>Cash</option><option>Bank Transfer</option></select></div>
          <div><label className="label">Note</label><input className="input" value={form.note} onChange={e=>set("note",e.target.value)} placeholder="Optional note" /></div>
        </div>
        <div className="flex justify-end gap-2 pt-2"><button type="button" className="btn-secondary" onClick={onClose}>Cancel</button><button className="btn-primary">{editing ? "Save changes" : "Add transaction"}</button></div>
      </form>
    </div>
  </div>;
}