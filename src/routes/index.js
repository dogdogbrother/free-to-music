import React from 'react';
import { Redirect } from "react-router-dom";
import Square from '@/pages/square'
import Wyy from '@/pages/wyy'
import Upload from '@/pages/upload'
import My from '@/pages/my'
import PlayList from '@/pages/playlist'
import Like from '@/pages/like'

export default [
  {
    path: "/",
    exact: true,
    render: () => (
      <Redirect to={"/square"}/>
    )
  },
  {
    path: "/square",
    name: "广场",
    component: Square
  },
  {
    path: "/wyy-search",
    name: "网易云音乐",
    component: Wyy
  },
  {
    path: "/my-search",
    name: "我的音乐",
    component: My
  },
  {
    path: "/play-list",
    name: "播放列表",
    component: PlayList
  },
  {
    path: "/my-like",
    name: "我的喜欢",
    component: Like
  },
  {
    path: "/upload-song",
    name: "上传歌曲",
    component: Upload
  },
]
