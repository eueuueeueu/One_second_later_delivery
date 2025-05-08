export interface UpdateParams {
  adminPwd: string;
  confirmPwd: string;
  oldpwd: string;
}
export interface UpdatePwdRes {
  code: number;
  msg: string;
}
export interface ChangeUserInfoRef {
  avatarUrl: string;
  mobileNumber: string;
  realName: string;
}
