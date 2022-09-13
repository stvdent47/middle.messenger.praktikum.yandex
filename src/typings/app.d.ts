import { User } from 'models/auth';
import { ChatView, MessageView } from 'models/chat';

declare global {
  export type Nullable<T> = T | null;

  export type Keys<T extends Record<string, unknown>> = keyof T;
  export type Values<T extends Record<string, unknown>> = T[Keys<T>];

  export interface BlockClass<Props = any> extends Function {
    new (props: Props): Block<Props>;
    componentName: string;
  }

  export type Props = Record<string, any>;

  export type AppState = {
    isAppInitiated: boolean;
    isLoading: boolean;
    user: User | null;
    chats: {
      chatList: ChatView[];
      chatToken: string;
      currentChat: {
        chatId: number;
        chatTitle: string;
        users: User[];
        chatAvatar?: string;
      };
    };
    messages: MessageView[];
    ws: Nullable<WebSocket>;
  };
}

export {};
