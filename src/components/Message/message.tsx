import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { FC } from 'react';
export interface MessageProps {
  type: 'success' | 'warning' | 'error';
  content: string;
}

const Message: FC<MessageProps> = ({ type, content }) => {
  return (
    <div className="flex w-[300px] h-[60px] justify-center items-center gap-6 bg-black text-white shadow-xl shadow-[red]">
      <>
        {type === 'success' && (
          <CheckCircleOutlined style={{ color: '#52c41a' }} />
        )}
        {type === 'error' && <CloseCircleOutlined style={{ color: '#e80000' }} />}
        {type === 'warning' && (
          <ExclamationCircleOutlined style={{ color: '#04acfa' }} />
        )}
      </>
      <span>{content}</span>
    </div>
  );
};
export default Message;
