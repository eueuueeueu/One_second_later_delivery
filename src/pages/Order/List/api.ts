import { request } from '@umijs/max';
import {
  EditOrdersListParams,
  EditOrdersListRes,
  OrdersListParams,
  OrdersListRes,
} from './type';
// 获取订单列表
export const getOrdersList = (params: OrdersListParams) =>
  request<OrdersListRes>('/api/admin/order/list', {
    method: 'get',
    params: { ...params },
  });
// 修改代理状态
export const editOrdersStatus = (params: EditOrdersListParams) =>
  request<EditOrdersListRes>('/api/admin/order/status', {
    method: 'PUT',
    data: params,
  });
// 重置密码
export const resetOrdersPwd = (params: { agentNo: string }) =>
  request('/api/admin/order/resetpwd', { method: 'PUT', data: params });
