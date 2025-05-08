import { request } from '@umijs/max';
import { ProxyParams, ProxyRes } from './type';

export const getProxyList = (params: ProxyParams) =>
  request<ProxyRes>('/api/admin/agent/list', {
    method: 'get',
    params: { ...params },
  });
