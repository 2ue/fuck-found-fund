import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import './App.css';
import 'nprogress/nprogress.css';
import Routers from './router';

const allRouters = [];

function getRoutes(routes) {
  routes.forEach(r => {
    allRouters.push(r);
    if (r.children) {
      getRoutes(r.children);
    };
  });
}

getRoutes(Routers);

function App() {
  return (
    <div className="container">
      <Router>
        {
          allRouters.map(r => <Route path={r.path} component={r.component} key={r.path} exact={r.exact}></Route>)
        }
      </Router>
    </div>
  );
}

export default App;
