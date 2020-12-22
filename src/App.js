import React from 'react';
import FundData from './pages/fund/data';
// import 'antd/dist/antd.css';
import './App.css';
// import { Tabs } from 'antd';

// const { TabPane } = Tabs;

// function callback(key) {
//   console.log(key);
// }

// const tabPages = () => (
//   <Tabs defaultActiveKey="1" onChange={callback}>
//     <TabPane tab="持仓基金" key="1">
//       <FundData />
//     </TabPane>
//     <TabPane tab="Tab 2" key="2">
//       Content of Tab Pane 2
//     </TabPane>
//     <TabPane tab="Tab 3" key="3">
//       Content of Tab Pane 3
//     </TabPane>
//   </Tabs>
// );

function App() {
  return (
    <div className="content">
      {/* {tabPages()} */}
      <FundData />
    </div>
  );
}

export default App;
