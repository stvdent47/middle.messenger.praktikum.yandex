import { Block } from 'core/Block';

import './ChatHeader.css';

const noAvatar = require('static/img/chatNoAvatar.svg');

type ChatHeaderProps = {
  chatTitle: string;
  toggleChatConfigModal: () => void;
  chatAvatar?: string;
};

export class ChatHeader extends Block<ChatHeaderProps> {
  static componentName: string = 'ChatHeader';

  protected render(): string {
    // TODO — отображение количества участников (перенести сюда модалку удаления пользователей
    // по нажатию на название чата?)
    return `
      <div class="chatHeader">
        <div class="chatHeader__userInfo">
          <img
            src="
              {{#if ${this.props.chatAvatar !== 'undefined'}}}
                {{ chatAvatar }}
              {{else}}
                ${noAvatar}
              {{/if}}"
            class="chatHeader__avatar"
          />
          <p class="chatHeader__username">
            {{#if chatTitle}}
              {{ chatTitle }}
            {{else}}
              Untitled chat
            {{/if}}
          </p>
        </div>
        {{{ Button
          className="chatHeader__buttonConfig"
          onClick=toggleChatConfigModal
        }}}
      </div>
    `;
  }
}
