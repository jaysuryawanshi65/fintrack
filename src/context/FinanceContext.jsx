import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { seedBudgets, seedTransactions } from "../data/seed";

const FinanceContext = createContext(null);
const read = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch { return fallback; }
};

export function FinanceProvider({ children }) {
  const [transactions, setTransactions] = useState(() => read("fintrack_transactions", seedTransactions));
  const [budgets, setBudgets] = useState(() => read("fintrack_budgets", seedBudgets));
  const [theme, setTheme] = useState(() => localStorage.getItem("fintrack_theme") || "light");
  const [currency, setCurrency] = useState(() => localStorage.getItem("fintrack_currency") || "INR");
  const [profile, setProfile] = useState(() => read("fintrack_profile", { name: "Jay", email: "jay@example.com" }));

  useEffect(() => localStorage.setItem("fintrack_transactions", JSON.stringify(transactions)), [transactions]);
  useEffect(() => localStorage.setItem("fintrack_budgets", JSON.stringify(budgets)), [budgets]);
  useEffect(() => localStorage.setItem("fintrack_theme", theme), [theme]);
  useEffect(() => localStorage.setItem("fintrack_currency", currency), [currency]);
  useEffect(() => localStorage.setItem("fintrack_profile", JSON.stringify(profile)), [profile]);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const addTransaction = (tx) => setTransactions((prev) => [{ ...tx, id: crypto.randomUUID() }, ...prev]);
  const updateTransaction = (id, patch) => setTransactions((prev) => prev.map((t) => t.id === id ? { ...t, ...patch } : t));
  const deleteTransaction = (id) => setTransactions((prev) => prev.filter((t) => t.id !== id));
  const addBudget = (budget) => setBudgets((prev) => [...prev, { ...budget, id: crypto.randomUUID() }]);
  const updateBudget = (id, patch) => setBudgets((prev) => prev.map((b) => b.id === id ? { ...b, ...patch } : b));
  const deleteBudget = (id) => setBudgets((prev) => prev.filter((b) => b.id !== id));

  const stats = useMemo(() => {
    const income = transactions.filter(t => t.type === "income").reduce((s,t) => s + Number(t.amount), 0);
    const expense = transactions.filter(t => t.type === "expense").reduce((s,t) => s + Number(t.amount), 0);
    return { income, expense, balance: income - expense, savingsRate: income ? ((income-expense)/income)*100 : 0 };
  }, [transactions]);

  const resetDemo = () => {
    setTransactions(seedTransactions);
    setBudgets(seedBudgets);
    setProfile({ name: "Jay", email: "jay@example.com" });
  };

  const value = { transactions, budgets, theme, setTheme, currency, setCurrency, profile, setProfile,
    addTransaction, updateTransaction, deleteTransaction, addBudget, updateBudget, deleteBudget, stats, resetDemo };

  return <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>;
}

export const useFinance = () => useContext(FinanceContext);