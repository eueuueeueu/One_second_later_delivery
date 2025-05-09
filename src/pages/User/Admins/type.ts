export interface EditAdminRes {
  code: number;
  msg: string;
}
export interface AdminRes extends EditAdminRes {
  data: AdminData;
}

export interface AdminData {
  pageSize: number;
  current: number;
  count: number;
  totalPages: number;
  data: AdminDatum[];
}

export interface AdminDatum {
  key: React.Key;
  adminNo: string;
  adminName: string;
  mobileNumber: string;
  realName: string;
  status: number;
  createTime: Date;
  updateTime: Date;
  defaultPwd: string;
  updatedBy: string;
}
export interface AdminDatumSearch {
  adminNo: string;
  adminName: string;
  mobileNumber: string;
  realName: string;
  status: number;
}
export interface EditAdminParams {
  adminNo: string;
  status: string;
}