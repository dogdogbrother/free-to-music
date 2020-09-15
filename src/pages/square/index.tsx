/**
 * @description 广场页面，别人上传了歌曲，或是发布个动态等等这里都会有显示
 * @author senlin
 */
import React, { useState, useEffect, ChangeEvent, useRef } from 'react'
import axios from 'axios'
import { Input, Button  } from 'antd';
import { Wrap, List, Dynamic, UserHeader, Avatar, UserInfo, Content, 
  Link, Publish, TextDecorate, CountString, DynamicImage, PublishBtns, FootBtn,
  FileContainer, InsetImageBox, CommentBox, UserComment, CommentAvatar, CommentList, Comment,
  CommentContent } from './style'
import { SongProps } from '@/utils/formatSong'
import { UserState } from '@/models/user'
import { useDispatch, useSelector } from 'react-redux'
import { IConment, IHttpRes } from './types';
import 'moment/locale/zh-cn'
import { RootState } from '@/models/index';

const moment = require('moment')

const SQUARE_LIST_URL = 'api/square/list'
const SQUARE_PUBLISH_URL = 'api/square/publish'

const { Search } = Input;



interface IDynamic {
  id: number
  createdAt: string
  message: string
  type: "upload" | "dynamic"
  song: SongProps
  user: UserState
  image: string
  comment: number | null
}

const Square = () => {
  const dispatch = useDispatch()
  const { avatar }= useSelector(({user}: RootState) => user)
  const [ dynamicList, setDynamicList] = useState([])
  const [ commentList, setCommentList] = useState<IConment[]>([])
  const [ boder, setBorder ] = useState(false)
  const [ insetImages, setInsetImages] = useState<ArrayBuffer[]>([])
  const [ remain, setRemain] = useState(200)
  const [ textValue, setTextValue] = useState('')
  const [ openComment, setOpenComment] = useState<number>(-999)
  const fileRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    getList()
  }, [])
  function handlerPlay(song: SongProps) {
    dispatch({
      type: 'play/requestMusic',
      song
    })
  }
  function getList() {
    axios.get(SQUARE_LIST_URL).then((res: any) => {
      if (res.code === 200) {
        setDynamicList(res.data)
      }
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
  function handleTextArea(e: ChangeEvent<HTMLTextAreaElement>) {
    setTextValue(e.target.value)
    setRemain(200 - e.target.value.length)
  }
  async function publish() {
    if (!textValue.length) return
    const { code }: IHttpRes = await axios.post(SQUARE_PUBLISH_URL, {
      message: textValue,
      image: insetImages.length ? insetImages[0] : null
    })
    if (code === 200) {
      getList()
      setTextValue('')
    }
  }
  function selectImage(e: any) {
    var reader = new FileReader();
    reader.onload = function(ev) {
      if (ev?.target?.result) {
        setInsetImages([...insetImages, ev?.target?.result] as ArrayBuffer[])
      }
    }
    if (fileRef.current?.files) {
      reader.readAsDataURL(fileRef.current?.files[0] as Blob);
    }
  }
  async function handlerOpen(id: number) {
    if (openComment === id) return setOpenComment(-99)
    setOpenComment(id)
    const res: IHttpRes = await axios.get(`api/comment/${id}`)
    if (res.code === 200) setCommentList(res.data)
  }
  function handlerComment(value: string, id: number) {
    if (!value) return
    axios.post(`api/comment/${id}`, {content: value}).then(res=> {
      axios.get(`api/comment/${id}`).then(res=> {
        setCommentList(res.data)
      })
    })
  }

  return (
    <Wrap>
      <Publish>
        <TextDecorate className={`${boder&&'border'}`}>
          <Input.TextArea 
            value={textValue}
            rows={4} 
            bordered={false} 
            style={{resize: "none"}} 
            placeholder="有什么想法，可以告诉我 - -!"
            onFocus={() => {setBorder(true)}}
            onBlur={() => setBorder(false)}
            onChange={handleTextArea}
          />
          <InsetImageBox>
          {
            insetImages.map((image, index) => {
              return <div key={index}>
                <div className="inset-image" style={{backgroundImage: `url(${image})`}}>
                  <div className="delete" onClick={() => setInsetImages([])}><i className="iconfont">&#xe96a;</i></div>
                </div>
              </div>
            })
          }
          </InsetImageBox>
          
          <CountString>{remain}</CountString>
        </TextDecorate>
        <PublishBtns>
          <FileContainer>
            <Link className="file-btn"><i className="iconfont" style={{fontSize: 20}}>&#xe61a;</i> 插入图片</Link>
            <input type="file" ref={fileRef} name="fn" onChange={selectImage}></input>
          </FileContainer>
          <Button type="primary" size="large" disabled={remain >= 200} onClick={publish}>发布</Button>
        </PublishBtns>
      </Publish>
      <List>
        {
          dynamicList.map((dynamic: IDynamic) => (
            <Dynamic key={dynamic.id}>
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
                    <i className='iconfont'>&#xe8e6; </i>
                    {dynamic.comment || '评论'}
                  </span>
                </div>
              </FootBtn>
              {
                openComment === dynamic.id && <CommentBox>
                  <UserComment>
                    {/* test */}
                    <CommentAvatar src={ avatar } alt="avatar"/>
                    <Search
                      placeholder="你想说些什么"
                      enterButton="评论"
                      size="middle"
                      onSearch={value => handlerComment(value, dynamic.id)}
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
                                <span>回复</span>
                              </div>
                            </div>
                          </CommentContent>
                        </Comment>
                      )
                    })
                  }
                  </CommentList>
                </CommentBox>
              }
            </Dynamic>
          ))
        }
      </List>
    </Wrap>
  )
}

export default Square;