import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Budgets from "./pages/Budgets";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";

export default function App() {
  return <Routes><Route element={<Layout/>}><Route path="/" element={<Dashboard/>}/><Route path="/transactions" element={<Transactions/>}/><Route path="/budgets" element={<Budgets/>}/><Route path="/analytics" element={<Analytics/>}/><Route path="/settings" element={<Settings/>}/></Route></Routes>;
}