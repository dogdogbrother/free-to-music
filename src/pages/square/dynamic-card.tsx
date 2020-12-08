import React, { useState } from 'react'
import axios from 'axios'
import { Input } from 'antd';
import { Dynamic, UserHeader, Avatar, UserInfo, Content, Link, DynamicImage, 
  FootBtn, CommentBox, UserComment, CommentAvatar, CommentList, Comment, CommentContent } from './style'
import { SongProps } from '@/utils/formatSong'
import { UserState } from '@/models/user'
import { useDispatch, useSelector } from 'react-redux'
import { IConment, IHttpRes } from './types';
import { useHistory } from "react-router-dom";

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
  userId: string
}
interface IProps {
  dynamic: IDynamic,
  openComment: number,
  openCommentAction: React.Dispatch<React.SetStateAction<number>>
}

const DynamicCard = (props: IProps) => {
  const { dynamic, openComment, openCommentAction } = props
  const { avatar, id }= useSelector(({user}: RootState) => user)
  const [ commentList, setCommentList] = useState<IConment[]>([])
  const [ commentValue, setCommentValue ] = useState<string>('')
  const [ subCommentValue, setSubCommentValue ] = useState<string>('')  // 二级评论和三级评论都用一个值来控制
  const [ subCommentToggle, setSubCommentToggle ] = useState<number>(-99)  // 二级评论和三级评论的开关都有一个值来控制
  const dispatch = useDispatch()
  const history = useHistory()
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
      return <DynamicImage loading="lazy" src={dynamic.image} alt="动态"/>
    } else {
      if (!dynamic.song.coverPath) return
      return <DynamicImage loading="lazy" src={dynamic.song.coverPath} alt="歌曲封面"/>
    }
  }
  async function getCommentList(id: number) {
    const res: IHttpRes = await axios.get(`api/comment/${id}`)
    if (res.code === 200) {
      // 先得到一次评论
      const rootComment = res.data.filter((comment: IConment) => !comment.rootCommentId).map((comment: IConment) => {
        comment.subComment = []
        return comment
      })
      res.data.forEach((subComment: IConment) => {
        if (subComment.rootCommentId) {
          rootComment.forEach((comment: IConment) => {
            if (subComment.rootCommentId === comment.id) {
              comment.subComment.push(subComment)
            }
          })
        }
      })
      setCommentList(rootComment)
    }
  }
  async function handlerOpen(id: number) {
    setCommentValue('')  // 开关评论页，我都清空输入框
    setSubCommentToggle(-99)
    setSubCommentValue('')
    if (openComment === id) return openCommentAction(-99)
    openCommentAction(id)
    getCommentList(id)
  }
  function handlerComment(id: number) {
    if (!commentValue) return
    axios.post(`${COMMENT_URL}/${id}`, {content: commentValue}).then(res=> {
      getCommentList(id)
      setCommentValue('')
    })
  }
  function openSubComment(id: number) {
    if (subCommentToggle === id) return setSubCommentToggle(-99)
    setSubCommentValue('')
    setSubCommentToggle(id)
  }
  function handlerSubComment(rootCommentId: number) {
    if (!subCommentValue) return
    axios.post(`${COMMENT_URL}/${dynamic.id}`, {content: subCommentValue, rootCommentId }).then(res=> {
      setSubCommentValue('')
      getCommentList(dynamic.id)
    })
  }
  // 点击头像和用户名，去往用户页面
  function toUserPage(userId: string) {
    console.log(userId);
    history.push(`/user-page/${userId}`)
  }
  return <Dynamic>
    <UserHeader>
      <Avatar src={dynamic.user.avatar} alt="avatar" onClick={() => toUserPage(dynamic.userId)} />
      <UserInfo>
        <p className="user-name" onClick={() => toUserPage(dynamic.userId)}>{dynamic.user.nickName}</p>
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
            avatar && <CommentAvatar loading="lazy" src={ avatar } alt="avatar"/>
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
                  <CommentAvatar loading="lazy" src={conment.user.avatar} alt="avatar"/>
                  <CommentContent>
                    <div className="info">{conment.user.nickName} {conment.user.id === id ? '(作者)' : ''} <span>暂无描述</span></div>
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
                    <ul style={{marginTop: '20px'}}>
                    {
                      conment.subComment.map(subComment => {
                        return(
                          <Comment key={subComment.id}>
                            <CommentAvatar loading="lazy" src={subComment.user.avatar} alt="avatar"/>
                            <CommentContent>
                              <div className="info">{subComment.user.nickName} {subComment.user.id === id ? '(作者)' : ''} <span>暂无描述</span></div>
                              <p className="content">{subComment.content}</p>
                              <div className="footnote">
                                <span>{moment(subComment.createdAt).fromNow()}</span>
                                <div>
                                  {/* <span className="m-r-10">赞</span> */}
                                  {/* <span className="pointer">回复</span> */}
                                </div>
                              </div>
                            </CommentContent>
                          </Comment>
                        )
                      })
                    }
                    </ul>
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

export default DynamicCard