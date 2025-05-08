import { TableProps } from 'antd';
import React from 'react';

export interface ProxyRes {
  code: number;
  msg: string;
  data: ProxyData;
}

export interface ProxyData {
  pageSize: number;
  current: number;
  count: number;
  totalPages: number;
  data: ProxyDatum[];
}
export interface ProxyDatumSearch {
  agentNo: string;
  agentAccount: string;
  mobileNumber: string;
  realName: string;
  status: number;
}

export interface ProxyDatum {
  key: React.Key;
  agentNo: string;
  agentAccount: string;
  mobileNumber: string;
  realName: string;
  status: number;
  createTime: Date;
  updateTime: Date;
  defaultPwd: string;
  updatedBy: string;
}

export interface ProxyParams {
  current: number;
  pageSize: number;
}
export type TablePagination<T extends object> = NonNullable<
  Exclude<TableProps<T>['pagination'], boolean>
>;
export type TablePaginationPosition<T extends object> = NonNullable<
  TablePagination<T>['position']
>[number];
