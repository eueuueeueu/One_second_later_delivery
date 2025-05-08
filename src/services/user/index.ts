import { request } from '@umijs/max';
import { ChangeUserInfoRef, UpdateParams, UpdatePwdRes } from './type';

// 获取验证码
export const getAuthCodeApi = () =>
  request<API.Verifycode>('/api/admin/verifycode');

// 登录
export const loginService = (user: API.LoginInputInfo) =>
  request('/api/admin/login', { method: 'post', data: user });

// 获取用户信息
export const getUserInfo = () => request<API.HomeUserInfo>('/api/admin/info');

// 修改密码
export const updatePwd = (params: UpdateParams) =>
  request<UpdatePwdRes>('/api/admin/updatepwd', {
    method: 'PUT',
    data: params,
  });

// 修改个人信息
export const changeUserInfo = (params: ChangeUserInfoRef) =>
  request('/api/admin/update/self', {
    method: 'PUT',
    data: params,
  });
// 上传头像
export const uploadSts = (params: any) =>
  request('/api/admin/sts', { method: 'GET', params: { ...params } });
