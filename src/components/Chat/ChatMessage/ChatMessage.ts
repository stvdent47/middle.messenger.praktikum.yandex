import { Block } from 'core/Block';

import './ChatMessage.css';

type ChatMessageProps = {
  messageText?: string;
  messageTime?: string;
  isMessageMine?: boolean;
  messageImage?: string;
};

export class ChatMessage extends Block<ChatMessageProps> {
  static componentName: string = 'ChatMessage';

  protected render(): string {
    return `
      <div
        class="chatMessage ${
          this.props.isMessageMine ? 'chatMessage_mine' : ''
        }"
      >
        {{#if messageImage}}
          <img
            src="{{ messageImage }}"
            alt="messageImage"
            class="chatMessage__messageImage"
          />
        {{/if}}
        <p class="chatMessage__messageText">{{ messageText }}</p>
        <p class="chatMessage__messageTime">{{ messageTime }}</p>
      </div>`;
  }
}
