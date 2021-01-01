import React from 'react';
import { Input , Menu} from 'antd';
import './AppLayout.scss';

function AppLayout({children, sidebar}) {
  return (
    <div className="app">
      <div className="header">
        <h1 className="page-title">Instagram</h1>
        <div className="search">
          <Input.Search/>
        </div>
        <div className="topnav">
          <Menu mode="horizontal">
            <Menu.Item>Menu1</Menu.Item>
            <Menu.Item>Menu2</Menu.Item>
            <Menu.Item>Menu3</Menu.Item>
          </Menu>
        </div>
      </div>
      
      <div className="contents">{children}</div>
      <div className="sidebar">
        {sidebar}
        
      </div>
      
      <div className="footer">&copy; {new Date().getFullYear()} u0choi</div>
    </div>
  )
}

export default AppLayout;
