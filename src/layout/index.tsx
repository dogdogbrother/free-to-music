/**
 * @description 作为layout入口文件,整合了三个内容,分别是左侧的list菜单.右侧的内容路由子页面,下面的播放界面
 */
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { LayoutBox } from './style'
import Aside from './aside'
import LayoutMain from './main'

const Layout = () => {
  return (
    <BrowserRouter>
      <LayoutBox>
        <Aside />
        <LayoutMain></LayoutMain>
      </LayoutBox>
    </BrowserRouter>
  )
}

export default Layout