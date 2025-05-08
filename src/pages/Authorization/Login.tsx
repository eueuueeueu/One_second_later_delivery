import { getAuthCodeApi, loginService } from '@/services';
import { useAppDispatch } from '@/store';
import { fetchUserInfo } from '@/store/modules/user/actions';
import {
  LockOutlined,
  UserOutlined,
  VerifiedOutlined,
} from '@ant-design/icons';
import { Navigate, useRequest } from '@umijs/max';
import type { FormProps } from 'antd';
import { Button, Form, Input, message } from 'antd';
import Cookies from 'js-cookie';
import { useState, type FC } from 'react';
// 写在函数外部，只在第一次判断
const isLogin = Cookies.get('token');
const Login: FC = () => {
  // 如果已经登录，则直接跳转到首页
  if (isLogin) return <Navigate to="/home" />;
  const dispatch = useAppDispatch();
  const [formInstance] = Form.useForm();
  const [authCode, setAuthCode] = useState({
    no: '',
    svg: '',
  });

  const { refresh: refreshAuthCode } = useRequest(getAuthCodeApi, {
    onSuccess(resData) {
      formInstance?.resetFields(['verifyCode']);
      setAuthCode({
        no: resData.data.no,
        svg: resData.data.svg,
      });
    },
    onError: (err) => message.error(`获取验证码失败!${err}`),
  });
  const {
    data: loginData,
    run: submitLogin,
    loading,
  } = useRequest(loginService, {
    manual: true,
    onSuccess: ({ code, msg }) => {
      if (code !== 200) {
        refreshAuthCode();
        return message.warning(msg);
      }
      dispatch(fetchUserInfo());
    },
  });
  if (loginData?.code === 200) return <Navigate to="/home" />;

  const onFinish: FormProps<API.LoginInputInfo>['onFinish'] = (values) => {
    submitLogin({
      ...values,
      no: authCode.no,
    });
  };

  return (
    <div className="text-center flex flex-col items-center">
      <div className="flex justify-center mt-16 mb-8">
        <svg viewBox="0 0 45 30" fill="none" className="w-[45px] h-[30px] mr-4">
          <path
            d="M24.7203 29.704H41.1008C41.6211 29.7041 42.1322 29.5669 42.5828 29.3061C43.0334 29.0454 43.4075 28.6704 43.6675 28.2188C43.9275 27.7672 44.0643 27.2549 44.0641 26.7335C44.0639 26.2121 43.9266 25.6999 43.6662 25.2485L32.6655 6.15312C32.4055 5.70162 32.0315 5.32667 31.581 5.06598C31.1305 4.8053 30.6195 4.66805 30.0994 4.66805C29.5792 4.66805 29.0682 4.8053 28.6177 5.06598C28.1672 5.32667 27.7932 5.70162 27.5332 6.15312L24.7203 11.039L19.2208 1.48485C18.9606 1.03338 18.5864 0.658493 18.1358 0.397853C17.6852 0.137213 17.1741 0 16.6538 0C16.1336 0 15.6225 0.137213 15.1719 0.397853C14.7213 0.658493 14.3471 1.03338 14.0868 1.48485L0.397874 25.2485C0.137452 25.6999 0.000226653 26.2121 2.8053e-07 26.7335C-0.000226092 27.2549 0.136554 27.7672 0.396584 28.2188C0.656614 28.6704 1.03072 29.0454 1.48129 29.3061C1.93185 29.5669 2.44298 29.7041 2.96326 29.704H13.2456C17.3195 29.704 20.3239 27.9106 22.3912 24.4118L27.4102 15.7008L30.0986 11.039L38.1667 25.0422H27.4102L24.7203 29.704ZM13.0779 25.0374L5.9022 25.0358L16.6586 6.36589L22.0257 15.7008L18.4322 21.9401C17.0593 24.2103 15.4996 25.0374 13.0779 25.0374Z"
            fill="#955ce6"
          ></path>
        </svg>
        <h1 className="text-3xl">一秒快送后台管理系统</h1>
      </div>
      <div className="flex justify-center items-center border shadow-xl w-[800px] h-[500px]">
        <img
          src={'/src/assets/login_img1.png'}
          className="w-[360px] h-[360px] mr-12"
          alt="加载失败"
        />
        <Form
          name="basic"
          wrapperCol={{ span: 24 }}
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          form={formInstance}
        >
          <h2 className="text-[20px] mb-7">账号密码登录</h2>
          <Form.Item<API.LoginInputInfo>
            name="adminName"
            rules={[{ required: true, message: '请输入账号' }]}
            style={{ textAlign: 'left' }}
          >
            <Input placeholder="管理员账号" prefix={<UserOutlined />} />
          </Form.Item>

          <Form.Item<API.LoginInputInfo>
            name="adminPwd"
            rules={[{ required: true, message: '请输入密码' }]}
            style={{ textAlign: 'left' }}
          >
            <Input.Password
              placeholder="管理员密码"
              prefix={<LockOutlined />}
            />
          </Form.Item>

          <Form.Item<API.LoginInputInfo>
            name="verifyCode"
            rules={[{ required: true, message: '请输入验证码' }]}
            style={{ textAlign: 'left' }}
          >
            <div className="flex justify-center items-center">
              <Input placeholder="输入验证码" prefix={<VerifiedOutlined />} />
              <div
                className="h-[31.6px] flex justify-center items-center"
                dangerouslySetInnerHTML={{ __html: authCode?.svg }}
                onClick={refreshAuthCode}
              ></div>
            </div>
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit" loading={loading}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default Login;
