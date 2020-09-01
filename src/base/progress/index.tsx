/* eslint-disable react-hooks/exhaustive-deps */
/**
 * @description 关于进度条着实有点复杂，有2种状态，已加载状态，已播放状态。
 *  有三种动作：
 *    1. 点击进度条播放，分为点击已经加载的进度条进行播放，和点击未加载的进度条，需要加载操作后播放。已播放进度条跟着变。
 *    2. 滑动轨块，在滑动轨块同时，已播放进度条跟着走。
 *    3. 松开滑动的轨块，松开的点就是新的播放点
 */
import React, { useRef, useEffect } from 'react'
import { Wrap, Load, Played, Dot } from './style'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/models/index'

const Progress = () => {
  const { currentTime, totalTime, buffered } = useSelector((state: RootState) => (state.play))
  const dispatch = useDispatch()
  const proressRef = useRef<HTMLDivElement | null>(null)
  const loadRef = useRef<HTMLDivElement | null>(null)
  const playedRef = useRef<HTMLDivElement | null>(null)
  const moveStatusRef = React.useRef(false) // 作为是否按下的变量，之所以不用 useState 是因为addEventListener监听不到变化。
  const startXRef = React.useRef(0) // 用于记录滑动条左侧的内容的
  const totalTimeRef = React.useRef(0) // 用于记录分期总时间的
  // const [ testValue, setTestValue ] = useState(0)
  useEffect(() => {
    totalTimeRef.current = totalTime
  }, [totalTime])
  useEffect(() => {
    if (playedRef.current && !moveStatusRef.current) {
      playedRef.current.style.right = (1 - (currentTime / totalTime)) * 100 + '%'
    }
  }, [currentTime, totalTime])
  useEffect(() => {
    document.addEventListener('mouseup', barUp)
    document.addEventListener('mousemove', dotMove)
  }, [])
  useEffect(() => {
    
    if (!totalTime || buffered > totalTime) return 
    if (loadRef.current) {
      loadRef.current.style.width = (Math.round(buffered) / Math.round(totalTime)) * 100 + '%'
    }
  }, [buffered])
  /**
   * @description 点击进度条的目的就是改变滑道轨块的位置
   */
  function getBoundingClientRect(e: React.MouseEvent): void {
    if (moveStatusRef.current) return
    let rect = proressRef.current?.getBoundingClientRect() 
    if (playedRef.current && rect && totalTime) {
      const percentage: number = (rect.right - e.clientX) / rect.width * 100
      playedRef.current.style.right = percentage + '%'
      // percentage 的百分比其实也正是歌曲的播放时间的比例
      const tagetTime = Math.round(totalTime) * (100 - Math.round(percentage)) / 100
      dispatch({
        type: 'play/changePlay',
        payload: {
          currentTime: tagetTime
        }
      })
    }
  }
  function dotDown(e: React.MouseEvent) {
    e.preventDefault()
    moveStatusRef.current = true
    startXRef.current = e.clientX || 0
  }
  function barUp(e: any) {
    moveStatusRef.current = false
  }
  function dotMove(e: any) {
    if (!moveStatusRef.current) return
    e.preventDefault()
    // rect 是进度条信息，rect.right 是进度条最右侧距离屏幕左侧的位置
    let rect = proressRef.current?.getBoundingClientRect()
    // endX 是鼠标距离最左侧的x值
    let endX = e.clientX
    if (rect) {
      if (rect.left > endX || endX > rect.right ) return
    }
    if (playedRef.current && rect && totalTimeRef.current) {
      const percentage: number = (rect.right - e.clientX) / rect.width * 100
      playedRef.current.style.right = percentage + '%'
      // percentage 的百分比其实也正是歌曲的播放时间的比例
      const tagetTime = Math.round(totalTimeRef.current) * (100 - Math.round(percentage)) / 100
      dispatch({
        type: 'play/changePlay',
        payload: {
          currentTime: tagetTime
        }
      })
    }
  }
  return (
    <Wrap 
      className="test"
      ref={proressRef} 
      onClick={getBoundingClientRect}
      >
      <Load ref={loadRef}/>
      <Played ref={playedRef}>
        <Dot onMouseDown={dotDown}/>
      </Played>
    </Wrap>
  )
}

export default Progress