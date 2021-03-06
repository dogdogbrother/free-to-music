import React, { useRef, useEffect } from 'react'
import { PlayerWrap, PlayerBtns, PlayeMode, VolumeBtns, Github } from './style'
import { RootState } from '@/models/index'
import { useSelector, useDispatch } from 'react-redux'
import Progress from '@/base/progress'
import { GithubOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';

const Player = () => {
  const playRef = useRef(null);
  const dispatch = useDispatch()
  let { playing, playMode, volume } = useSelector((state: RootState) => state.play)
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
  const map = {
    0: (<i className="iconfont" title="循环播放">&#xe960;</i>),
    1: (<i className="iconfont" title="单曲播放">&#xe961;</i>),
    2: (<i className="iconfont" title="随机播放">&#xe963;</i>)
  }
  function changePlayMode() {
    playMode = playMode === 2 ? 0 : playMode + 1
    dispatch({
      type: 'play/changePlayMode',
      payload: {
        playMode
      }
    })
  }
  function changeVolume(action: number) {
    dispatch({
      type: 'play/changeVolume',
      payload: {
        action
      }
    })
  }
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
      <PlayeMode onClick={changePlayMode}>
        {map[playMode]}
      </PlayeMode>
      <Progress />
      <VolumeBtns>
        <span className="pointer ellipsis" onClick={() =>changeVolume(0)}>小点声</span>
        <span className="pointer ellipsis" onClick={() => changeVolume(1)}>大点声</span>
        <span style={{width: '42px',textAlign: 'center'}}>{volume * 100}%</span>
      </VolumeBtns>
      <Github>
        <Tooltip placement="topLeft" mouseEnterDelay={0.5} title="卑微的Star">
          <GithubOutlined onClick={() => window.open('https://github.com/dogdogbrother/free-to-music')}/>
        </Tooltip>
      </Github>
      <audio ref={playRef} />
    </PlayerWrap>
  )
}
export default Player