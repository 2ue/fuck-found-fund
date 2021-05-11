import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import 'nprogress/nprogress.css';
import Routers from './router';
function App() {
  return (
    <div className="container">
      <Router>
        {
          Routers.map(r => <Route path={r.path} component={r.component} key={r.path}></Route>)
        }
      </Router>
    </div>
  );
}

export default App;
