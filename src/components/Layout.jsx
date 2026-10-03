import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { BarChart3, ChevronLeft, CreditCard, LayoutDashboard, Menu, Settings, Wallet, X } from "lucide-react";
import { useFinance } from "../context/FinanceContext";

const nav = [
  ["/", "Dashboard", LayoutDashboard],
  ["/transactions", "Transactions", CreditCard],
  ["/budgets", "Budgets", Wallet],
  ["/analytics", "Analytics", BarChart3],
  ["/settings", "Settings", Settings]
];

export default function Layout() {
  const [open, setOpen] = useState(false);
  const { profile, stats, currency } = useFinance();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 border-r border-slate-200 bg-white p-4 transition-transform dark:border-slate-800 dark:bg-slate-900 ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="flex items-center justify-between px-2 py-3">
          <div className="flex items-center gap-2">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand-600 text-white"><Wallet size={21}/></div>
            <div><p className="font-extrabold text-slate-900 dark:text-white">FinTrack</p><p className="text-[11px] text-slate-400">Money, simplified.</p></div>
          </div>
          <button className="lg:hidden" onClick={() => setOpen(false)}><X/></button>
        </div>

        <nav className="mt-7 space-y-1">
          {nav.map(([to, label, Icon]) => (
            <NavLink key={to} to={to} end={to === "/"} onClick={() => setOpen(false)}
              className={({isActive}) => `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${isActive ? "bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-400" : "text-slate-500 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"}`}>
              <Icon size={18}/>{label}
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
          <p className="text-xs text-slate-500">Current balance</p>
          <p className="mt-1 text-xl font-extrabold text-slate-900 dark:text-white">{currency === "INR" ? "₹" : currency} {stats.balance.toLocaleString("en-IN")}</p>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700"><div className="h-full w-3/4 rounded-full bg-brand-600"/></div>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90 lg:px-8">
          <button className="rounded-lg p-2 hover:bg-slate-100 lg:hidden dark:hover:bg-slate-800" onClick={() => setOpen(true)}><Menu/></button>
          <div className="hidden lg:block"><p className="text-sm font-semibold text-slate-500">Personal Finance</p><p className="text-xs text-slate-400">Track. Plan. Grow.</p></div>
          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block"><p className="text-sm font-bold text-slate-800 dark:text-slate-100">{profile.name}</p><p className="text-xs text-slate-400">{profile.email}</p></div>
            <div className="grid h-10 w-10 place-items-center rounded-full bg-brand-100 font-bold text-brand-700 dark:bg-brand-500/20 dark:text-brand-300">{profile.name?.slice(0,1).toUpperCase()}</div>
          </div>
        </header>
        <main className="p-4 lg:p-8"><Outlet /></main>
      </div>
    </div>
  );
}