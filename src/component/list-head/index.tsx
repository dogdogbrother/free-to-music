/**
 * @description 歌曲列表的头部，就是歌曲名，歌手专辑什么的。附带个没有歌曲时空状态提醒
 */
import React from 'react'
import { Wrap, EmptyWrap, Link, Header } from './style'

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
          <div style={{marginTop: '60px'}}>
            <img src={require('../../assets/images/empty.png')} alt="空滴"/>
            <h4>
              还是空滴
              <Link onClick={() => alert('我累了,功能还没写')}>随便搜搜?</Link>
            </h4>
          </div>
        </EmptyWrap>
        :
        <Header>
          <li>歌曲</li>
          <li className="singer">歌手</li>
          <li className="album">专辑</li>
        </Header>
      }
    </Wrap>
  )

}

export default ListHead