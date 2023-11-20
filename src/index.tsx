import React from "react";
import { createRoot } from "react-dom/client";
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './services/store';
import Application from './App';
import reportWebVitals from "./reportWebVitals";
import './index.css';

// const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  // <BrowserRouter>
    <React.StrictMode>
        <Provider store={store}>
            <Application />
        </Provider>
    </React.StrictMode>
  // </BrowserRouter>
);

reportWebVitals();