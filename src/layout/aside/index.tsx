/**
 * @description asi
 */
import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { Wrap, InfoWrap, Avatar, UserName } from './style'
import { RootState } from '../../models'
import Login from '../../components/login'

const mapStateToProps = ({user}: RootState) => user

const connector = connect(mapStateToProps);

type MadelState = ConnectedProps<typeof connector>;

interface IProps extends MadelState {}

const Aside = (props: IProps) => {
  const { dispatch, ...reset } = props
  return (
    <Wrap>
      <Login />
    </Wrap>
  )
}

export default connector(Aside)