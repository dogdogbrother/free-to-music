/**
 * @description aside左上角的用户头像和点击登陆功能
 */
import React from 'react'
import { Empty, Button } from 'antd';
import { Wrap } from './style'
import { useDispatch } from 'react-redux'

const UserInfo = () => {
  const dispatch = useDispatch()
  function goLogin() {
    dispatch({ type: 'login/openDialog' })
  }
  return <>
    <Wrap>
      <Empty
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
        imageStyle={{
          height: 60,
        }}
        description={
          <span style={{color: `#666`}}>
            请先登录，不登录不能上传文件
          </span>
        }
      >
        <Button type="primary" onClick={goLogin}>去登陆</Button>
      </Empty>
    </Wrap>
  </>
}

export default UserInfo