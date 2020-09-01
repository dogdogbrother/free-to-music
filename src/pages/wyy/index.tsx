/**
 * @description 网易云音乐的搜索界面
 * @author senlin
 */
import React, { useState } from 'react'
import { Wrap, SearchHeader } from './style'
import { Input, message } from 'antd';
import { CustomerServiceOutlined } from '@ant-design/icons';
import SongList from '@/component/song-list'
import axios from 'axios'
import formatSongs, { SongProps } from '@/utils/formatSong'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/models/index';

const WY_MUSIC_LIST_URL = 'wyapi/search?' 

const Wyy = () => {
  const keep = useSelector(({keep}: RootState) => keep)
  const dispatch = useDispatch()
  const [, setSongs] = useState<SongProps[]>([])
  function handlerSearch(value: React.KeyboardEvent<HTMLInputElement>) {
    if (!value.currentTarget.value) {
      return message.warning('你要找什么呢,先输入些什么吧');
    }
    const searchValue = value.currentTarget.value
    axios.get(WY_MUSIC_LIST_URL, {
      params: {
        offset: 0,
        limit: 12,
        keywords: value.currentTarget.value
      }
    }).then(res => {
      const formatData = formatSongs(res.data.result.songs)
      setSongs(formatData)
      dispatch({
        type: 'keep/setState',
        payload: {
          wyySongs: formatData,
          wyySearch: searchValue
        }
      })
    })
  }
  return (
    <Wrap>
      <SearchHeader>
        <h2 className="title">网易云音乐</h2>
        <Input 
          defaultValue={keep.wyySearch}
          size="large" 
          className="search" 
          placeholder="搜索歌曲音乐" 
          prefix={<CustomerServiceOutlined />} 
          onPressEnter={handlerSearch}
        />
      </SearchHeader>
      <SongList songs={keep.wyySongs}/>
    </Wrap>
  )
}

export default Wyy;