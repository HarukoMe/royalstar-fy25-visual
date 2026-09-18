import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { applyKokoroFromSearch } from "./engine/kokoro";

if (typeof window !== "undefined") {
  applyKokoroFromSearch(window.location.search);
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
