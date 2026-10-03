import { useMemo, useState } from "react";
import { Edit3, Plus, Search, Trash2 } from "lucide-react";
import { useFinance } from "../context/FinanceContext";
import TransactionForm from "../components/TransactionForm";
import { formatDate, formatMoney } from "../utils/format";

export default function Transactions() {
  const { transactions, deleteTransaction } = useFinance();
  const [query,setQuery]=useState(""); const [type,setType]=useState("all"); const [category,setCategory]=useState("all"); const [editing,setEditing]=useState(null); const [show,setShow]=useState(false);
  const filtered = useMemo(()=>transactions.filter(t => (type==="all"||t.type===type) && (category==="all"||t.category===category) && `${t.title} ${t.category} ${t.note}`.toLowerCase().includes(query.toLowerCase())),[transactions,query,type,category]);
  const cats=[...new Set(transactions.map(t=>t.category))];

  return <div className="space-y-6">
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-sm font-semibold text-brand-600">Money activity</p><h1 className="text-3xl font-extrabold dark:text-white">Transactions</h1><p className="mt-1 text-sm text-slate-500">{transactions.length} records saved locally.</p></div><button className="btn-primary" onClick={()=>setShow(true)}><Plus size={18}/> Add transaction</button></div>
    <div className="card p-4"><div className="grid gap-3 md:grid-cols-3"><div className="relative md:col-span-1"><Search className="absolute left-3 top-2.5 text-slate-400" size={18}/><input className="input pl-10" placeholder="Search transactions..." value={query} onChange={e=>setQuery(e.target.value)}/></div><select className="input" value={type} onChange={e=>setType(e.target.value)}><option value="all">All types</option><option value="income">Income</option><option value="expense">Expenses</option></select><select className="input" value={category} onChange={e=>setCategory(e.target.value)}><option value="all">All categories</option>{cats.map(c=><option key={c}>{c}</option>)}</select></div></div>
    <div className="card overflow-hidden">
      <div className="hidden grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 border-b border-slate-100 p-4 text-xs font-bold uppercase tracking-wide text-slate-400 dark:border-slate-800 md:grid"><span>Description</span><span>Category</span><span>Date</span><span>Amount</span><span/></div>
      {filtered.length ? filtered.map(t=><div key={t.id} className="grid gap-3 border-b border-slate-100 p-4 last:border-0 dark:border-slate-800 md:grid-cols-[2fr_1fr_1fr_1fr_auto] md:items-center"><div><p className="font-semibold dark:text-white">{t.title}</p><p className="text-xs text-slate-400">{t.note || t.payment}</p></div><span className="text-sm text-slate-500">{t.category}</span><span className="text-sm text-slate-500">{formatDate(t.date)}</span><span className={`font-bold ${t.type==="income"?"text-emerald-600":"text-rose-500"}`}>{t.type==="income"?"+":"-"}{formatMoney(t.amount)}</span><div className="flex gap-1"><button className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-brand-600 dark:hover:bg-slate-800" onClick={()=>setEditing(t)}><Edit3 size={16}/></button><button className="rounded-lg p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-slate-800" onClick={()=>{if(confirm("Delete this transaction?")) deleteTransaction(t.id)}}><Trash2 size={16}/></button></div></div>) : <div className="p-12 text-center text-sm text-slate-500">No transactions match your filters.</div>}
    </div>
    {(show||editing) && <TransactionForm editing={editing} onClose={()=>{setShow(false);setEditing(null)}}/>}
  </div>;
}