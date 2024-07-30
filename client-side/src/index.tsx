import React from "react";
import Application from "./App";
import { createRoot } from "react-dom/client";
import reportWebVitals from "./reportWebVitals";

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <Application />
  </React.StrictMode>
);

reportWebVitals();
