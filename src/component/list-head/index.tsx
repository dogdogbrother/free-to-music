/**
 * @description 歌曲列表的头部，就是歌曲名，歌手专辑什么的。附带个没有歌曲时空状态提醒
 */
import React from 'react'
import { Wrap, EmptyWrap, Link } from './style'

interface IProps {
  empty: boolean
}

const ListHead = (props: IProps) => {
  const { empty } = props
  return (
    <Wrap className="calc-height-40">
      {
        empty 
        ?
        <EmptyWrap>
          <div>
            <img src={require('../../assets/images/empty.png')} alt="空滴"/>
            <h4>
              还是空滴
              <Link>随便搜搜?</Link>
            </h4>
          </div>
        </EmptyWrap>
        :
        <div>我是头部</div>
      }
    </Wrap>
  )

}

export default ListHead