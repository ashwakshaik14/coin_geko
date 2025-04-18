
import React, { useEffect, useState, useContext } from 'react';
import { CoinList } from '../config/info';
import { Data } from '../Context';
import { Link } from 'react-router-dom';  // Import Link for navigation

function Coinstable() {
  const { currency, symbol } = useContext(Data);
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchCoins = async () => {
      setLoading(true);
      const res = await fetch(CoinList(currency));
      const data = await res.json();
      setCoins(data);
      setLoading(false);
    };

    fetchCoins();
  }, [currency]);

  // Filter coins based on search
  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
    );
  };

  const paginatedData = handleSearch().slice((page - 1) * 10, page * 10);

  return (
    <div className="container my-5 text-white">
      <h2 className="text-center mb-4 fw-bold">Cryptocurrency Prices by Market Cap</h2>

      {/* Search Bar */}
      <div className="mb-4 d-flex justify-content-center">
        <input
          type="text"
          placeholder="Search by coin name or symbol..."
          className="form-control w-50"
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1); // reset to first page on search
          }}
        />
      </div>

      {/* Coin Table */}
      <div className="table-responsive">
        <table className="table table-dark table-hover text-center">
          <thead className="table-warning">
            <tr>
              <th>Coin</th>
              <th>Price</th>
              <th>24h Change</th>
              <th>Market Cap</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="text-center">Loading...</td>
              </tr>
            ) : (
              paginatedData.map((coin) => {
                const profit = coin.price_change_percentage_24h >= 0;
                return (
                  <tr key={coin.id}>
                    <td className="d-flex align-items-center gap-3">
                      <Link to={`/coins/${coin.id}`} className="text-decoration-none text-light">
                        <img src={coin.image} alt={coin.name} height="30" />
                      </Link>
                      <div>
                        <div className="fw-bold">{coin.symbol.toUpperCase()}</div>
                        <div className="text-light small">{coin.name}</div>
                      </div>
                    </td>
                    <td>{symbol} {coin.current_price.toLocaleString()}</td>
                    <td style={{ color: profit ? 'limegreen' : 'red' }}>
                      {profit && '+'}
                      {coin.price_change_percentage_24h?.toFixed(2)}%
                    </td>
                    <td>{symbol} {coin.market_cap.toLocaleString()}</td>
                    <td>
                      <Link to={`/coins/${coin.id}`} className="btn btn-outline-warning">
                        View
                      </Link>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-4">
        {Array.from({
          length: Math.ceil(handleSearch().length / 10),
        }).map((_, i) => (
          <button
            key={i}
            className={`btn mx-1 ${page === i + 1 ? 'btn-warning' : 'btn-outline-warning'}`}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Coinstable;
