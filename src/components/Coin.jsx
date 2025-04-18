import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { SingleCoin, HistoricalChart } from "../config/info";
import { Data } from "../Context";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

function Coin() {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [days, setDays] = useState(1);
  const [chartData, setChartData] = useState([]);
  const { currency, symbol } = useContext(Data);

  useEffect(() => {
    const fetchCoinDetails = async () => {
      try {
        setLoading(true);
        const res = await fetch(SingleCoin(id));
        const data = await res.json();
        setCoin(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoinDetails();
  }, [id]);

  useEffect(() => {
    const fetchChart = async () => {
      try {
        const res = await fetch(HistoricalChart(id, days, currency)); // <- use your function here
        const data = await res.json();
        setChartData(data.prices);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchChart();
  }, [id, days, currency]); // <- make sure currency is in dependency list

  if (loading)
    return <div className="text-white text-center mt-5">Loading...</div>;
  if (error)
    return (
      <div className="text-danger text-center mt-5">
        Error loading coin details
      </div>
    );

  const labels = chartData.map((item) => {
    const date = new Date(item[0]);
    return days === 1 ? `${date.getHours()}:00` : date.toLocaleDateString();
  });

  const data = {
    labels,
    datasets: [
      {
        label: `${coin.name} Price (USD)`,
        data: chartData.map((item) => item[1]),
        borderColor: "gold",
        backgroundColor: "rgba(255, 215, 0, 0.2)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <div className="container my-5 text-white">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-4">
          <div
            className="bg-dark p-4 rounded shadow"
            style={{ minHeight: "560px" }}
          >
            <div className="text-center">
              <img
                src={coin.image.large}
                alt={coin.name}
                height="100"
                className="mb-3"
              />
              <h4 className="fw-bold">{coin.name}</h4>
              <small className="text-muted">
                ({coin.symbol.toUpperCase()})
              </small>
            </div>
            <hr className="border-secondary" />
            <div
              style={{ maxHeight: "150px", overflowY: "auto" }}
              className="mb-3"
            >
              <p
                dangerouslySetInnerHTML={{
                  __html: coin.description.en.split(". ")[0] + ".",
                }}
              ></p>
            </div>
            <p>
              <strong>Current Price: </strong>
              <br />
              {symbol}
              {coin.market_data.current_price[
                currency.toLowerCase()
              ].toLocaleString()}
            </p>
            <p>
              <strong>Market Cap: </strong>
              <br />
              {symbol}
              {coin.market_data.market_cap[
                currency.toLowerCase()
              ].toLocaleString()}
            </p>
          </div>
        </div>

        {/* Main Chart Content */}
        <div className="col-md-8">
          <h3 className="fw-bold text-warning mb-3">{coin.name} Chart</h3>

          {/* Chart Filter Buttons */}
          <div className="d-flex justify-content-end gap-2 mb-4">
            {[1, 7, 14, 30].map((d) => (
              <button
                key={d}
                className={`btn ${
                  days === d ? "btn-warning" : "btn-outline-warning"
                }`}
                onClick={() => setDays(d)}
              >
                {d === 1 ? "24 Hours" : `${d} Days`}
              </button>
            ))}
          </div>

          {/* Chart Display */}
          <div className="bg-dark rounded p-4">
            <Line data={data} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Coin;
