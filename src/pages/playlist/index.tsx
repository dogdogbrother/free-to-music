import React from 'react'
import { Wrap, SearchHeader } from './style'
import SongList from '@/component/song-list'
import { useSelector } from 'react-redux'
import { RootState } from '@/models/index'
import { PageTitle } from '@/base/style'
const PlayList = () => {
  const { playlist } = useSelector((state: RootState) => state.play)
  return ( 
    <Wrap>
      <SearchHeader>
        <PageTitle>正在播放</PageTitle>
      </SearchHeader>
      <SongList songs={playlist}/>
    </Wrap>
  )
}

export default PlayList