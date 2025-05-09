export interface EditUserRes {
  code: number;
  msg: string;
}
export interface UserRes extends EditUserRes {
  data: UserData;
}

export interface UserData {
  pageSize: number;
  current: number;
  count: number;
  data: UserDatum[];
}

export interface UserDatum {
  key: React.Key;
  id: number;
  createTime: Date;
  updateTime: Date;
  userNo: string;
  countryCode: string;
  mobileNumber: string;
  avatarUrl: null | string;
  nickName: string;
  gender: number;
  province: null | string;
  city: null | string;
  area: null;
  status: number;
  homeAddressNo: null;
  companyAddressNo: null;
}
export interface UserDatumSearch {
  userNo: string;
  nickName: string;
  mobileNumber: string;
  status: number;
}
export interface EditUserParams {
  userNo: string;
  status: string;
}
