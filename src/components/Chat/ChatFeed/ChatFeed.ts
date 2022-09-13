import { Block } from 'core/Block';
import { Store } from 'core/Store';
import { deleteChat } from 'services/chats';
import { getHoursAndMinutesFromDate } from 'utils/formatters';

import './ChatFeed.css';

type ChatFeedProps = {
  store: Store<AppState>;
  chatId: number;
  chatTitle: string;
};

export class ChatFeed extends Block<ChatFeedProps> {
  static componentName: string = 'ChatFeed';

  protected getStateFromProps(): void {
    this.state = {
      isModalChatConfigOpen: false,
      isModalAddUserOpen: false,
      isModalRemoveUserOpen: false,

      toggleChatConfigModal: () => {
        this.setState({
          isModalChatConfigOpen: !this.state.isModalChatConfigOpen,
        });
      },
      toggleChatAddUserModal: () => {
        this.setState({
          isModalAddUserOpen: !this.state.isModalAddUserOpen,
        });
      },
      toggleChatRemoveUserModal: () => {
        this.setState({
          isModalRemoveUserOpen: !this.state.isModalRemoveUserOpen,
        });
      },
      onAddUserClick: () => {
        this.setState({
          isModalChatConfigOpen: false,
          isModalAddUserOpen: true,
        });
      },
      onRemoveUserClick: () => {
        this.setState({
          isModalChatConfigOpen: false,
          isModalRemoveUserOpen: true,
        });
      },
      onDeleteChatClick: () => {
        // TODO — сделать модалку подтверждения
        console.log('delete chat', this.props.chatId);
        this.props.store.dispatch(
          deleteChat,
          this.props.store.getState().chats.currentChat.chatId,
        );
      },
    };
  }

  protected render(): string {
    const messages = this.props.store.getState().messages || [];
    // TODO — сделать даты сообщений
    // TODO — количество человек в чате
    return `
      <section class="chatFeed">
        {{#if ${this.props.store.getState().chats?.currentChat?.chatId}}}
          {{{ ChatHeader
            chatTitle="${
              this.props.store.getState().chats?.currentChat?.chatTitle
            }"
            chatAvatar="${
              this.props.store.getState().chats?.currentChat?.chatAvatar
            }"
            toggleChatConfigModal=toggleChatConfigModal
          }}}

          <div class="chatFeed__feed">
            ${messages
              .map(
                (message) => `
              {{{ ChatMessage
                messageText="${message.content}"
                messageTime="${getHoursAndMinutesFromDate(message.time)}"
                isMessageMine=${
                  message.userId === this.props.store.getState().user.id
                }
              }}}
            `,
              )
              .join('')}
          </div>

          {{{ ChatFooter store=store }}}

          {{#if isModalChatConfigOpen}}
            {{{ ChatConfigModal
              onAddUserClick=onAddUserClick
              onRemoveUserClick=onRemoveUserClick
              onDeleteChatClick=onDeleteChatClick
            }}}
          {{/if}}

          {{#if isModalAddUserOpen}}
            {{{ ChatAddUserModal store=store onClose=toggleChatAddUserModal }}}
          {{/if}}

          {{#if isModalRemoveUserOpen}}
            {{{ ChatRemoveUserModal store=store onClose=toggleChatRemoveUserModal }}}
          {{/if}}

        {{else}}
          <p class="chatFeed__placeholder">
            Choose a chat to send a message
          </p>
        {{/if}}
    </section>
    `;
  }
}
