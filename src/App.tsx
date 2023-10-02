import React from 'react';
import { Layout } from 'antd';
import Navbar from './components/common/Navbar';
import './App.css';

const App = () => {
  return (
    <Layout className="w-screen min-h-screen bg-richblack-900 flex flex-col fom=nt-inter">
      <Navbar/>
    </Layout>
  );
};

export default App;
