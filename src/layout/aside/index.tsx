/**
 * @description aside
 */
import React from 'react'
import { Wrap, LinkBox } from './style'
import { NavLink } from 'react-router-dom'
import UserInfo from '@/base/user-info/index'
import routers from '@/routes/index'

const Aside = () => {
  return (
    <Wrap id="aside">
      <UserInfo />
      <LinkBox>
        {
          routers.filter(route => route.isAside).map((route: any) => {
            return <NavLink key={route.path} exact to={route.path} activeClassName="active">{route.name}</NavLink>
          })
        }
      </LinkBox>
    </Wrap>
  )
}

export default Aside