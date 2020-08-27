/**
 * @description 网易云音乐的搜索界面
 * @author senlin
 */
import React, { useState, useEffect } from 'react'
import { Wrap, SearchHeader } from './style'
import { Input } from 'antd';
import { CustomerServiceOutlined } from '@ant-design/icons';
import SongList from '@/component/song-list'
import axios from 'axios'
import formatSongs, { SongProps } from '@/utils/formatSong'

const WY_MUSIC_LIST_URL = 'wyapi/search?' 

const Wyy = () => {
  const [songs, setSongs] = useState<SongProps[]>([])
  useEffect(() => {
    axios.get(WY_MUSIC_LIST_URL, {
      params: {
        offset: 1,
        limit: 30,
        keywords: '我的名字'
      }
    }).then(res => {
      setSongs(formatSongs(res.data.result.songs))
      console.log(formatSongs(res.data.result.songs));
    })
  }, [])
  function handlerSearch(value: React.KeyboardEvent<HTMLInputElement>) {
    axios.get(WY_MUSIC_LIST_URL, {
      params: {
        offset: 1,
        limit: 30,
        keywords: value.currentTarget.value
      }
    }).then(res => {
      setSongs(formatSongs(res.data.result.songs))
    })
  }
  return (
    <Wrap>
      <SearchHeader>
        <h2 className="title">网易云音乐</h2>
        <Input 
          size="large" 
          className="search" 
          placeholder="搜索歌曲音乐" 
          prefix={<CustomerServiceOutlined />} 
          onPressEnter={handlerSearch}
        />
      </SearchHeader>
      <SongList songs={songs}/>
    </Wrap>
  )
}

export default Wyy;