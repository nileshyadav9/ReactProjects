import { useState, useEffect } from "react";
export default function CurrencyConverter() {
  const [isApiCallLoading, setIsApiCallLoading] = useState(false);
  const [currentValue, setCurrentValue] = useState("0");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [convertedValue, setConvertedValue] = useState(0);

  useEffect(
    function () {
      const controller = new AbortController();
      async function getConvertedValue() {
        try {
          setIsApiCallLoading(true);
          const result = await fetch(
            `https://api.frankfurter.app/latest?amount=${currentValue}&from=${fromCurrency}&to=${toCurrency}`,
            { signal: controller.signal }
          );

          if (!result.ok)
            throw new Error(
              "Something Happened, please refresh page and try again!"
            );

          const responseData = await result.json();
          setConvertedValue(responseData.rates[toCurrency]);
          console.log(responseData.rates[toCurrency]);
        } catch (error) {
          console.log(error.message);
        } finally {
        }
      }
      if (currentValue > 0 && fromCurrency !== toCurrency) {
        getConvertedValue();
        setIsApiCallLoading(false);
      } else setConvertedValue(currentValue);
    },
    [currentValue, fromCurrency, toCurrency]
  );

  return (
    <div>
      <input
        type="text"
        disabled={isApiCallLoading}
        value={currentValue}
        onChange={(e) => setCurrentValue(e.target.value)}
      />
      <select
        value={fromCurrency}
        disabled={isApiCallLoading}
        onChange={(e) => setFromCurrency(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={toCurrency}
        disabled={isApiCallLoading}
        onChange={(e) => setToCurrency(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>OUTPUT {convertedValue}</p>
    </div>
  );
}
