import React, { useState, useEffect } from 'react'
import { Wrap, SearchHeader } from './style'
import axios from 'axios'
import { SongProps } from '@/utils/formatSong'
import SongList from '@/component/song-list'
import { useSelector } from 'react-redux'
import { RootState } from '@/models/index'
import OnPlayListBtn from '@/base/onPlayListBtn';
import { PageTitle } from '@/base/style'

const MY_LIKE_URL = 'api/like'

const Like = () => {
  const [songs, setSongs] = useState<SongProps[]>([])
  const { likes } = useSelector(({user}: RootState) => user)
  useEffect(() => {
    axios.get(MY_LIKE_URL).then((res: any )=> {
      if (res.code === 200) {
        setSongs(res.data)
      }
    })
  }, [likes])
  return ( 
    <Wrap>
      <SearchHeader>
        <PageTitle>我的喜欢</PageTitle>
        <OnPlayListBtn songs={songs}/>
      </SearchHeader>
      <SongList songs={songs}/>
    </Wrap>
  )
}

export default Like