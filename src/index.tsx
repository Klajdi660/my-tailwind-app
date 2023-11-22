import React from "react";
import { createRoot } from "react-dom/client";
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import { store } from './services/store';
import reportWebVitals from "./reportWebVitals";
import Application from "./App";
import './index.css';

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <Application />
  </React.StrictMode>
);

// const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

// root.render(
//   <BrowserRouter>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </BrowserRouter>
// );

reportWebVitals();
