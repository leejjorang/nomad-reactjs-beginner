import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [money, setMoney] = useState(0);

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);

  const moneyChange = (event) => {
    setMoney(event.target.value);
  };

  return (
    <div>
      <h1>The Coins! ({loading ? null : coins.length})</h1>
      <input
        onChange={moneyChange}
        type="number"
        placeholder="$"
        value={money}
      ></input>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <ul>
          {coins.map((coin) => (
            <li key={coin.id}>
              {coin.name} ({coin.symbol}) : {coin.quotes.USD.price} USD /{" "}
              {(money / coin.quotes.USD.price).toFixed(5)} {coin.symbol}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
