/**
 * @description 渲染歌曲列表
 */
import React from 'react'
import { SongProps } from '@/utils/formatSong'
import { RootState } from '@/models/index'
import { Song, LikeIcon, SongWrap, SongMain, Icons, PlayIcon } from './style'
import { useSelector, useDispatch } from 'react-redux'
import ListHead from '@/component/list-head'

const SongList = (props: any) => {
  const dispatch = useDispatch()
  const {playlist, playIndex, playing} = useSelector((state: RootState) => state.play)
  const { songs } = props
  const currentPlayId = playlist.length && playlist[playIndex].id
  function handlePlay(song: SongProps) {
    if (currentPlayId === song.id) return dispatch({type: "play/play"})
    dispatch({
      type: 'play/requestMusic',
      song
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
                  <LikeIcon className="iconfont">&#xe8f9;</LikeIcon>
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