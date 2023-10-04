import React from 'react';
import { Layout } from 'antd';
import Navbar from './components/common/Navbar';
// import './App.css';
import SignUp from './components/common/SignUp';
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
// import "antd/dist/reset.css";

const App = () => {
  return (
    // <Layout className="w-screen min-h-screen bg-richblack-900 flex flex-col fom=nt-inter">
    //   <Navbar/>
    // </Layout>
    <SignUp/>
  );
};

export default App;
