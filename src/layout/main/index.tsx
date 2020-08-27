import React from 'react';
import { Switch } from "react-router";
import { Wrap } from './style'
import { renderRoutes } from 'react-router-config';
import routes from '../../routes/index.js';
const LayoutMain = ()=> {
  return (
    <Wrap>
      <Switch>
      { renderRoutes (routes) }
      </Switch>
    </Wrap>
  )
}

export default LayoutMain