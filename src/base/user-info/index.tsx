/**
 * @description aside左上角的用户头像和点击登陆功能
 */
import React, { useState } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { Wrap, Avatar, UserName } from './style'
import { RootState } from '../../models'

const mapStateToProps = ({user}: RootState) => user
const connector = connect(mapStateToProps);

type MadelState = ConnectedProps<typeof connector>;

interface IProps extends MadelState {}

const UserInfo = (props: IProps) => {
  const { dispatch, ...reset } = props
  function handlerLogin() {
    dispatch({
      type: 'login/changeStatus',
      payload: {
        loginStatus: true
      }
    })
  }
  return <Wrap>
    <Avatar 
      src={reset.avatar || require('../../assets/avatar/avatar.png')} 
      alt="avatar" 
      className=""
    ></Avatar>
    <UserName className="ellipsis" onClick={handlerLogin}>{reset.userName || "点击登陆"}</UserName>
  </Wrap>
}

export default connector(UserInfo)