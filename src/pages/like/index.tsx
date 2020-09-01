import React, { useState, useEffect } from 'react'
import { Wrap, SearchHeader } from './style'
import axios from 'axios'
import { SongProps } from '@/utils/formatSong'
import SongList from '@/component/song-list'
import { useSelector } from 'react-redux'
import { RootState } from '@/models/index'

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
        <h2 className="title">我的喜欢</h2>
      </SearchHeader>
      <SongList songs={songs}/>
    </Wrap>
  )
}

export default Like