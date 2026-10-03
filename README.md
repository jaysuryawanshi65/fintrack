# FinTrack

FinTrack is a responsive personal finance dashboard built with React and Vite. It helps users manage day-to-day money tracking with a simple UI for viewing balance, adding transactions, creating budgets, and reviewing spending trends.

This project is a frontend-only portfolio app that stores data in the browser using `localStorage`, so it works without any backend service.

## Features

- Dashboard summary cards for balance, income, expenses, and savings rate
- Add, edit, and delete transactions
- Search and filter transactions by type and category
- Budget tracking with category-wise limits and progress bars
- Analytics pages with charts for income vs expenses and spending patterns
- Dark mode and light mode support
- Currency selection and user profile settings
- Local persistence using browser storage
- Responsive sidebar and mobile-friendly layout

## Tech Stack

- React 18
- Vite
- JavaScript
- Tailwind CSS
- React Router
- Recharts
- Lucide React
- Context API

## Project Structure

```text
fintrack/
├─ index.html
├─ package.json
├─ postcss.config.js
├─ tailwind.config.js
├─ vite.config.js
├─ src/
│  ├─ App.jsx
│  ├─ index.css
│  ├─ main.jsx
│  ├─ components/
│  │  ├─ Layout.jsx
│  │  ├─ StatCard.jsx
│  │  └─ TransactionForm.jsx
│  ├─ context/
│  │  └─ FinanceContext.jsx
│  ├─ data/
│  │  └─ seed.js
│  ├─ pages/
│  │  ├─ Analytics.jsx
│  │  ├─ Budgets.jsx
│  │  ├─ Dashboard.jsx
│  │  ├─ Settings.jsx
│  │  └─ Transactions.jsx
│  └─ utils/
│     └─ format.js
└─ public/
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the app locally

```bash
npm run dev
```

Then open the local URL shown in the terminal, usually:

```text
http://localhost:5173
```

### 3. Build for production

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## How it works

The app uses a shared `FinanceContext` to manage:

- transactions
- budgets
- theme
- selected currency
- user profile
- simplified financial stats

This avoids prop drilling and keeps the UI state consistent across pages.

The app reads and writes data to `localStorage`, so the transaction list and budgets remain saved after refresh.

## Demo Data

The app includes seed data in `src/data/seed.js` to demonstrate transactions and budget categories immediately when the app loads.

## Notes

- This is a frontend demo and not a real banking product.
- There is no authentication or backend database yet.
- Data is stored in the browser only and is best suited for demo, learning, or portfolio use.

## Future Improvements

Possible upgrades for a production-ready version include:

- login/authentication
- backend API integration
- database storage
- recurring transactions
- export/import of CSV/JSON
- user dashboards and reports
- test coverage

## License

This project is provided for learning and portfolio purposes.
