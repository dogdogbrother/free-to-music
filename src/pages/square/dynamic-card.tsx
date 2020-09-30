import React, { useState } from 'react'
import axios from 'axios'
import { Input } from 'antd';
import { Dynamic, UserHeader, Avatar, UserInfo, Content, Link, DynamicImage, 
  FootBtn, CommentBox, UserComment, CommentAvatar, CommentList, Comment, CommentContent,
  Comment2 } from './style'
import { SongProps } from '@/utils/formatSong'
import { UserState } from '@/models/user'
import { useDispatch, useSelector } from 'react-redux'
import { IConment, IHttpRes } from './types';

import 'moment/locale/zh-cn'
import { RootState } from '@/models/index'

const moment = require('moment')
const { Search } = Input;
const COMMENT_URL = "api/comment"

export interface IDynamic {
  id: number
  createdAt: string
  message: string
  type: "upload" | "dynamic"
  song: SongProps
  user: UserState
  image: string
  comment: number | null
}
interface IProps {
  dynamic: IDynamic,
  openComment: number,
  openCommentAction: React.Dispatch<React.SetStateAction<number>>
}

const DynamicCard = (props: IProps) => {
  const { dynamic, openComment, openCommentAction } = props
  const { avatar }= useSelector(({user}: RootState) => user)
  const [ commentList, setCommentList] = useState<IConment[]>([])
  const [ commentValue, setCommentValue ] = useState<string>('')
  const [ subCommentValue, setSubCommentValue ] = useState<string>('')  // 二级评论和三级评论都用一个值来控制
  const [ subCommentToggle, setSubCommentToggle ] = useState<number>(-99)  // 二级评论和三级评论的开关都有一个值来控制
  const dispatch = useDispatch()
  function handlerPlay(song: SongProps) {
    dispatch({
      type: 'play/requestMusic',
      song
    })
  }
  function replaceButton(dynamic: IDynamic) {
    if (dynamic.type === 'dynamic') {
      return dynamic.message
    } 
    const tempStringArr = dynamic.message.split(dynamic.song.songName)
    return <>
      <span>{tempStringArr[0]} </span>
      <Link onClick={() => handlerPlay(dynamic.song)}>
        {dynamic.song.songName}
      </Link>
    </>
  }
  function viewImages(dynamic: IDynamic) {
    if (dynamic.type === 'dynamic') {
      if (!dynamic.image) return false
      return <DynamicImage src={dynamic.image} alt="动态"/>
    } else {
      if (!dynamic.song.coverPath) return
      return <DynamicImage src={dynamic.song.coverPath} alt="歌曲封面"/>
    }
  }
  async function handlerOpen(id: number) {
    setCommentValue('')  // 开关评论页，我都清空输入框
    setSubCommentToggle(-99)
    setSubCommentValue('')
    if (openComment === id) return openCommentAction(-99)
    openCommentAction(id)
    const res: IHttpRes = await axios.get(`api/comment/${id}`)
    if (res.code === 200) setCommentList(res.data)
  }
  function handlerComment(id: number) {
    if (!commentValue) return
    axios.post(`${COMMENT_URL}/${id}`, {content: commentValue}).then(res=> {
      axios.get(`${COMMENT_URL}/${id}`).then(res=> {
        setCommentList(res.data)
        setCommentValue('')
      })
    })
  }
  function openSubComment(id: number) {
    if (subCommentToggle === id) return setSubCommentToggle(-99)
    setSubCommentValue('')
    setSubCommentToggle(id)
  }
  function handlerSubComment(id: number) {
    // 给1级评论回复
    console.log(id,subCommentValue);
    alert('还没开发')
  }
  return <Dynamic>
    <UserHeader>
      <Avatar src={dynamic.user.avatar} alt="avatar"/>
      <UserInfo>
        <p className="user-name">{dynamic.user.nickName}</p>
        <p className="describe">{moment(dynamic.createdAt).format('YYYY-MM-DD HH:MM')}</p>
      </UserInfo>
    </UserHeader>
    <Content>
      <div style={{marginBottom: '10px'}}>
        {replaceButton(dynamic)}
      </div>
      <div>
        {viewImages(dynamic)}
      </div>
    </Content>
    <FootBtn>
      <div>
        <i className='iconfont'>&#xe8e6; </i>
        赞
      </div>
      <div>
        <span onClick={() => { handlerOpen(dynamic.id) }} className="pointer">
          <i className='iconfont'>&#xe970; </i>
          {dynamic.comment || '评论'}
        </span>
      </div>
    </FootBtn>
    {
      openComment === dynamic.id && <CommentBox>
        <UserComment>
          {
            avatar && <CommentAvatar src={ avatar } alt="avatar"/>
          }
          <Search
            placeholder="你想说些什么"
            enterButton="评论"
            value={commentValue}
            onChange={(e) => setCommentValue(e.target.value)}
            size="middle"
            onSearch={() => handlerComment(dynamic.id)}
          />
        </UserComment>
        <CommentList>
          {
            commentList.map(conment => {
              return (
                <Comment key={conment.id}>
                  <CommentAvatar src={conment.user.avatar} alt="avatar"/>
                  <CommentContent>
                    <div className="info">{conment.user.nickName} <span>暂无描述</span></div>
                    <p className="content">{conment.content}</p>
                    <div className="footnote">
                      <span>{moment(conment.createdAt).fromNow()}</span>
                      <div>
                        <span className="m-r-10">赞</span>
                        <span className="pointer" onClick={() => openSubComment(conment.id)}>回复</span>
                      </div>
                    </div>
                    {
                      subCommentToggle === conment.id &&
                      <Search
                        style={{marginTop: '10px'}}
                        placeholder="你想说些什么"
                        enterButton="回复"
                        value={subCommentValue}
                        onChange={(e) => setSubCommentValue(e.target.value)}
                        size="middle"
                        onSearch={() => handlerSubComment(conment.id)}
                      />
                    }
                    <Comment2>
                      <li></li>
                    </Comment2>
                  </CommentContent>
                </Comment>
              )
            })
          }
        </CommentList>
      </CommentBox>
    }
  </Dynamic>
}

export default DynamicCard;