import React from 'react'
import { Wrap, SearchHeader } from './style'
import SongList from '@/component/song-list'
import { useSelector } from 'react-redux'
import { RootState } from '@/models/index'

const PlayList = () => {
  const { playlist } = useSelector((state: RootState) => state.play)
  return ( 
    <Wrap>
      <SearchHeader>
        <h2 className="title">正在播放</h2>
      </SearchHeader>
      <SongList songs={playlist}/>
    </Wrap>
  )
}

export default PlayList