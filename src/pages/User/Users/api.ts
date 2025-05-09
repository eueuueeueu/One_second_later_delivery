import { request } from '@umijs/max';
import { ProxyParams } from '../Proxy/List/type';
import { EditUserParams, UserRes } from './type';
// 获取用户列表
export const getUserList = (params: ProxyParams) =>
  request<UserRes>('/api/admin/user/list', {
    method: 'get',
    params: { ...params },
  });
// 修改代理状态
export const editUserStatus = (params: EditUserParams) =>
  request<EditUserParams>('/api/admin/user/status', {
    method: 'PUT',
    data: params,
  });