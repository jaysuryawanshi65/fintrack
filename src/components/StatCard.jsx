import { ArrowDownRight, ArrowUpRight, Wallet } from "lucide-react";
import { formatMoney } from "../utils/format";

export default function StatCard({ title, value, type }) {
  const Icon = type === "income" ? ArrowUpRight : type === "expense" ? ArrowDownRight : Wallet;
  const tone = type === "income" ? "text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10" : type === "expense" ? "text-rose-600 bg-rose-50 dark:bg-rose-500/10" : "text-brand-600 bg-brand-50 dark:bg-brand-500/10";
  return <div className="card p-5">
    <div className="flex items-start justify-between"><div><p className="text-sm text-slate-500">{title}</p><p className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white">{formatMoney(value)}</p></div><div className={`rounded-xl p-2.5 ${tone}`}><Icon size={20}/></div></div>
    <p className="mt-3 text-xs text-slate-400">{type === "income" ? "Money received" : type === "expense" ? "Money spent" : "Income minus expenses"}</p>
  </div>;
}