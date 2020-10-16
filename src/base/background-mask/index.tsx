import React from 'react';
import { useSelector } from 'react-redux'
import { BgImg, Mask, Wrap} from './style'
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
  return <Wrap>
    <BgImg style={styled} id="BgImg"/>
    <Mask id="Mask"/>
  </Wrap>
}

export default BackgroundMask