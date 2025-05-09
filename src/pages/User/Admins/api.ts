import { request } from '@umijs/max';
import { ProxyParams } from '../Proxy/List/type';
import { AdminRes, EditAdminParams } from './type';
// 获取代理列表
export const getAdminList = (params: ProxyParams) =>
  request<AdminRes>('/api/admin/list', {
    method: 'get',
    params: { ...params },
  });
// 修改代理状态
export const editAdminStatus = (params: EditAdminParams) =>
  request<EditAdminParams>('/api/admin/status', {
    method: 'PUT',
    data: params,
  });
// 重置密码
export const resetAdminPwd = (params: { adminNo: string }) =>
  request('/api/admin/resetpwd', { method: 'PUT', data: params });