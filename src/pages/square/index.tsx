/**
 * @description 广场页面，别人上传了歌曲，或是发布个动态等等这里都会有显示
 * @author senlin
 */
import React, { useState, useEffect, ChangeEvent } from 'react'
import axios from 'axios'
import { Input, Button  } from 'antd';
import { Wrap, List, Dynamic, UserHeader, Avatar, UserInfo, Content, Link, Publish, TextDecorate, CountString, DynamicImage, PublishBtns } from './style'
import { SongProps } from '@/utils/formatSong'
import { UserState } from '@/models/user'
import { useDispatch } from 'react-redux'

const moment = require('moment')

const SQUARE_LIST_URL = 'api/square/list'
const SQUARE_PUBLISH_URL = 'api/square/publish'


interface IDynamic {
  id: number
  createdAt: string
  message: string
  type: "upload" | "dynamic"
  song: SongProps
  user: UserState
}

const Square = () => {
  const dispatch = useDispatch()
  const [ dynamicList, setDynamicList] = useState([])
  const [ boder, setBorder ] = useState(false)
  const [ remain, setRemain] = useState(200)
  const [ textValue, setTextValue] = useState('')

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
      return false
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
    const { code } = await axios.post(SQUARE_PUBLISH_URL, { message: textValue })
    if (code === 200) {
      getList()
      setTextValue('')
    }
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
          <CountString>{remain}</CountString>
        </TextDecorate>
        <PublishBtns>
          <Link><i className="iconfont" style={{fontSize: 20}}>&#xe61a;</i> 插入图片</Link>
          <Button type="primary" size="large" onClick={publish}>发布</Button>
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
            </Dynamic>
          ))
        }
      </List>
    </Wrap>
  )
}

export default Square;