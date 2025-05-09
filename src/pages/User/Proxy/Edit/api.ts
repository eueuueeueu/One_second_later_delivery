import { request } from '@umijs/max';
// 类型
export interface addProxyParams {
  agentAccount: string;
  mobileNumber: string;
  realName: string;
  status: number;
}
export interface addProxyRes {
  code: number;
  msg: string;
  data: null;
}
// 添加代理
export const addProxy = (params: addProxyParams) =>
  request<addProxyRes>('/api/admin/agent/add', {
    method: 'POST',
    data: { ...params },
  });
// 修改代理
export const editProxy = (params: { agentNo: string } & addProxyParams) =>
  request('/api/admin/agent/update', { method: 'PUT', data: { ...params } });
