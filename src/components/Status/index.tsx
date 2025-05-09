import { FC } from 'react';

type StatusType = 'success' | 'error' | 'warning';
interface PropsType {
  type?: StatusType;
  label: string;
}
/**
 * 状态指示器组件 - 根据类型显示彩色状态标签
 * @param {Object} props - 组件属性
 * @param {'success'|'error'|'warning'} [props.type='success'] - 状态类型(默认success)
 * @param {string} props.label - 显示的状态文本
 *
 * @description
 * 样式配置说明：
 * - success: 绿色文字(#52c41a)/浅绿背景(#f6ffed)/淡绿边框(#b7eb8f)
 * - error: 红色文字(#f5222d)/浅红背景(#fff1f0)/粉红边框(#ffa39e)
 * - warning: 黄色文字(#fbd115)/米黄背景(#fffbe6)/浅黄边框(#ffe58f)
 *
 * @example
 * // 默认成功状态
 * <Status label="运行正常" />
 *
 * @example
 * // 错误状态展示
 * <Status
 *   type="error"
 *   label="连接失败"
 * />
 *
 * @example
 * // 警告状态配置
 * <Status
 *   type="warning"
 *   label="即将过期"
 * />
 */
function getStyle(type: StatusType = 'success') {
  const styleMap: Record<StatusType, string> = {
    success: 'text-[#52c41a] bg-[#f6ffed] border-[#b7eb8f]',
    error: 'text-[#f5222d] bg-[#fff1f0] border-[#ffa39e]',
    warning: 'text-[#fbd115] bg-[#fffbe6] border-[#ffe58f]',
  };
  return `${styleMap[type]} text-center border rounded-[4px]`;
}
const Status: FC<PropsType> = (props) => {
  return <div className={getStyle(props.type)}>{props.label}</div>;
};
export { Status };
