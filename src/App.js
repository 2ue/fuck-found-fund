import React from 'react';
import FundData from './pages/fund/data';
import './App.css';
import 'nprogress/nprogress.css';

function App() {
  return (
    <div className="content">
      {/* {tabPages()} */}
      <FundData />
    </div>
  );
}

export default App;
