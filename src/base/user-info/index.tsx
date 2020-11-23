/**
 * @description aside左上角的用户头像和点击登陆功能
 */
import React, { useState, useEffect } from 'react'
import { Popover } from 'antd';
import { Wrap, Avatar, UserName, PopoverList } from './style'
import { RootState } from '../../models'
import Login from '@/component/login/index'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

const UserInfo = () => {
  const [popoverVisible, setPopoverVisible] = useState(false)
  const { avatar, nickName } = useSelector((state: RootState) => (state.user))
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch({
      type: 'user/getInfo'
    })
  }, [dispatch])
  function handlerLogin() {
    dispatch({ type: 'login/openDialog' })
  }
  function logout() {
    dispatch({ type: 'user/logout' })
  }
  const popoverContent = (
    <PopoverList onClick={() => setPopoverVisible(false)}>
      <li>我的首页</li>
      <li>
        <NavLink exact to="/edit-info">编辑资料</NavLink>
      </li>
      <li onClick={logout}>退出登陆</li>
    </PopoverList>
  )
  return <>
    <Wrap>
      {
        avatar ? <>
          <Popover 
            content={popoverContent} 
            placement="bottom" 
            trigger="click" 
            title={false}
            visible={popoverVisible}
            onVisibleChange={(visible) => setPopoverVisible(visible)}>
            <Avatar src={avatar} alt="avatar" className="pointer" />
          </Popover>
          <UserName 
            className="ellipsis" 
            style={{color:'#333'}}
          >{nickName}</UserName>
        </>
          :
        <>
          <Avatar 
            src={avatar || require('../../assets/avatar/avatar.png')} 
            alt="avatar" 
          />
          <UserName 
            className="pointer" 
            onClick={handlerLogin}
            style={{color: '#666'}}
          >点击登陆</UserName>
        </>
      }
    </Wrap>
    <Login />
  </>
}

export default UserInfo