export const formatMoney = (amount, currency = "INR") => {
  const locales = { INR: "en-IN", USD: "en-US", EUR: "de-DE", GBP: "en-GB" };
  return new Intl.NumberFormat(locales[currency] || "en-IN", {
    style: "currency", currency, maximumFractionDigits: 0
  }).format(Number(amount) || 0);
};

export const formatDate = (date) =>
  new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(date));

export const monthKey = (date) => {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`;
};

export const currentMonth = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`;
};