/**
 * @description 渲染歌曲列表
 */
import React from 'react'
import { SongProps } from '@/utils/formatSong'
import { RootState } from '@/models/index'
import { Song, LikeIcon, SongWrap, SongMain, Icons, PlayIcon } from './style'
import { useSelector, useDispatch } from 'react-redux'
import ListHead from '@/component/list-head'
import axios from 'axios'

const LIKE_URL = 'api/like/'

const SongList = (props: any) => {
  const dispatch = useDispatch()
  const {playlist, playIndex, playing, likes} = useSelector((state: RootState) => ({...state.play, ...state.user}))
  const { songs } = props
  const currentPlayId = playlist.length && playlist[playIndex].id
  function handlePlay(song: SongProps) {
    if (currentPlayId === song.id) return dispatch({type: "play/play"})
    dispatch({
      type: 'play/requestMusic',
      song
    })
  }
  function handleLike(song: SongProps, action: string) {
    axios.post(LIKE_URL + action, {song}).then((res: any) => {
      if (res.code === 200) {
        dispatch({
          type: 'user/setState',
          payload: {
            likes: res.data
          }
        })
      }
    })
  }
  return (
    <SongWrap>
      <ListHead empty={!songs.length} />
      {
        songs.map((song: SongProps, index: number) =>{
          return (
            <Song key={index}>
              <SongMain>
                <div>
                  {
                    likes.find((like: number) => like === song.id) 
                    ? <LikeIcon className="iconfont" onClick={() => handleLike(song, 'unlike')}>&#xe8fa;</LikeIcon>
                    : <LikeIcon className="iconfont" onClick={() => handleLike(song, 'like')}>&#xe8f9;</LikeIcon>
                  }
                  
                  <span>{song.songName}</span>
                </div>
                <Icons>
                  {
                    currentPlayId === song.id && playing
                    ?
                    <PlayIcon className="iconfont pointer" onClick={()=> dispatch({type: "play/pause"})}>&#xe957;</PlayIcon>
                    :
                    <PlayIcon className="iconfont pointer" onClick={()=> handlePlay(song)}>&#xe95d;</PlayIcon>
                  }
                </Icons>
              </SongMain>
              <span className="singer ellipsis">{song.singer}</span>
              <span className="album ellipsis">{song.album}</span>
            </Song>
          )
        })
      }
    </SongWrap>
  )
}

export default SongList