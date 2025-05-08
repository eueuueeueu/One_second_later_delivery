import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { UserHeadPortrait } from './components';
import { persistor, store } from './store';
// 运行时配置
// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{ name: string }> {
  return { name: `${store.getState().user.realName}` };
}

// console.log(userInfo);

export const layout = () => {
  return {
    title: '一秒快送后台管理系统',
    logo: <img src="/src/assets/favicon.png" alt="" />,
    menu: {
      locale: true,
    },
    layout: 'mix',
    logout() {},
    rightRender() {
      return <UserHeadPortrait />;
    },
  };
};

export const rootContainer = (container: JSX.Element) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>{container}</PersistGate>
    </Provider>
  );
};
