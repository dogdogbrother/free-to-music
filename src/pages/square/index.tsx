/**
 * @description 广场页面，别人上传了歌曲，或是发布个动态等等这里都会有显示
 * @author senlin
 */
import React, { useState, useEffect, ChangeEvent, useRef } from 'react'
import axios from 'axios'
import { Input, Button  } from 'antd';
import { Wrap, List, Link, Publish, TextDecorate, CountString,  PublishBtns, FileContainer, InsetImageBox } from './style'
import { IHttpRes } from './types';
import 'moment/locale/zh-cn'
import DynamicCard, { IDynamic } from './dynamic-card'

const SQUARE_LIST_URL = 'api/square/list'
const SQUARE_PUBLISH_URL = 'api/square/publish'

const Square = () => {
  const [ dynamicList, setDynamicList] = useState([])
  const [ boder, setBorder ] = useState(false)
  const [ insetImages, setInsetImages] = useState<ArrayBuffer[]>([])
  const [ remain, setRemain] = useState(200)
  const [ textValue, setTextValue] = useState('')
  const [ openComment, setOpenComment] = useState<number>(-999)
  const fileRef = useRef<HTMLInputElement | null>(null)
  useEffect(() => {getList()}, [])
  async function getList() {
    const data: any =  await axios.get(SQUARE_LIST_URL)
    if (data.code === 200) setDynamicList(data.data)
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
  function selectImage() {
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
            <input type="file" ref={fileRef} name="fn" onChange={selectImage} accept="image/*"></input>
          </FileContainer>
          <Button type="primary" size="large" disabled={remain >= 200} onClick={publish}>发布</Button>
        </PublishBtns>
      </Publish>
      <List>
        {
          dynamicList.map((dynamic: IDynamic) => (
            <DynamicCard 
              dynamic={dynamic} 
              key={dynamic.id} 
              openComment={openComment} 
              openCommentAction={setOpenComment}
            />
          ))
        }
      </List>
    </Wrap>
  )
}

export default Square;