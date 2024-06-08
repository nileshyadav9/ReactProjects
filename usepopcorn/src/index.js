import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import StarRating from "./StarRating";
import TextExpander2 from "./TextExpander";
import CurrencyConverter from "./currencyConverter";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/* <StarRating maxRating={10} />*/}
    {/* <TextExpander2></TextExpander2> */}
    {/* <CurrencyConverter /> */}
  </React.StrictMode>
);
