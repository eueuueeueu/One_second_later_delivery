import { useAppSelector } from '@/store';
import { SettingFilled, UnlockFilled } from '@ant-design/icons';
import { Link } from '@umijs/max';
import { Avatar, Dropdown, MenuProps } from 'antd';
import Cookies from 'js-cookie';
import { FC } from 'react';
/**
 * 用户头像下拉菜单组件 - 集成个人信息展示和常用操作入口
 * @requires react-redux/useSelector - 依赖Redux用户状态管理
 * @requires react-router-dom/Link - 依赖路由跳转组件
 * @behavior
 * - 展示圆形用户头像(30px)，未设置头像时显示默认图片
 * - 点击弹出卡片式菜单包含：
 *   • 顶部渐变背景个人信息区块（姓名+手机号+用户编号）
 *   • 个人设置入口（跳转/userSet路由）
 *   • 修改密码入口（跳转/changePwd路由）
 *   • 退出登录功能（清除token cookie）
 *
 * @style
 * - 菜单容器宽度240px，直角边框(5px)
 * - 菜单项采用无内边距样式覆盖Antd默认样式
 * - 顶部信息区块使用蓝紫渐变背景(#677bd1→#e6a0fe)
 *
 * @note
 * - 默认头像路径为'/src/assets/head_portrait.jpg'，需确保打包后路径正确
 * - 退出登录仅清除token，建议在路由守卫处理跳转逻辑
 *
 * @example
 * // 基本使用（需在Redux store配置用户信息）
 * <UserHeadPortrait />
 */
const UserHeadPortrait: FC = () => {
  const userInfo = useAppSelector((state) => state.user);

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div className="text-[20px] w-full px-5 py-4 text-white bg-gradient-to-r from-[#677bd1] to-[#e6a0fe]">
          <span>
            {userInfo.realName} {userInfo.mobileNumber}
          </span>
          <p className="text-[12px]">NO:{userInfo.adminNo}</p>
        </div>
      ),
      // li style —— default is 5px 12px
      style: { padding: 0 },
    },
    {
      key: '2',
      label: (
        <Link to={'/userSet'}>
          <p className="px-5 py-3">
            <SettingFilled />
            <span className="ml-3">个人设置</span>
          </p>
        </Link>
      ),
      style: { padding: 0 },
    },
    {
      key: '3',
      label: (
        <Link to={'/changePwd'}>
          <p className="px-5 py-3">
            <UnlockFilled />
            <span className="ml-3">修改密码</span>
          </p>
        </Link>
      ),
      style: { padding: 0 },
    },
    {
      type: 'divider',
    },
    {
      key: '4',
      label: (
        <Link to={'/Authorization'}>
          <p className="px-5 py-3">
            <span className="ml-3">退出登录</span>
          </p>
        </Link>
      ),
      onClick: () => {
        Cookies.remove('token');
      },
      style: { padding: 0 },
    },
  ];
  console.log(userInfo.avatarUrl);

  return (
    <Dropdown
      menu={{
        items,
        // ul style —— default padding is 4px
        style: { width: '240px', padding: 0, borderRadius: '5px' },
      }}
      // trigger={['click']}
      // root div style
      // overlayStyle={{}}
    >
      <Avatar
        size={30}
        src={userInfo.avatarUrl ?? '/src/assets/head_portrait.jpg'}
      />
    </Dropdown>
  );
};
export { UserHeadPortrait };
