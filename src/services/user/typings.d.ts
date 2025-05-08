declare namespace API {
  interface ApiResponse<TData> {
    code: number;
    msg: string;
    data: TData;
  }
  interface VerifycodeData {
    svg: string;
    no: string;
  }
  type Verifycode = ApiResponse<VerifycodeData>;
  interface LoginInputInfo {
    adminName: string;
    adminPwd: string;
    verifyCode: string;
    no: string;
  }
  interface HomeUserData {
    adminNo: string;
    mobileNumber: string;
    adminName: string;
    realName: string;
    avatarUrl: string | null;
  }
  type HomeUserInfo = ApiResponse<HomeUserData>;
}
