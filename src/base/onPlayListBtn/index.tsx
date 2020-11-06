import React from 'react'
import { SongProps } from '@/utils/formatSong'
import { useDispatch } from 'react-redux'

interface IProp {
  songs: SongProps[]
}

const OnPlayListBtn = ({ songs = [] }: IProp) => {
  const dispatch = useDispatch()
  function batchPlay() {
    if (!songs.length) return
    dispatch({
      type: 'play/batchPlay',
      songs
    })
  }

  return (
    <p 
      className="pointer"
      onClick={batchPlay} 
      style={{
        lineHeight: '40px',
        marginLeft: '10px',
        fontSize: '14px'
      }}
    >全部播放</p>
  )
}

export default OnPlayListBtn