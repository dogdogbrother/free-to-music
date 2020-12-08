import React, { useRef, useState, useEffect } from 'react'
import { Wrap } from './style'
import { PageTitle } from '@/base/style'
import { InfoItem, FileContainer } from './style'
import { FormOutlined } from '@ant-design/icons'
import { Input, Radio } from 'antd'
import { RadioChangeEvent } from 'antd/lib/radio'
import { fieldMap, genderMap } from '@/config/map'
import axios from 'axios'
import { IHttpRes } from '../square/types'
import { useDispatch } from 'react-redux'

const USER_INFO = "/api/user/info"

const EditInfo = () => {
  const fileRef = useRef<HTMLInputElement | null>(null)
  const dispatch = useDispatch()
  const [ myAvatar, setMyAvatar ] = useState("")
  const [ formConfig, setFormConfig ] = useState({
    nickName: "",
    gender: "2",
    characterSignature: ""
  })
  const [ activeIndex, setActiveIndex ] = useState(-1)
  useEffect(() => {
    axios.get(USER_INFO).then(res => {
      const { avatar, nickName, gender, characterSignature } = res.data
      setMyAvatar(avatar)
      setFormConfig({
        nickName,
        gender,
        characterSignature
      })
    })
  }, [])
  function selectImage() {
    var reader = new FileReader();
    reader.onload = async function(ev) {
      if (ev?.target?.result) {
        const { data }: IHttpRes = await axios.put(USER_INFO, {
          avatar: ev?.target?.result
        })
        setMyAvatar(data.avatar)
        dispatch({
          type: 'user/setState',
          payload: {
            avatar: data.avatar
          }
        })
      }
    }
    if (fileRef.current?.files) {
      reader.readAsDataURL(fileRef.current?.files[0] as Blob);
    }
  }
  function selectEdit(index: number) {
    setActiveIndex(index)
  }
  function inputBlur(index: number) {
    const key = index === 0 ? "nickName" :"characterSignature"
    axios.put(USER_INFO, {[key]: formConfig[key]}).then(res => {
      setFormConfig({
        ...formConfig,
        [key]: res.data[key]
      })
      dispatch({
        type: 'user/setState',
        payload: {
          [key]: res.data[key]
        }
      })
      setActiveIndex(-1)
    })
  }
  function radioChange(e: RadioChangeEvent) {
    axios.put(USER_INFO, {gender: e.target.value}).then(res => {
      setFormConfig({
        ...formConfig,
        gender: res.data.gender
      })
      setActiveIndex(-1)
    })
  }
  return (
    <Wrap>
      <PageTitle style={{marginBottom: "20px"}}>个人资料</PageTitle>
      <ul>
        <InfoItem>
          <span className="label">头像</span>
          <FileContainer>
            <img src={myAvatar} alt="头像" />
            <input type="file" ref={fileRef} name="fn" onChange={selectImage} accept="image/*"></input>
          </FileContainer>
        </InfoItem>
        {
          Object.keys(formConfig).map((key, index) => {
            return (
              <InfoItem key={index}>
                <span className="label">{fieldMap[key]}</span>
                {
                  activeIndex === index
                  ?
                  function inputOrRadio() {
                    if (fieldMap[key] === '性别') {
                      return <Radio.Group onChange={radioChange} value={formConfig[key]}>
                        {Object.keys(genderMap).map(key => (
                          <Radio key={key} value={key}>{genderMap[key]}</Radio>
                        ))}
                      </Radio.Group>
                    } else {
                      return <Input 
                        value={formConfig[key]}
                        style={{width: "200px"}} 
                        onChange={(e) => {
                          formConfig[key] = e.target.value
                          setFormConfig({
                            ...formConfig
                          })
                        }}
                        onBlur={() => inputBlur(index)}
                      />
                    }
                  }()
                  : 
                  <div>
                    <span style={{marginRight: "20px"}}>
                      {key === "gender" ? genderMap[formConfig[key]] : formConfig[key]}
                    </span>
                    <FormOutlined className="pointer" onClick={() => selectEdit(index)} />
                  </div>
                }
              </InfoItem>
            )
          })
        }
      </ul>
    </Wrap>
  )
}

export default EditInfo