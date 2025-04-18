import React, { useEffect, useState, useContext } from 'react';
import { TrendingCoins } from '../config/info';
import { Data } from '../Context';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

function Car() {
  const { currency, symbol } = useContext(Data);
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const response = await fetch(TrendingCoins(currency));
        const data = await response.json();
        setCoins(data);
      } catch (error) {
        console.error('Error fetching trending coins:', error);
      }
    };

    fetchTrending();
  }, [currency]);

  const items = coins.map((coin) => {
    const profit = coin.price_change_percentage_24h >= 0;

    return (
      <div className="text-center px-3" key={coin.id}>
        <img
          src={coin.image}
          alt={coin.name}
          height="60"
          style={{ marginBottom: 10 }}
        />
        <h6 className="text-white">{coin.symbol.toUpperCase()}</h6>
        <p
          className="mb-1 fw-bold"
          style={{ color: profit ? 'limegreen' : 'red' }}
        >
          {profit && '+'}
          {coin.price_change_percentage_24h?.toFixed(2)}%
        </p>
        <p className="text-white mb-0">
          {symbol} {coin.current_price.toLocaleString()}
        </p>
      </div>
    );
  });

  return (
    <div className="mt-4">
      <AliceCarousel
        mouseTracking
        infinite
        autoPlay
        autoPlayInterval={2000}
        animationDuration={1000}
        disableButtonsControls
        disableDotsControls
        responsive={{
          0: { items: 2 },
          512: { items: 3 },
          1024: { items: 5 },
        }}
        items={items}
      />
    </div>
  );
}

export default Car;
