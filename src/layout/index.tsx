/**
 * @description 作为layout入口文件,整合了三个内容,分别是左侧的list菜单.右侧的内容路由子页面,下面的播放界面
 */
import React, { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Aside from './aside'

const Layout = () => {
  return (
    <BrowserRouter>
      <Aside />
    </BrowserRouter>
  )
}

export default Layout