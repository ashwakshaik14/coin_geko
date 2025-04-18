import React, { createContext, useState, useEffect } from 'react';

export const Data = createContext();

function Context({ children }) {
  const [currency, setCurrency] = useState('USD');    
  const [symbol, setSymbol] = useState('$');    

  useEffect(() => {
    if (currency === 'USD') {
      setSymbol('$');
    } else if (currency === 'INR') {
      setSymbol('₹');
    }
  }, [currency]); // <-- also update dependency here

  return (
    <Data.Provider value={{ currency, setCurrency, symbol }}>
      {children}
    </Data.Provider>
  );
}

export default Context;
