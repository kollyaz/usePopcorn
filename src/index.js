import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import "./style.css";
import App from "./App";
import Geolocation from "./exercise/Geolocation";
// import Converter from "./exercise/Converter";

import StarRating from "./StarRating";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/* <Geolocation /> */}

    {/* <Converter /> */}
    {/* <StarRating /> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
