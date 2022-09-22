import { Block } from 'core/Block';

import './ChatButton.css';

const chatNoAvatar = require('static/img/chatNoAvatar.svg');

type ChatButtonProps = {
  chatId: number;
  // TODO — проверить, когда сделаю функционал изменения аватарки чата, какой тип приходит
  avatar: Nullable<string>;
  content: string;
  isLastMessageMine: boolean;
  time: string;
  title: string;
  unreadCount: number;
  onChatClick: ({
    chatId,
    chatTitle,
  }: {
    chatId: number;
    chatTitle: string;
  }) => void;
};

export class ChatButton extends Block<ChatButtonProps> {
  static componentName: string = 'ChatButton';

  constructor(props: ChatButtonProps) {
    super({
      ...props,
      events: {
        click: () => {
          props.onChatClick({ chatId: props.chatId, chatTitle: props.title });
        },
      },
    });
  }

  protected render(): string {
    return `
      <li class="chatButton">
        <img
          src="
            {{#if ${this.props.avatar !== null}}}
              {{ avatar }}
            {{else}}
              ${chatNoAvatar}
            {{/if}}"
          alt="userAvatar"
          class="chatButton__avatar"
        />

        <div class="chatButton__messageInfo">
          <div class="chatButton__userAndMessage">
            <p class="chatButton__username">{{ title }}</p>
            <p class="chatButton__messageText">
              {{#if isLastMessageMine}}
                <span class="chatButton__messageText chatButton__message_you">You:</span>
              {{/if}}
              {{#if ${this.props.content !== 'undefined'}}}
                {{ content }}
              {{else}}
                No messages yet.
              {{/if}}
            </p>
          </div>

          <div class="chatButton__timeAndCount">
            <p class="chatButton__time">{{ time }}</p>
            {{#if unreadCount}}
              <div class="chatButton__countBadge">{{ unreadCount }}</div>
            {{/if}}
          </div>
        </div>
      </li>
    `;
  }
}
