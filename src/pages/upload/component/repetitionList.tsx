import React from 'react'
import { SongProps } from '@/utils/formatSong'
import { Link} from '../style'
import { useDispatch } from 'react-redux'

interface IProps {
  songs: SongProps[]
}

const RepetitionList = ({songs}: IProps) => {
  const dispatch = useDispatch()
  function handlerPlay(song: SongProps) {
    dispatch({
      type: 'play/requestMusic',
      song
    })
  }
  return (
    <div>
      <ul>
        {
          songs.map(song => {
            return <li key={song.id}>
              <Link onClick={() => handlerPlay(song)}>
                {song.songName}
              </Link>
              <span>
                歌手为<strong>{song.singer}</strong>,专辑为<strong>{song.album}</strong>
              </span>
            </li>
          })
        }
      </ul>
    </div>
  )
}

export default RepetitionList