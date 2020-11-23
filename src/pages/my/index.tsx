import React, { useState } from 'react'
import { Wrap, SearchHeader } from './style'
import { Input, message } from 'antd';
import { CustomerServiceOutlined } from '@ant-design/icons';
import axios from 'axios'
import { SongProps } from '@/utils/formatSong'
import SongList from '@/component/song-list'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/models/index';
import OnPlayListBtn from '@/base/onPlayListBtn';
import { PageTitle } from '@/base/style'

const MY_MUSIC_LIST_URL = 'api/song/list/' 

const My = () => {
  const keep = useSelector(({keep}: RootState) => keep)
  const dispatch = useDispatch()
  const [, setSongs] = useState<SongProps[]>([])
  function handlerSearch(value: React.KeyboardEvent<HTMLInputElement>) {
    if (!value.currentTarget.value) {
      return message.error('你要找什么呢,先输入些什么吧');
    }
    const searchValue = value.currentTarget.value
    axios.get(MY_MUSIC_LIST_URL + value.currentTarget.value).then(res => {
      setSongs(res.data)
      dispatch({
        type: 'keep/setState',
        payload: {
          mySongs: res.data,
          mySearch: searchValue
        }
      })
    })
  }
  return ( 
    <Wrap>
      <SearchHeader>
        <PageTitle>我的音乐</PageTitle>
        <Input 
          defaultValue={keep.searchValue}
          size="large" 
          className="search" 
          placeholder="搜索歌曲音乐" 
          prefix={<CustomerServiceOutlined />} 
          onPressEnter={handlerSearch}
        />
        <OnPlayListBtn songs={keep.mySongs}/>
      </SearchHeader>
      <SongList songs={keep.mySongs}/>
    </Wrap>
  )
}

export default My