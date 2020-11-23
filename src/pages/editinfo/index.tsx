import React from 'react'
import { Wrap } from './style'
import { PageTitle } from '@/base/style'
import { InfoItem } from './style'
import { useSelector } from 'react-redux'
import { RootState } from '@/models/index'

const EditInfo = () => {
  let { nickName, avatar } = useSelector((state: RootState) => state.user)
  return (
    <Wrap>
      <PageTitle style={{marginBottom: "20px"}}>个人资料</PageTitle>
      <ul>
        <InfoItem>
          <span className="label">头像</span>
          <div>
            <img src={avatar} />
          </div>
        </InfoItem>
        <InfoItem>
          <span className="label">用户名</span>
          <div>

          </div>
        </InfoItem>
        <InfoItem>3</InfoItem>
        <InfoItem>4</InfoItem>
      </ul>
    </Wrap>
  )
}

export default EditInfo