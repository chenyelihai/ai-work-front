// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** genChatByAi POST /api/chat/gen */
export async function genChatByAiUsingPOST(body: API.GenChat, options?: { [key: string]: any }) {
  return request<API.BaseResponseString_>('/api/chat/gen', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listAssistantByPage POST /api/chat/list/page */
export async function listAssistantByPageUsingPOST(
  body: API.ChatQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageChat_>('/api/chat/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
