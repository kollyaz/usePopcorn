import { use, useEffect, useState } from "react";

export default function Converter() {
  // `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

  // const [, setAmount] = useState(1);

  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("EUR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  // const exchangeRates =

  useEffect(() => {
    const abortController = new AbortController();

    if (fromCurrency === toCurrency) {
      setResult(amount);
      return;
    }

    async function fetchData() {
      setLoading(true);

      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`,
        { signal: abortController.signal }
      );

      const data = await res.json();

      if (!data?.rates) return;

      const rate = data.rates?.[toCurrency];
      setResult(rate);
      setLoading(false);
    }

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [amount, fromCurrency, toCurrency]);

  return (
    <div>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        disabled={loading}
      />
      <select
        value={fromCurrency}
        disabled={loading}
        onChange={(e) => setFromCurrency(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={toCurrency}
        disabled={loading}
        onChange={(e) => setToCurrency(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>
        {amount && result
          ? `${amount} ${fromCurrency} = ${result} ${toCurrency}`
          : "Output will be shown here"}
      </p>

      {/* <button onClick={() => setResult(null)}>Reset</button> */}
    </div>
  );
}
