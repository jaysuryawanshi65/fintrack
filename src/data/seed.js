export const categories = {
  income: ["Salary", "Freelance", "Investment", "Other Income"],
  expense: ["Food", "Transport", "Shopping", "Bills", "Entertainment", "Health", "Education", "Rent", "Other Expense"]
};

const daysAgo = (n) => {
  const d = new Date();
  d.setHours(12, 0, 0, 0);
  d.setDate(d.getDate() - n);
  return d.toISOString().slice(0, 10);
};

export const seedTransactions = [
  { id: "t1", title: "Monthly Salary", amount: 62000, type: "income", category: "Salary", date: daysAgo(2), note: "September salary", payment: "Bank Transfer" },
  { id: "t2", title: "Apartment Rent", amount: 15000, type: "expense", category: "Rent", date: daysAgo(3), note: "Monthly rent", payment: "UPI" },
  { id: "t3", title: "Grocery Run", amount: 2840, type: "expense", category: "Food", date: daysAgo(4), note: "Weekly groceries", payment: "Card" },
  { id: "t4", title: "Metro & Cabs", amount: 1280, type: "expense", category: "Transport", date: daysAgo(5), note: "Commute", payment: "UPI" },
  { id: "t5", title: "Freelance Website", amount: 8500, type: "income", category: "Freelance", date: daysAgo(7), note: "Landing page project", payment: "Bank Transfer" },
  { id: "t6", title: "Streaming", amount: 699, type: "expense", category: "Entertainment", date: daysAgo(9), note: "Monthly subscriptions", payment: "Card" },
  { id: "t7", title: "Electricity Bill", amount: 2140, type: "expense", category: "Bills", date: daysAgo(11), note: "Home electricity", payment: "UPI" },
  { id: "t8", title: "Online Course", amount: 1800, type: "expense", category: "Education", date: daysAgo(13), note: "Frontend course", payment: "Card" },
  { id: "t9", title: "Stock Dividend", amount: 1750, type: "income", category: "Investment", date: daysAgo(15), note: "Quarterly dividend", payment: "Bank Transfer" },
  { id: "t10", title: "Dinner Out", amount: 1250, type: "expense", category: "Food", date: daysAgo(17), note: "Weekend dinner", payment: "UPI" },
  { id: "t11", title: "Medicine", amount: 820, type: "expense", category: "Health", date: daysAgo(20), note: "Pharmacy", payment: "UPI" },
  { id: "t12", title: "New Sneakers", amount: 3200, type: "expense", category: "Shopping", date: daysAgo(22), note: "Running shoes", payment: "Card" }
];

export const seedBudgets = [
  { id: "b1", category: "Food", limit: 7000 },
  { id: "b2", category: "Transport", limit: 4000 },
  { id: "b3", category: "Shopping", limit: 6000 },
  { id: "b4", category: "Bills", limit: 7000 },
  { id: "b5", category: "Entertainment", limit: 3000 },
  { id: "b6", category: "Health", limit: 2500 }
];