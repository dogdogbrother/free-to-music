/**
 * @description 登陆注册的dialog
 */
import React, { useState, } from 'react'
import { RootState } from '@/models/index'
import { Modal } from 'antd';
import { SwitchWrap } from './style'
import LoginFrom, { ILoginParameter } from './LoginForm'
import RegisterForm, { IRegisterParameter } from './RegisterForm'
import { useSelector, useDispatch } from 'react-redux'

const Login = () => {
  const [ isLogin, setIsLogin ] = useState(true)
  const dispatch = useDispatch()
  const { loginStatus } = useSelector((state: RootState) => (state.login))
  const switchRegister = () => {
    return(
      <SwitchWrap>
        <span onClick={()=> setIsLogin(true)} className={`${isLogin ? 'active' : ''}`}>登陆</span>
        <span onClick={()=> setIsLogin(false)} className={`${!isLogin ? 'active' : ''}`}>注册</span>
      </SwitchWrap>
    )
  }
  const onCancel = () => {
    dispatch({ type: 'login/closeDialog' })
  }
  const loginSubmit = (parameter: ILoginParameter) => {
    dispatch({
      type: 'login/login',
      payload: parameter
    })
  }
  const registerSubmit = (parameter:IRegisterParameter) => {
    dispatch({
      type: 'login/register',
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
        <RegisterForm submit={registerSubmit} />
      }
    </Modal>
  </>
}

export default Login