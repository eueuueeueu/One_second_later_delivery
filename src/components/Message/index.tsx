import { produce } from 'immer';
import { FC, useEffect, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Message, { type MessageProps } from './message';
import './message.css';
interface MessageWithId extends MessageProps {
  id: string;
}
interface MessageContainerProps {
  messages: MessageWithId[];
}
const duration = 3000;
// <Message key={id} type={type} content={content} />
const MessageContainer: FC<MessageContainerProps> = ({ messages }) => {
  return (
    <TransitionGroup component={null}>
      {messages.map(({ id, type, content }) => (
        <CSSTransition
          key={id}
          timeout={duration}
          classNames="message"
          unmountOnExit
        >
          <Message type={type} content={content} />
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};

function useMessage() {
  const [messages, setMessages] = useState<MessageWithId[]>([]);
  useEffect(() => {
    if (messages.length > 0) {
      const timer = setTimeout(() => {
        setMessages(
          produce((draft) => {
            draft.shift();
          }),
        );
      }, duration);
      // 在useEffect中的return的函数，会在页面被卸载前执行
      return () => clearTimeout(timer);
    }
  }, [messages]);
  const messageApi = {
    open(option: MessageProps) {
      setMessages(
        produce(messages, (draft) => {
          draft.push({ id: Date.now().toString(), ...option });
        }),
      );
    },
  };
  return [messageApi, <MessageContainer messages={messages} />] as const;
}
export const message = {
  useMessage,
};
