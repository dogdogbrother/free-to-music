/**
 * @description asi
 */
import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { Wrap, LinkBox } from './style'
import { NavLink } from 'react-router-dom'
import { RootState } from '@/models/index'
import UserInfo from '@/base/user-info/index'
import routers from '@/routes/index'

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
        {
          routers.map((route: any) => {
            return <NavLink key={route.path} exact to={route.path} activeClassName="active">{route.name}</NavLink>
          })
        }
      </LinkBox>
    </Wrap>
  )
}

export default connector(Aside)