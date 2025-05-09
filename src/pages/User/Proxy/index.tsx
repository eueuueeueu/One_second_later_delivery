import { Outlet } from '@umijs/max';
export default () => {
  return (
    <div>
      <Outlet /> {/* 子路由出口 */}
    </div>
  );
};
