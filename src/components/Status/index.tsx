import { FC } from 'react';

type StatusType = 'success' | 'error' | 'warning';
interface PropsType {
  type?: StatusType;
  label: string;
}
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
