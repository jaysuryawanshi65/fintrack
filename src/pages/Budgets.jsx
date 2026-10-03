import { useMemo, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { useFinance } from "../context/FinanceContext";
import { formatMoney, monthKey } from "../utils/format";
import { categories } from "../data/seed";

export default function Budgets() {
  const { budgets, transactions, addBudget, deleteBudget } = useFinance();
  const [category,setCategory]=useState("Food"); const [limit,setLimit]=useState("");
  const available=categories.expense.filter(c=>!budgets.some(b=>b.category===c));
  const rows=useMemo(()=>budgets.map(b=>{const spent=transactions.filter(t=>t.type==="expense"&&t.category===b.category&&monthKey(t.date)===monthKey(new Date())).reduce((s,t)=>s+Number(t.amount),0);return {...b,spent,pct:b.limit?spent/b.limit*100:0}}),[budgets,transactions]);
  const add=(e)=>{e.preventDefault();if(!limit||!category)return;addBudget({category,limit:Number(limit)});setLimit("");setCategory(categories.expense.find(c=>!budgets.some(b=>b.category===c))||"Food")};

  return <div className="space-y-6">
    <div><p className="text-sm font-semibold text-brand-600">Plan ahead</p><h1 className="text-3xl font-extrabold dark:text-white">Budgets</h1><p className="mt-1 text-sm text-slate-500">Set monthly limits and keep spending under control.</p></div>
    <div className="grid gap-5 xl:grid-cols-3">
      <div className="card p-5"><h2 className="font-bold dark:text-white">Create a budget</h2><p className="mt-1 text-xs text-slate-400">One limit per category.</p><form onSubmit={add} className="mt-5 space-y-4"><div><label className="label">Category</label><select className="input" value={category} onChange={e=>setCategory(e.target.value)}>{available.length?available.map(c=><option key={c}>{c}</option>):<option>No categories left</option>}</select></div><div><label className="label">Monthly limit</label><input className="input" type="number" min="1" value={limit} onChange={e=>setLimit(e.target.value)} placeholder="e.g. 5000"/></div><button className="btn-primary w-full" disabled={!available.length}><Plus size={18}/> Add budget</button></form></div>
      <div className="space-y-4 xl:col-span-2">{rows.map(b=><div className="card p-5" key={b.id}><div className="flex items-center justify-between"><div><p className="font-bold dark:text-white">{b.category}</p><p className="text-xs text-slate-400">{formatMoney(b.spent)} spent of {formatMoney(b.limit)}</p></div><button onClick={()=>deleteBudget(b.id)} className="rounded-lg p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600"><Trash2 size={17}/></button></div><div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"><div className={`h-full rounded-full ${b.pct>=100?"bg-rose-500":b.pct>=80?"bg-amber-500":"bg-brand-500"}`} style={{width:`${Math.min(100,b.pct)}%`}}/></div><div className="mt-2 flex justify-between text-xs text-slate-400"><span>{b.pct.toFixed(0)}% used</span><span>{b.pct>=100?"Over budget":`${formatMoney(Math.max(0,b.limit-b.spent))} remaining`}</span></div></div>)}{!rows.length&&<div className="card p-12 text-center text-sm text-slate-500">Create your first budget to start tracking limits.</div>}</div>
    </div>
  </div>;
}