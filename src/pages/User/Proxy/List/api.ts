import { request } from '@umijs/max';
import { EditProxyParams, EditProxyRes, ProxyParams, ProxyRes } from './type';
// 获取代理列表
export const getProxyList = (params: ProxyParams) =>
  request<ProxyRes>('/api/admin/agent/list', {
    method: 'get',
    params: { ...params },
  });
// 修改代理状态
export const editProxyStatus = (params: EditProxyParams) =>
  request<EditProxyRes>('/api/admin/agent/status', {
    method: 'PUT',
    data: params,
  });
// 重置密码
export const resetPwd = (params: { agentNo: string }) =>
  request('/api/admin/agent/resetpwd', { method: 'PUT', data: params });
