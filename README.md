---

# 🚀 React + Vite Crypto Dashboard

This project is a cryptocurrency dashboard built with **React**, **Vite**, and **Chart.js**. It fetches live data from the CoinGecko API and displays price charts with currency switching.

---

## 📦 Prerequisites

Before running the application, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or above recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) package manager

---

## 🛠 Installation

1. **Clone the repository**  
   ```bash
   git clone https://github.com/ashwakshaik14/coin_geko
   cd coin_geko
   ```

2. **Install dependencies**  
   Using npm:
   ```bash
   npm install
   ```
   Or with yarn:
   ```bash
   yarn
   ```

---

## ▶️ Running the Application Locally

Start the development server:

```bash
npm run dev
```

or

```bash
yarn dev
```

Then open your browser and navigate to:

```
http://localhost:5173
```

Vite uses **Hot Module Replacement (HMR)** so any changes you make will reflect instantly without full reload.

---

## 🧱 Project Structure

```plaintext
.
├── public/               # Static assets
├── src/
│   ├── components/       # Reusable components
│   ├── pages/            # Page-level components
│   ├── config/           # API endpoints or constants
│   ├── Context.jsx       # Global context for currency
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── vite.config.js
└── README.md
```

---

## 📦 Main Dependencies

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Chart.js](https://www.chartjs.org/)
- [React ChartJS 2](https://react-chartjs-2.js.org/)
- [React Router DOM](https://reactrouter.com/)
- [CoinGecko API](https://www.coingecko.com/en/api)

---