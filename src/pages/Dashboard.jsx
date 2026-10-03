import { useMemo, useState } from "react";
import { ArrowRight, Plus, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useFinance } from "../context/FinanceContext";
import StatCard from "../components/StatCard";
import TransactionForm from "../components/TransactionForm";
import { formatMoney, formatDate, monthKey } from "../utils/format";

export default function Dashboard() {
  const { transactions, budgets, stats } = useFinance();
  const [showForm, setShowForm] = useState(false);
  const recent = transactions.slice(0,5);

  const chart = useMemo(() => {
    const map = {};
    transactions.forEach(t => {
      const key = monthKey(t.date);
      map[key] ||= { month: new Date(t.date).toLocaleString("en",{month:"short"}), income:0, expense:0 };
      map[key][t.type] += Number(t.amount);
    });
    return Object.values(map).slice(-6);
  }, [transactions]);

  return <div className="space-y-7">
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div><p className="text-sm font-semibold text-brand-600">Overview</p><h1 className="mt-1 text-3xl font-extrabold tracking-tight dark:text-white">Good to see you 👋</h1><p className="mt-1 text-sm text-slate-500">Here’s what’s happening with your money.</p></div>
      <button className="btn-primary" onClick={()=>setShowForm(true)}><Plus size={18}/> Add transaction</button>
    </div>

    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <StatCard title="Total Balance" value={stats.balance} type="balance"/>
      <StatCard title="Income" value={stats.income} type="income"/>
      <StatCard title="Expenses" value={stats.expense} type="expense"/>
      <div className="card p-5"><p className="text-sm text-slate-500">Savings Rate</p><p className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white">{stats.savingsRate.toFixed(1)}%</p><div className="mt-4 h-2 rounded-full bg-slate-100 dark:bg-slate-800"><div className="h-full rounded-full bg-emerald-500" style={{width:`${Math.max(0,Math.min(100,stats.savingsRate))}%`}}/></div><p className="mt-2 text-xs text-slate-400">Based on recorded income</p></div>
    </div>

    <div className="grid gap-5 xl:grid-cols-3">
      <div className="card p-5 xl:col-span-2">
        <div className="mb-4 flex items-center justify-between"><div><h2 className="font-bold dark:text-white">Cash flow</h2><p className="text-xs text-slate-400">Income vs expenses</p></div><TrendingUp className="text-brand-600"/></div>
        <div className="h-72"><ResponsiveContainer width="100%" height="100%"><BarChart data={chart}><CartesianGrid vertical={false} strokeDasharray="3 3"/><XAxis dataKey="month" tickLine={false} axisLine={false}/><YAxis tickLine={false} axisLine={false}/><Tooltip formatter={(v)=>formatMoney(v)}/><Bar dataKey="income" fill="#6366f1" radius={[5,5,0,0]}/><Bar dataKey="expense" fill="#fb7185" radius={[5,5,0,0]}/></BarChart></ResponsiveContainer></div>
      </div>
      <div className="card p-5"><div className="mb-4 flex items-center justify-between"><div><h2 className="font-bold dark:text-white">Budget snapshot</h2><p className="text-xs text-slate-400">This month</p></div><Link to="/budgets" className="text-xs font-semibold text-brand-600">View all</Link></div>
        <div className="space-y-5">{budgets.slice(0,4).map(b => {
          const spent = transactions.filter(t=>t.type==="expense" && t.category===b.category && monthKey(t.date)===monthKey(new Date())).reduce((s,t)=>s+Number(t.amount),0);
          const pct = Math.min(100, spent/b.limit*100);
          return <div key={b.id}><div className="flex justify-between text-sm"><span className="font-medium dark:text-slate-200">{b.category}</span><span className="text-slate-500">{formatMoney(spent)} / {formatMoney(b.limit)}</span></div><div className="mt-2 h-2 rounded-full bg-slate-100 dark:bg-slate-800"><div className={`h-full rounded-full ${pct>=100?"bg-rose-500":pct>=80?"bg-amber-500":"bg-brand-500"}`} style={{width:`${pct}%`}}/></div></div>
        })}</div>
      </div>
    </div>

    <div className="card overflow-hidden">
      <div className="flex items-center justify-between border-b border-slate-100 p-5 dark:border-slate-800"><div><h2 className="font-bold dark:text-white">Recent transactions</h2><p className="text-xs text-slate-400">Your latest activity</p></div><Link to="/transactions" className="flex items-center gap-1 text-sm font-semibold text-brand-600">See all <ArrowRight size={15}/></Link></div>
      <div className="divide-y divide-slate-100 dark:divide-slate-800">{recent.map(t=><div key={t.id} className="flex items-center justify-between p-4"><div><p className="font-semibold dark:text-slate-100">{t.title}</p><p className="text-xs text-slate-400">{t.category} · {formatDate(t.date)}</p></div><span className={`font-bold ${t.type==="income"?"text-emerald-600":"text-rose-500"}`}>{t.type==="income"?"+":"-"}{formatMoney(t.amount)}</span></div>)}</div>
    </div>
    {showForm && <TransactionForm onClose={()=>setShowForm(false)}/>}
  </div>;
}