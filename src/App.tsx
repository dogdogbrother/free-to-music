import React from 'react';
import Layout from './layout'
import './config/http';
import './assets/style/patch.css'
import './assets/style/reset.css'
import { IconStyle } from './assets/iconfont/iconfont';

function App() {
  return (
    <>
      <Layout />
      <IconStyle />
    </>
  );
}

export default App;
