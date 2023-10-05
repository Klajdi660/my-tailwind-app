import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from 'antd';
import Navbar from './components/common/Navbar';
// import './App.css';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
// import "antd/dist/reset.css";

const App = () => {
  return (
    // <Layout className="w-screen min-h-screen bg-richblack-900 flex flex-col fom=nt-inter">
    //   <Navbar/>
    // </Layout>
    // <SignUp/>
    <div className="App">
      <Routes>
        <Route path="/sign-up"element={ <SignUp /> }/>
        <Route path="sign-in" element={ <SignIn /> }/>
      </Routes>
    </div>
  );
};

export default App;
