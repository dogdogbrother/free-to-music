/**
 * @description aside左上角的用户头像和点击登陆功能
 */
import React from 'react'
import { Empty, Button } from 'antd';
import { connect, ConnectedProps } from 'react-redux'
import { Wrap } from './style'
import { RootState } from '@/models/index'

const mapStateToProps = ({user}: RootState) => user

const connector = connect(mapStateToProps);

type MadelState = ConnectedProps<typeof connector>;

interface IProps extends MadelState {}

const UserInfo = (props: IProps) => {
  const { dispatch } = props
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

export default connector(UserInfo)