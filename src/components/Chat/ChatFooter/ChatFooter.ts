import { Block } from 'core/Block';
import { Store } from 'core/Store';
import { sendMessage } from 'services/chats';

import './ChatFooter.css';

type ChatFooterProps = {
  store: Store<AppState>;
};

export class ChatFooter extends Block<ChatFooterProps> {
  static componentName: string = 'ChatFooter';

  constructor({ store, ...props }: ChatFooterProps) {
    super({
      ...props,
      events: {
        submit: (evt: SubmitEvent) => {
          evt.preventDefault();

          const input = this.element?.querySelector('input');

          const message = (input?.value || '').trim();

          if (!message) {
            return;
          }

          store.dispatch(sendMessage, message);
        },
      },
    });
  }

  protected render(): string {
    // TODO — дизейблить кнопку отправки, если текста нет
    return `
      <div class="chatFooter">
        <button class="chatFooter__buttonAttachment"></button>
        <form name="messageForm" class="chatFooter__messageForm">
          <input
            name="message"
            class="chatFooter__messageInput"
            placeholder="Message"
            autocomplete="off"
          />
          <button
            class="chatFooter__buttonSend"
            type="submit"
          />
        </form>
      </div>
    `;
  }
}
