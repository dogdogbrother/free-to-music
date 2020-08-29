import React, { useRef, useEffect } from 'react'
import { PlayerWrap, PlayerBtns } from './style'
import { RootState } from '@/models/index'
import { useSelector, useDispatch } from 'react-redux'

const Player = () => {
  const playRef = useRef(null);
  const dispatch = useDispatch()
  const { playing } = useSelector((state: RootState) => state.play)
  useEffect(() => {
    dispatch({
      type: 'play/audio',
      payload: playRef && playRef.current
    })
    dispatch({
      type: 'play/initAudio', 
      payload: dispatch
    })
    // new musciAction({dispatch, playRef})
  }, [dispatch, playRef])
  return (
    <PlayerWrap>
      <PlayerBtns>
        <i className="iconfont" onClick={() => dispatch({ type: "play/preMusic" })}>&#xe965;</i>
        {
          playing 
          ? 
          <i className="iconfont" onClick={() => dispatch({ type: "play/pause" })}>&#xe957;</i>
          :
          <i className="iconfont" onClick={() => dispatch({ type: "play/play" })}>&#xe95d;</i>
        }
        <i className="iconfont" onClick={() => dispatch({ type: "play/nextMusic" })}>&#xe964;</i>
      </PlayerBtns>
      <audio ref={playRef} />
    </PlayerWrap>
  )
}
export default Player