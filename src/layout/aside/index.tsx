/**
 * @description asi
 */
import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { Wrap, LinkBox } from './style'
import { NavLink } from 'react-router-dom'

import { RootState } from '@/models/index'

import UserInfo from '@/base/user-info/index'

const mapStateToProps = ({user}: RootState) => user

const connector = connect(mapStateToProps);

type MadelState = ConnectedProps<typeof connector>;

interface IProps extends MadelState {}

const Aside = (props: IProps) => {
  // const { dispatch, ...reset } = props
  return (
    <Wrap>
      <UserInfo />
      <LinkBox>
        <NavLink exact to="/square" activeClassName="active">
          广场
        </NavLink>
        <NavLink exact to="/wyy-search" activeClassName="active">网易云音乐</NavLink>
        <NavLink exact to="/my-search" activeClassName="active">我的音乐</NavLink>
        <NavLink exact to="/upload-song" activeClassName="active">上传歌曲</NavLink>
      </LinkBox>
    </Wrap>
  )
}

export default connector(Aside)