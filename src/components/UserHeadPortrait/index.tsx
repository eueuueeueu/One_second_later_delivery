import { useAppSelector } from '@/store';
import { SettingFilled, UnlockFilled } from '@ant-design/icons';
import { Link } from '@umijs/max';
import { Avatar, Dropdown, MenuProps } from 'antd';
import Cookies from 'js-cookie';
import { FC } from 'react';
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
