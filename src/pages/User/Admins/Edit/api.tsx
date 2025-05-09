import { request } from '@umijs/max';
// 类型
export interface addAdminParams {
  adminName: string;
  mobileNumber: string;
  realName: string;
  status: number;
}
export interface addAdminRes {
  code: number;
  msg: string;
  data: null;
}
// 添加代理
export const addAdmin = (params: addAdminParams) =>
  request<addAdminRes>('/api/admin/add', {
    method: 'POST',
    data: { ...params },
  });
// 修改代理
export const editAdmin = (params: { agentNo: string } & addAdminParams) =>
  request('/api/admin/update', { method: 'PUT', data: { ...params } });
