import React, { useState } from 'react'
import { Wrap, SearchHeader } from './style'
import { Input, message } from 'antd';
import { CustomerServiceOutlined } from '@ant-design/icons';
import axios from 'axios'
import { SongProps } from '@/utils/formatSong'
import SongList from '@/component/song-list'

const MY_MUSIC_LIST_URL = 'api/song/list/' 

const My = () => {
  const [songs, setSongs] = useState<SongProps[]>([])

  function handlerSearch(value: React.KeyboardEvent<HTMLInputElement>) {
    if (!value.currentTarget.value) {
      return message.error('你要找什么呢,先输入些什么吧');
    }
    axios.get(MY_MUSIC_LIST_URL + value.currentTarget.value).then(res => {
      setSongs(res.data)
    })
  }
  return ( 
    <Wrap>
      <SearchHeader>
        <h2 className="title">我的音乐</h2>
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

export default My