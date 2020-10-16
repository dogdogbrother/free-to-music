import React from 'react';
import Layout from './layout'
import './config/http';
import './assets/style/patch.css'
import './assets/style/reset.css'
import { IconStyle } from './assets/iconfont/iconfont';
import BackgroundMask from '@/base/background-mask'
function App() {
  return (
    <>
      <Layout />
      <IconStyle />
      <BackgroundMask />
    </>
  );
}

export default App;
