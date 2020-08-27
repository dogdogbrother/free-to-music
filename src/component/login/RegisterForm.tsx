import React from 'react'
import { Form, Input, Button } from 'antd';

interface IProps {
  submit: (parameter: IRegisterParameter) => void;
}

export interface IRegisterParameter {
  userName: string
  password: string
  nickName: string
  affirmPassword: string
}

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const tailLayout = {
  wrapperCol: { offset: 4, span: 20 },
};


const RegisterForm = (props: IProps) => {
  const { submit } = props
  const onFinish = (values: any) => {
    submit(values);
  }
  return (
    <Form
      {...layout}
      labelAlign="left"
      name="login"
      onFinish={onFinish}
    >
      <Form.Item
        label="用户名"
        name="userName"
        rules={[{ required: true, message: '用户名不能为空' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="昵称"
        name="nickName"
        rules={[{ required: true, message: '昵称不能为空' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="密码"
        name="password"
        rules={[{ required: true, message: '密码不能为空' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="确认密码"
        name="affirmPassword"
        validateTrigger="onBlur"
        rules={[
          { required: true, message: '确认密码不能为空' },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject('两次密码输入不一致');
            },
          })
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          注册
        </Button>
      </Form.Item>
    </Form>
  )
}

export default RegisterForm