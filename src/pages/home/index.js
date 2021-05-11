import React from 'react';
import { Link } from 'react-router-dom';
import Routers from '../../router';


function getStyles() {
  return {
    width: `${(100 / Routers.length)}%`
  }
}

export default class Index extends React.Component {
  render() {
    return (
      <div className="home-container">
        <ul className="menu">
          {
            Routers.map(r => <li style={getStyles()} key={r.path.replace('/', '')}><Link to={r.path}>{r.name}</Link></li>)
          }
        </ul>
      </div>
    )
  }
};
