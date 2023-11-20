import { Routes, Route } from 'react-router-dom';
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
// import "antd/dist/reset.css";
import Main from './components/layout/Main';
import Home from './pages/Home';

const App = () => {
  return (
    <div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
      <Routes>
        <Route path="/" element={ <Main /> }>
          <Route path="/dashboard" element={<Home />}/>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
