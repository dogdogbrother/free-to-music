import React from 'react';
import { useSelector } from 'react-redux'
import { BgImg } from './style'
import { RootState } from '@/models/index'

  
const BackgroundMask = () => {
  let { playlist, audioEle } = useSelector((state: RootState) => state.play)
  const play = playlist.find(play => {
    const res = audioEle as any
    return res.src === play.songPath
  })
  const styled = {
    backgroundImage: `url(${play ? play.coverPath : ''})`
  }
  return <BgImg style={styled} id="BgImg"/>

}

export default BackgroundMask