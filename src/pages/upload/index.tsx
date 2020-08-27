/**
 * @description 广场页面，别人上传了歌曲，或是发布个动态等等这里都会有显示
 * @author senlin
 */
import React, { useState } from 'react'
import EmptyLogin from '@/base/empty-login'
import { connect, ConnectedProps } from 'react-redux'
import { Wrap } from './style'
import { RootState } from '@/models/index'
import { Form, Input, Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { UploadChangeParam } from 'antd/lib/upload'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { UploadFile } from 'antd/lib/upload/interface'
import axios from 'axios'

const SONG_URL = 'api/song'

const mapStateToProps = ({user}: RootState) => user

const connector = connect(mapStateToProps);

type MadelState = ConnectedProps<typeof connector>;

interface IProps extends MadelState {}

const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 15 }
};

function getBase64(img: any, callback: any) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

const UploadSong = (props: IProps) => {
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm();
  const { userName } = props
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">Upload</div>
    </div>
  )
  const updateSongProps = {
    // accept: "audio/*",   UploadFile
    name: "file",
    action: "api/song/upload-song",
    onChange(info: UploadChangeParam) {
      if (info.file.status === 'done') {
        console.log(info.file.response);
      }
    },
    onRemove(file: UploadFile){
      return false
    }
  }
  const updateCoverProps = {
    accept: "image/*",
    name: "file",
    showUploadList: false,
    action: "api/song/upload-song",
    onChange(info: UploadChangeParam) {
      if (info.file.status === 'uploading') {
        setLoading(true);
      } else if (info.file.status === 'done') {
        getBase64(info.file.originFileObj, (imageUrl: string) => { setImageUrl(imageUrl); setLoading(false) })
      }
    }
  }
  function onSubmit(values: any) {
    if (!values.songPath.file.response) {
      return message.warning('没有找到歌曲文件额...')
    }
    if (values.coverPath) {
      values.coverPath = values.coverPath.file.response
    }
    values.songPath = values.songPath.file.response
    axios.post(SONG_URL, values).then(res => {
      console.log(res);
      
      message.success('上传成功!')
      form.resetFields()
    })
  }
  return (
    <Wrap>
      {
        !userName ? <EmptyLogin /> : 
        <div>
          <Form
            form={form}
            {...formItemLayout}
            onFinish={onSubmit}
            initialValues={{}}
          >
            <Form.Item 
              label="歌曲名" 
              name="songName"
              rules={[{ required: true, message: '必须要有歌曲名称' }]}
            >
              <Input/>
            </Form.Item>
            <Form.Item 
              label="歌手"
              name="singer"
              help="如果有多个歌手请用分号 / 隔离下"
              rules={[{ required: true, message: '谁唱的你得告诉我吧' }]}
            >
              <Input/>
            </Form.Item>
            <Form.Item 
              label="专辑"
              name="album"
            >
              <Input/>
            </Form.Item>
            <Form.Item 
              label="上传歌曲"
              name="songPath"
              help="在歌曲上传成功后才能提交表单"
              valuePropName="file"
              rules={[
                { required: true, message: '在歌曲上传成功后才能提交表单' }
              ]}
            >
              <Upload 
                {...updateSongProps}
                withCredentials
              >
                <Button>
                  <UploadOutlined /> 点击我上次歌曲
                </Button>
              </Upload>
            </Form.Item>
            <Form.Item 
              label="上传封面"
              name="coverPath"
              help="如果歌曲信息包含封面则无效"
              valuePropName="file"
            >
              <Upload 
                {...updateCoverProps}
                listType="picture-card"
                withCredentials
              >
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
              </Upload>
            </Form.Item>

            <Form.Item wrapperCol={{ span: 15, offset: 5 }}>
              <Button type="primary" htmlType="submit">
                提交歌曲
              </Button>
            </Form.Item>
          </Form>
        </div>
      }
    </Wrap>
  )
}

export default connector(UploadSong);