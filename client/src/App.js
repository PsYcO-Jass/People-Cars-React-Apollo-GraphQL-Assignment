import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Home from './components/Home';
import PersonShow from './components/PersonShow';
import 'antd/dist/reset.css';
import './App.css';

const { Header, Content } = Layout;

function App() {
  return (
    <Layout className="layout">
      <Header style={{ backgroundColor: '#001529', padding: '0 50px' }}>
        <div style={{ 
          color: 'white', 
          fontSize: '24px', 
          fontWeight: 'bold',
          textAlign: 'center',
          lineHeight: '64px'
        }}>
          PEOPLE AND THEIR CARS
        </div>
      </Header>
      <Content style={{ padding: '50px', minHeight: 'calc(100vh - 64px)' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/people/:id" element={<PersonShow />} />
        </Routes>
      </Content>
    </Layout>
  );
}

export default App;
