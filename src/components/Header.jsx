import React, { useContext } from 'react';
import { Data } from '../Context.jsx';

function Header() {
    const { currency, setCurrency, symbol } = useContext(Data);
    console.log(currency);
  return (
    <nav className="navbar navbar-dark bg-black px-4">
      <div className="container-fluid">
        <a className="navbar-brand text-warning fw-bold" href="/">
          Crypto Dashboard
        </a>

        {/* Currency Selector */}
        <select
          className="form-select w-auto me-3"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          <option value="USD">USD</option>
          <option value="INR">INR</option>
        </select>

        {/* Search Bar */}
        <form className="d-flex" role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-outline-light" type="submit">
            Search
          </button>
        </form>
      </div>
    </nav>
  );
}

export default Header;
