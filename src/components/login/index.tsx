/**
 * @description 登陆注册的dialog
 */
import React, { useState } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from '../../models'
import { Modal } from 'antd';
import { SwitchWrap } from './style'
import LoginFrom, { ILoginParameter } from './LoginForm'

const mapStateToProps = ({login}: RootState) => login

const connector = connect(mapStateToProps);

type MadelState = ConnectedProps<typeof connector>;

interface IProps extends MadelState {}

const Login = (props: IProps) => {
  const { loginStatus, dispatch } = props
  const [ isLogin, setIsLogin ] = useState(true)
 
  const switchRegister = () => {
    return(
      <SwitchWrap>
        <span onClick={()=> setIsLogin(true)} className={`${isLogin ? 'active' : ''}`}>登陆</span>
        <span onClick={()=> setIsLogin(false)} className={`${!isLogin ? 'active' : ''}`}>注册</span>
      </SwitchWrap>
    )
  }
  const onCancel = () => {
    dispatch({
      type: 'login/changeStatus',
      payload: {
        loginStatus: false
      }
    })
  }
  const loginSubmit = (parameter: ILoginParameter) => {
    dispatch({
      type: 'login/login',
      payload: parameter
    })
  }
  return <>
    <Modal
      footer={false}
      title={switchRegister()}
      visible={loginStatus}
      onCancel={onCancel}
      maskClosable={false}
    >
      {
        isLogin 
        ?
        <LoginFrom submit={loginSubmit} />
        :
        <div>
          <p>我是注册</p>
        </div>
      }
    </Modal>
  </>
}

export default connector(Login)