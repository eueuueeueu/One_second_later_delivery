import { TableProps } from 'antd';
export interface EditOrdersListRes {
  code: number;
  msg: string;
}
export interface OrdersListRes extends EditOrdersListRes {
  data: OrdersListData;
}

export interface OrdersListData {
  pageSize: number;
  current: number;
  count: number;
  totalPages: number;
  data: OrdersListDatum[];
}
export interface OrdersListDatumSearch {
  agentNo: string;
  agentAccount: string;
  mobileNumber: string;
  realName: string;
  status: number;
}

export interface OrdersListDatum {
  id: number;
  createTime: Date;
  updateTime: Date;
  orderNo: string;
  payAmount: number;
  payType: null;
  serviceType: string;
  timePrice: number;
  distancePrice: number;
  weightPrice: number;
  startPrice: number;
  distance: number;
  weight: number;
  userCouponId: null;
  couponDiscount: number;
  discountPrice: number;
  status: number;
  startAddress: Address | null;
  endAddress: Address;
  goodsDesc: string;
  userNo: string;
  refundAmount: number;
  refundStatus: number;
  cancelReason: null | string;
  cancelBy: null | string;
  cancelByNo: null | string;
  refundNo: null;
  payTime: null;
  sendTime: null;
  getTime: null;
  successTime: null;
  closeTime: Date | null;
  cancelTime: Date | null;
  refundTime: null;
  riderNo: null;
  city: string;
  completeBy: null;
  completeByNo: null;
  fee: number;
  intergal: number;
  intergalDiscount: number;
  nickName: string;
  mobileNumber: string;
  avatarUrl: string;
}
export interface Address {
  city: string;
  district: string;
  latitude: number | string;
  province: string;
  longitude: number | string;
  contactName: string;
  mobileNumber: string;
  addressDetail: string;
  id?: number;
  userNo?: string;
  isDelete?: number;
  addressNo?: string;
  createTime?: Date;
  updateTime?: Date;
  streetNumber?: string;
}
export interface OrdersListParams {
  current: number;
  pageSize: number;
}
export interface EditOrdersListParams {
  agentNo: string;
  status: string;
}
export type TablePagination<T extends object> = NonNullable<
  Exclude<TableProps<T>['pagination'], boolean>
>;
export type TablePaginationPosition<T extends object> = NonNullable<
  TablePagination<T>['position']
>[number];
