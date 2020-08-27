import React from 'react';
import { Redirect } from "react-router-dom";
import Square from '@/pages/square'
import Wyy from '@/pages/wyy'
import Upload from '@/pages/upload'

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
    component: Square
  },
  {
    path: "/wyy-search",
    component: Wyy
  },
  {
    path: "/upload-song",
    component: Upload
  },
]