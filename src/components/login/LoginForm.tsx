import React from 'react'
import { Form, Input, Button } from 'antd';

interface IProps {
  submit: (parameter: ILoginParameter) => void;
}

export interface ILoginParameter {
  userName: string
  password: string
}

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const tailLayout = {
  wrapperCol: { offset: 4, span: 20 },
};


const LoginForm = (props: IProps) => {
  console.log(props);
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
        label="Password"
        name="password"
        rules={[{ required: true, message: '密码不能为空' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          登陆
        </Button>
      </Form.Item>
    </Form>
  )
}

export default LoginForm