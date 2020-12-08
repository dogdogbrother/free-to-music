import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button } from 'antd';
import { Wrap, UserInfo } from './style'
import axios from 'axios'
import DynamicCard, { IDynamic } from '../square/dynamic-card'

interface Iinfo {
  avatar: string
  characterSignature: string
  gender: string
  nickName: string
  yourself: boolean
  isFollow: boolean
  id: string
  following: number
  follower: number
}

const USER_INFO = "/api/user/info/"
const FOLLOW = "/api/user/follow/"
const SQUARE = "/api/square/list/" 

const UserPage = () => {
  const { userId } = useParams() as any
  const [ loading, setLoading] = useState(false)
  const [ openComment, setOpenComment] = useState<number>(-999)
  const [ dynamicList, setDynamicList] = useState([])
  const [ info, setInfo ] = useState({
    avatar: "",
    id: "",
    characterSignature: "",
    gender: "",
    nickName: "",
    yourself: false,
    isFollow: false,
    following: 0,
    follower: 0
  })
  useEffect(() => {
    // axios请求 显示用户的信息,并告知用户是否关注了他
    axios.get(`${USER_INFO}${userId}`).then(res => {
      setInfo(res.data)
    })
    // axios请求 用户的动态
    axios.get(`${SQUARE}${userId}`).then(res => {
      setDynamicList(res.data)
    })
  }, [])
  function getButtonType(info: Iinfo) {
    // 假如没有信息就返回个空
    if (!info.avatar) return null
    if (info.yourself) {
      return <Button type="primary">编辑资料</Button>
    }
    if (info.isFollow) {
      return <Button type="primary" onClick={follow} loading={loading}>已关注</Button>
    } else {
      return <Button onClick={follow} loading={loading}>关注</Button>
    }
  }
  async function follow() {
    setLoading(true)
    const res = await axios.put(`${FOLLOW}${info.id}`, {actionType: !info.isFollow})
    setLoading(false)
    setInfo({...info, isFollow: res.data})
  }
  return (
    <Wrap>
      <UserInfo>
        <img src={info.avatar} alt="avatar"/>
        <div className="info">
          <p className="name">{info.nickName}</p>
          <p className="signature">{info.characterSignature}</p>
        </div>
        <div  className="btn">
          {getButtonType(info)}
        </div>
        <div className="follow">
          <p>关注了23</p>
          <p>被关注了1092</p>
        </div>
      </UserInfo>
      <div>
        { dynamicList.map((dynamic: IDynamic) => (
          <DynamicCard 
            dynamic={dynamic} 
            key={dynamic.id} 
            openComment={openComment} 
            openCommentAction={setOpenComment}
          />
        )) }
      </div>
    </Wrap>
  )
}

export default UserPage