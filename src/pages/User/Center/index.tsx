import {
  genApiKeysUsingPOST,
  getLoginUserUsingGET,
  updateMyUserUsingPOST,
} from '@/services/ant-design-pro/userController';
import { ProColumns } from '@ant-design/pro-components';
import ProDescriptions from '@ant-design/pro-descriptions';
import '@umijs/max';
import {Button, Card, Divider, Form, Image, Input, message, Spin} from 'antd';
import { FormInstance } from 'antd/lib';
import React, { useEffect, useState } from 'react';

const onFinish = async (values: any) => {
  const res = await updateMyUserUsingPOST(values);
  if (res && res?.code === 0) {
    message.success('修改成功');
  }
};

const columns: ProColumns<API.User>[] = [
  {
    title: 'AccessKey',
    dataIndex: 'accessKey',
    copyable: true,
  },
  {
    title: 'SecretKey',
    dataIndex: 'secretKey',
    copyable: true,
  },
];

const UserCenter: React.FC = () => {
  const [dataSource, setDataSource] = useState<API.LoginUserVO>();
  const formRef = React.useRef<FormInstance>(null);

  const initData = async () => {
    const data = await getLoginUserUsingGET();
    if (data) {
      console.log(data)
      setDataSource(data?.data);
      formRef.current?.setFieldsValue({ ...data?.data, id: data?.data?.id });
    }
  };

  const genApikeys = async () => {
    const res = await genApiKeysUsingPOST(dataSource);
    if (res && res.code === 0) {
      message.success('生成成功');
      initData();
    }
  };

  useEffect(() => {
    initData();
  }, []);

  return (
    <>
      <Card title="个人中心">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ flex: 1 }}>
            <Form
              name="basic"
              ref={formRef}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
              initialValues={{}}
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item label="Id" name="id" rules={[{ required: true }]} hidden={true}>
                <Input />
              </Form.Item>

              <Form.Item
                label="用户名"
                name="userAccount"
                rules={[{ required: true, message: '请输入用户名!' }]}
              >
                <Input disabled={true} />
              </Form.Item>

              <Form.Item
                label="用户密码"
                name="userPassword"
                rules={[{ required: true, message: '请输入用户密码!' }]}
              >
                <Input.Password autoComplete={'new-password'} />
              </Form.Item>

              <Form.Item
                label="真实姓名"
                name="userName"
                rules={[{ required: true, message: '请输入真实姓名!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item label="用户简介" name="userProfile">
                <Input.TextArea />
              </Form.Item>

              <Form.Item label="用户头像" name="userAvatar">
                <Input />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  修改
                </Button>
              </Form.Item>
            </Form>
          </div>

          <div style={{ flex: 1 }}>
            <Image
              src="https://xiaolincoding.com/logo.png"
              alt="图片描述"
              placeholder={<div style={{  width: '100%', height: '100%', backgroundColor: 'gray' }} />}
            />
          </div>
        </div>
      </Card>
      <Divider />
      <Card title="API鉴权" extra={<a onClick={genApikeys}>重新生成</a>}>
        <ProDescriptions column={1} dataSource={dataSource} columns={columns}></ProDescriptions>
      </Card>
    </>
  );
};
export default UserCenter;
