/* eslint-disable indent */
import { Block } from 'core/Block';
import { Store } from 'core/Store';
import {
  establishConnection,
  getChatUsers,
  setCurrentChat,
} from 'services/chats';
import { getHoursAndMinutesFromDate } from 'utils/formatters';

import './ChatList.css';

type ChatListProps = {
  store: Store<AppState>;
  onChatClick: () => void;
};

export class ChatList extends Block<ChatListProps> {
  static componentName: string = 'ChatList';

  protected getStateFromProps(): void {
    this.state = {
      onChatClick: this.handleChatClick.bind(this),
    };
  }

  handleChatClick({
    chatId,
    chatTitle,
  }: {
    chatId: number;
    chatTitle: string;
  }) {
    this.props.store.dispatch(setCurrentChat, { chatId, chatTitle });
    this.props.store.dispatch(getChatUsers, chatId);
    this.props.store.dispatch(establishConnection);
  }

  protected render(): string {
    const chats = this.props.store.getState().chats?.chatList;
    const userLogin = this.props.store.getState().user?.login;

    return `
      <ul class="chatList">
        {{#if ${chats && chats.length > 0}}}
          ${(chats || [])
            .map(
              (chat) => `
                {{{ ChatButton
                  chatId=${chat.id}
                  avatar=${chat.avatar}
                  content="${chat.lastMessage?.content}"
                  isLastMessageMine=${
                    userLogin === chat.lastMessage?.user.login
                  }
                  time="${getHoursAndMinutesFromDate(
                    chat.lastMessage?.time || new Date(),
                  )}"
                  title="${chat.title}"
                  unreadCount=${chat.unreadCount}
                  onChatClick=onChatClick
                }}}
              `,
            )
            .join('')}
        {{else}}
          <p class="chatList__noChatsText">You have no chats started.</p>
        {{/if}}
      </ul>
    `;
  }
}
