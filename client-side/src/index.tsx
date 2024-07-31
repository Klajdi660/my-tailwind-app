import React from "react";
import { createRoot } from "react-dom/client";
import Application from "./App";
import reportWebVitals from "./reportWebVitals";

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <Application />
  </React.StrictMode>
);

reportWebVitals();
