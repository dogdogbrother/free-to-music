/**
 * @description aside左上角的用户头像和点击登陆功能
 */
import React, { useEffect } from 'react'
import { Popover } from 'antd';
import { connect, ConnectedProps } from 'react-redux'
import { Wrap, Avatar, UserName } from './style'
import { RootState } from '../../models'
import Login from '@/component/login/index'

const mapStateToProps = ({user}: RootState) => user

const connector = connect(mapStateToProps);

type MadelState = ConnectedProps<typeof connector>;

interface IProps extends MadelState {}

const UserInfo = (props: IProps) => {
  const { dispatch, ...reset } = props
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
    <div>
      <p className="pointer" onClick={logout}>退出登陆</p>
    </div>
  )
  return <>
    <Wrap>
      {
        reset.avatar 
          ?
        <>
          <Popover content={popoverContent} placement="bottom" trigger="click" title={false}>
            <Avatar src={reset.avatar} alt="avatar" className="pointer" />
          </Popover>
          <UserName 
            className="ellipsis" 
            style={{color:'#333'}}
          >{reset.userName}</UserName>
        </>
          :
        <>
          <Avatar 
            src={reset.avatar || require('../../assets/avatar/avatar.png')} 
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

export default connector(UserInfo)