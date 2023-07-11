import ProList from '@ant-design/pro-list';
import { Space, Tag} from 'antd';
import React, { useState} from 'react';
import {listAssistantByPageUsingPOST} from "@/services/ant-design-pro/chatController";
import ReactMarkdown from "react-markdown";

const HistoryChat: React.FC = () => {
  const [data, setData] = useState<API.BaseResponsePageChat_>();
  const [total, setTotal] = useState<number>(0);

  const initParams: API.ChatQueryRequest = {
    current: 1,
    pageSize: 5,
    sortField: 'createTime',
    sortOrder: 'desc',
  };

  const initData = async (params: API.ChatQueryRequest = initParams) => {
    const res = await listAssistantByPageUsingPOST(params);
    if (res.code === 0) {
      setData(res?.data?.records);
      setTotal(res?.data?.total);
    }
  };

  return (
    <ProList<API.Chat>
      search={{}}
      pagination={{
        defaultPageSize: 5,
        showSizeChanger: true,
        total: total,
        defaultCurrent: 1,
      }}
      request={async (params) => {
        return await initData({
          ...params,
        });
      }}
      grid={{gutter: 16, column: 1}}
      itemLayout={'vertical'}
      rowKey="id"
      headerTitle="我的问答"
      dataSource={data}
      metas={{
        title: {
          dataIndex: 'question',
          title: '问题',
          search: true,
        },
        content:{
          render: (dom, entity) => (
            <>
              <Space size={0}>
                <Tag>
                  <ReactMarkdown>{entity?.answer}</ReactMarkdown>
                </Tag>
              </Space>
            </>
          ),
          title: '回答',
          search: false,
        }
      }}
    />
  );
};
export default HistoryChat;
