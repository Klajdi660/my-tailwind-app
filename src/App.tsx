// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { Layout } from 'antd';
// import Navbar from './components/common/Navbar';
// // import './App.css';
// import SignUp from './pages/SignUp';
// import SignIn from './pages/SignIn';
// import "./assets/styles/main.css";
// import "./assets/styles/responsive.css";
// // import "antd/dist/reset.css";
// import Main from './components/layout/Main';
// import Home from './pages/Home';
//
// const App = () => {
//   return (
//     // <Layout className="w-screen min-h-screen bg-richblack-900 flex flex-col fom=nt-inter">
//     //   <Navbar/>
//     // </Layout>
//     // <SignUp/>
//     <div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
//       <Routes>
//         <Route path="/signUp" element={ <SignUp /> }/>
//         <Route path="sign-in" element={ <SignIn /> }/>
//         <Route path="/" element={ <Main /> }>
//           <Route path="/dashboard" element={<Home />}/>
//         </Route>
//       </Routes>
//     </div>
//   );
// };
//
// export default App;

import { BrowserRouter as Router } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./store/redux";

const Application = () => {
  return (
      <HelmetProvider>
          <PersistGate loading={"Loading..."} persistor={persistor}>

          </PersistGate>
      </HelmetProvider>
  );
};
export default Application;