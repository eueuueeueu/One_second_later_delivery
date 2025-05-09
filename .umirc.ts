import { defineConfig } from '@umijs/max';

export default defineConfig({
  vite: {},
  request: {
    dataField: '',
  },
  antd: {},
  access: {},
  model: {},
  initialState: {},
  layout: {
    title: '我是title',
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '登录',
      path: '/Authorization',
      component: '@/pages/Authorization/index',
      hideInMenu: true,
      layout: false,
    },
    {
      name: '个人信息设置',
      path: '/userSet',
      component: '@/pages/UserSet/index',
      hideInMenu: true,
    },
    {
      name: '修改密码',
      path: '/changePwd',
      component: '@/pages/ChangePassword/index',
      hideInMenu: true,
    },
    {
      path: '/home',
      name: '数据总览',
      icon: 'DashboardFilled',
      component: '@/pages/Home/index',
    },
    {
      path: '/user',
      name: '用户管理',
      icon: 'AliwangwangFilled',
      hideInBreadcrumb: true,
      routes: [
        {
          path: '/user',
          redirect: '/user/proxy',
        },
        {
          name: '代理列表',
          path: '/user/proxy',
          component: '@/pages/User/Proxy/index',
          routes: [
            {
              // 需要保留父路由的默认展示
              path: '/user/proxy',
              component: '@/pages/User/Proxy/List', // 代理列表组件
            },
            {
              path: '/user/proxy/edit/add',
              component: '@/pages/User/Proxy/Edit/Add.tsx',
            },
            {
              path: '/user/proxy/edit/edit',
              component: '@/pages/User/Proxy/Edit/Edit.tsx',
            },
          ],
        },
        {
          path: '/user/admins',
          name: '管理员列表',
          component: '@/pages/User/Admins/index',
        },
        {
          path: '/user/edit/add',
          component: '@/pages/User/Admins/Edit/Add',
        },
        {
          path: '/user/edit/edit',
          component: '@/pages/User/Admins/Edit/Edit',
        },
        {
          path: '/user/users',
          name: '用户列表',
          component: '@/pages/User/Users/index',
        },
      ],
    },
    {
      path: '/order',
      name: '订单管理',
      icon: 'AccountBookFilled',
      component: '@/pages/Home/index',
      // hideInBreadcrumb: true,
      routes: [
        {
          path: '/order/list',
          name: '订单列表',
          component: '@/pages/Home/index',
        },
        {
          path: '/order/capital',
          name: '资金走向',
          component: '@/pages/Home/index',
        },
        {
          path: '/order/closeOrder',
          name: '取消订单配置',
          component: '@/pages/Home/index',
        },
        {
          path: '/order/tip',
          name: '小费选项配置',
          component: '@/pages/Home/index',
        },
      ],
    },
    {
      path: '/rider',
      name: '骑手管理',
      icon: 'TruckFilled',
      component: '@/pages/Home/index',
      // hideInBreadcrumb: true,
      routes: [
        {
          path: '/rider/list',
          name: '骑手列表',
          component: '@/pages/Home/index',
        },
        {
          path: '/rider/checkList',
          name: '骑手审核列表',
          component: '@/pages/Home/index',
        },
      ],
    },
    {
      path: '/city',
      name: '城市管理',
      icon: 'HddFilled',
      component: '@/pages/Home/index',
      // hideInBreadcrumb: true,
      routes: [
        {
          path: '/city/list',
          name: '运营城市列表',
          component: '@/pages/Home/index',
        },
      ],
    },
    {
      path: '/operation',
      name: '运营管理',
      icon: 'PhoneFilled',
      component: '@/pages/Home/index',
      // hideInBreadcrumb: true,
      routes: [
        {
          path: '/operation/pricingRule',
          name: '计价规则',
          component: '@/pages/Home/index',
        },
        {
          path: '/operation/WeightLabel',
          name: '重量标签',
          component: '@/pages/Home/index',
        },
        {
          path: '/operation/goodsLabel',
          name: '物品标签组',
          component: '@/pages/Home/index',
        },
      ],
    },
    {
      path: '/discount',
      name: '优惠券管理',
      icon: 'RedEnvelopeFilled',
      component: '@/pages/Home/index',
      // hideInBreadcrumb: true,
      routes: [
        {
          path: '/discount/list',
          name: '优惠券列表',
          component: '@/pages/Home/index',
        },
        {
          path: '/discount/set',
          name: '优惠券设置',
          component: '@/pages/Home/index',
        },
      ],
    },
    {
      path: '/withdrawal',
      name: '提现管理',
      icon: 'PayCircleFilled',
      component: '@/pages/Home/index',
      // hideInBreadcrumb: true,
      routes: [
        {
          path: '/withdrawal/list',
          name: '提现列表',
          component: '@/pages/Home/index',
        },
        {
          path: '/withdrawal/set',
          name: '提现设置',
          component: '@/pages/Home/index',
        },
      ],
    },
    {
      path: '/system',
      name: '系统设置',
      icon: 'SettingFilled',
      component: '@/pages/Home/index',
      // hideInBreadcrumb: true,
      routes: [
        {
          path: '/system/miniProgram',
          name: '小程序设置',
          component: '@/pages/Home/index',
        },
        {
          path: '/system/share',
          name: '小程序设置',
          component: '@/pages/Home/index',
        },
        {
          path: '/system/subscribe',
          name: '订阅消息设置',
          component: '@/pages/Home/index',
        },
        {
          path: '/system/userGuide',
          name: '用户指南',
          component: '@/pages/Home/index',
        },
        {
          path: '/system/riderGuide',
          name: '骑手指南',
          component: '@/pages/Home/index',
        },
        {
          path: '/system/riderAgreement',
          name: '骑手协议',
          component: '@/pages/Home/index',
        },
      ],
    },
    { path: '/*', component: '@/pages/404', layout: false },
  ],
  proxy: {
    '/api': {
      // 代理前缀
      target: 'http://100.116.121.50:8001', // 目标服务器地址
      changeOrigin: true, // 修改请求头host
      pathRewrite: { '^/api': '' }, // 路径重写（可选）
    },
  },
  npmClient: 'pnpm',
  tailwindcss: {},
});
