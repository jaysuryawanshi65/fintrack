import { useMemo } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend, Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { useFinance } from "../context/FinanceContext";
import { formatMoney, monthKey } from "../utils/format";

export default function Analytics() {
  const { transactions } = useFinance();
  const categories = useMemo(() => {
    const map={}; transactions.filter(t=>t.type==="expense").forEach(t=>map[t.category]=(map[t.category]||0)+Number(t.amount));
    return Object.entries(map).map(([name,value])=>({name,value})).sort((a,b)=>b.value-a.value);
  },[transactions]);
  const trend = useMemo(() => {
    const map={}; transactions.forEach(t=>{const k=monthKey(t.date);map[k] ||= {month:new Date(t.date).toLocaleString("en",{month:"short"}),income:0,expense:0};map[k][t.type]+=Number(t.amount)});
    return Object.values(map).slice(-6);
  },[transactions]);
  return <div className="space-y-6">
    <div><p className="text-sm font-semibold text-brand-600">Insights</p><h1 className="text-3xl font-extrabold dark:text-white">Analytics</h1><p className="mt-1 text-sm text-slate-500">Understand where your money goes.</p></div>
    <div className="grid gap-5 lg:grid-cols-2">
      <div className="card p-5"><h2 className="font-bold dark:text-white">Expense by category</h2><div className="mt-3 h-80"><ResponsiveContainer><PieChart><Pie data={categories} dataKey="value" nameKey="name" innerRadius={75} outerRadius={115} paddingAngle={3}>{categories.map((_,i)=><Cell key={i} fill={["#6366f1","#14b8a6","#f59e0b","#fb7185","#8b5cf6","#0ea5e9","#84cc16","#f97316"][i%8]}/>)}</Pie><Tooltip formatter={(v)=>formatMoney(v)}/><Legend/></PieChart></ResponsiveContainer></div></div>
      <div className="card p-5"><h2 className="font-bold dark:text-white">Monthly trend</h2><div className="mt-3 h-80"><ResponsiveContainer><LineChart data={trend}><CartesianGrid vertical={false} strokeDasharray="3 3"/><XAxis dataKey="month" tickLine={false}/><YAxis tickLine={false}/><Tooltip formatter={(v)=>formatMoney(v)}/><Line type="monotone" dataKey="income" stroke="#6366f1" strokeWidth={3} dot={false}/><Line type="monotone" dataKey="expense" stroke="#fb7185" strokeWidth={3} dot={false}/></LineChart></ResponsiveContainer></div></div>
    </div>
    <div className="card p-5"><h2 className="font-bold dark:text-white">Category breakdown</h2><div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{categories.map((c,i)=><div key={c.name} className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800"><div className="flex items-center justify-between"><span className="text-sm font-semibold dark:text-slate-100">{c.name}</span><span className="text-xs text-slate-400">#{i+1}</span></div><p className="mt-2 text-xl font-extrabold dark:text-white">{formatMoney(c.value)}</p></div>)}</div></div>
  </div>;
}