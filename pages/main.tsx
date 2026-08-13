import React from "react";
import { createRoot } from "react-dom/client";
import { Portfolio } from "../app/portfolio";
import "../app/globals.css";
import "./pages.css";

if (typeof document !== "undefined") {
  createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <Portfolio />
    </React.StrictMode>,
  );
}
