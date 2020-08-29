/**
 * @description 歌曲列表的头部，就是歌曲名，歌手专辑什么的。附带个没有歌曲时空状态提醒
 */
import React from 'react'
import { Wrap } from './style'

interface IProps {
  empty: boolean
}

const ListHead = (props: IProps) => {
  const { empty } = props
  return (
    <Wrap>
      {
        empty 
        ?
        <div>这是空的</div>
        :
        <div>我是头部</div>
      }
    </Wrap>
  )

}

export default ListHead