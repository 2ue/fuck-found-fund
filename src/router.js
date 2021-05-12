import Index from './pages/home/index';
import Fund from './pages/fund/data';
import Quantify from './pages/quantify';
import QuantifyRank from './pages/quantify/rank';
import Mark from './pages/mark';

export default [
  {
    name: '首页',
    path: '/',
    component: Index
  },
  {
    name: '持仓',
    path: '/fund',
    component: Fund
  },
  {
    name: '量化策略',
    path: '/quantify',
    component: Quantify,
    exact: true,
    children: [
      {
        name: '量化策略往期排行',
        path: '/quantify/rank/:date',
        component: QuantifyRank,
      }
    ]
  },
  {
    name: '自选',
    path: '/mark',
    component: Mark
  }
];
