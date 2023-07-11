import React, {useState} from 'react';
import {genChatByAiUsingPOST} from "@/services/ant-design-pro/chatController";
import {Button, Card, Col, Divider, Form,  message, Row , Space, Spin} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import ReactMarkdown from "react-markdown";

/**
 * 添加图表页面
 * @constructor
 */
const Generate: React.FC = () => {
  const [chat, setChat] = useState<string>();
  const [submitting, setSubmitting] = useState<boolean>(false);

  /**
   * 提交
   * @param values
   */
  const onFinish = async (values: any) => {
    // 避免重复提交
    if (submitting) {
      return;
    }
    setSubmitting(true);
    setChat('');
    // 对接后端，上传数据
    const params = {
      ...values,
    };
    try {
      const res = await genChatByAiUsingPOST(params, {}, );
      if (!res?.data) {
        message.error('提问失败');
      } else {
        message.success('提问成功');
        setChat(res.data);
      }
    } catch (e: any) {
      message.error('分析失败，' + e.message);
    }
    setSubmitting(false);
  };

  return (
    <div className="add-chart">
      <Row gutter={24}>
        <Col span={12}>
          <Card title="AI提问">
            <Form name="addChart" labelAlign="left" labelCol={{ span: 4 }}
                  wrapperCol={{ span: 16 }} onFinish={onFinish} initialValues={{}}>
              <Form.Item
                name="question"
                label="问题"
                rules={[{ required: true, message: '请输入问题' }]}
              >
                <TextArea rows={4} placeholder="请输入你的问题" />
              </Form.Item>
              <Form.Item wrapperCol={{ span: 16, offset: 4 }}>
                <Space>
                  <Button type="primary" htmlType="submit" loading={submitting} disabled={submitting}>
                    提交
                  </Button>
                  <Button htmlType="reset">重置</Button>
                </Space>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col span={12}>
          <Card title={"AI回答"}>
            {submitting ? (
              <Spin spinning={submitting} />
            ) : (
              chat ? <ReactMarkdown>{chat}</ReactMarkdown> : <div>请先在左侧进行提问</div>
            )}
          </Card>
          <Divider />
        </Col>
      </Row>
    </div>
  );
};

export default Generate;
