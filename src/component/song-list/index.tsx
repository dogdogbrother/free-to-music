/**
 * @description 登陆注册的dialog
 */
import React from 'react'
import { SongProps } from '@/utils/formatSong'
import { Song, LikeIcon, SongWrap, SongMain, Icons, PlayIcon } from './style'

const SongList = (props: any) => {
  const { songs } = props
  return (
    <SongWrap>
      {
        songs.map((song: SongProps) =>{
          return (
            <Song key={song.id}>
              <SongMain>
                <div>
                  <LikeIcon className="iconfont">&#xe8f9;</LikeIcon>
                  <span>{song.songName}</span>
                </div>
                <Icons>
                  <PlayIcon className="iconfont pointer">&#xe95d;</PlayIcon>
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