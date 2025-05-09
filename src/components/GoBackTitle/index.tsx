import { LeftOutlined } from '@ant-design/icons';
import { FC } from 'react';
/**
 * 带返回功能的标题组件 - 集成返回箭头和标题展示
 * @param {Object} props - 组件属性
 * @param {string} props.title - 标题显示内容(支持18px加粗字体)
 *
 * @example
 * // 基础用法
 * <GoBackTitle title="用户详情页" />
 *
 * @example
 * // 长标题展示
 * <GoBackTitle title="项目设置-权限管理-角色配置" />
 *
 * @behavior
 * - 点击左侧箭头图标触发浏览器路由返回(history.back())
 * - 标题文字自动折行显示，最大宽度继承父容器
 */
const GoBackTitle: FC<{ title: string }> = (props) => {
  return (
    <div className="flex items-center mb-6">
      <LeftOutlined
        onClick={() => history.back()}
        className="text-lg mr-2 cursor-pointer"
      />
      <h2 className="text-xl font-bold m-0">{props.title}</h2>
    </div>
  );
};
export { GoBackTitle };
