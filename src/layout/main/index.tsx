import React from 'react';
import { Switch, Route } from "react-router";
import Loadable from 'react-loadable';
import { Wrap } from './style'

const LayoutMain = ()=> {
  const Loading = () => {
    return <></>
  }
  return (
    <Wrap className="calc-height-60">
      <Switch>
        <Route exact path="/" component={Loadable({
          loader: () => import('@/pages/square'),
          loading: Loading
        })} />
        <Route exact path="/wyy-search" component={Loadable({
          loader: () => import('@/pages/wyy'),
          loading: Loading
        })} />
        <Route exact path="/my-search" component={Loadable({
          loader: () => import('@/pages/my'),
          loading: Loading
        })} />
        <Route exact path="/play-list" component={Loadable({
          loader: () => import('@/pages/playlist'),
          loading: Loading
        })} />
        <Route exact path="/my-like" component={Loadable({
          loader: () => import('@/pages/like'),
          loading: Loading
        })} />
        <Route exact path="/upload-song" component={Loadable({
          loader: () => import('@/pages/upload'),
          loading: Loading
        })} />
        <Route exact path="/edit-info" component={Loadable({
          loader: () => import('@/pages/editinfo'),
          loading: Loading
        })} />
        <Route exact path="/user-page/:userId" component={Loadable({
          loader: () => import('@/pages/userpage'),
          loading: Loading
        })} />
      </Switch>
    </Wrap>
  )
}

export default LayoutMain