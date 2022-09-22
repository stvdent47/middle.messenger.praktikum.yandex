import { Block } from 'core/Block';
import { Store } from 'core/Store';
import { createChat } from 'services/chats';

import './ChatCreateChatModal.css';

type ChatCreateChatModalProps = {
  store: Store<AppState>;
  onClose?: () => void;
};

export class ChatCreateChatModal extends Block<ChatCreateChatModalProps> {
  static componentName: string = 'ChatCreateChatModal';

  constructor({ store, onClose, ...props }: ChatCreateChatModalProps) {
    super({
      ...props,
      onClose,
      events: {
        submit: (evt: SubmitEvent) => {
          evt.preventDefault();

          const input: Nullable<HTMLInputElement> | undefined =
            this.element?.querySelector('input');

          store.dispatch(createChat, input?.value);

          onClose?.();
        },
      },
    });
  }

  protected render(): string {
    return `
      <div class="modal">
        <div class="modal__createChat">
          <h1 class="modal__createChatTitle">Create a chat</h1>
          <form name="createChatForm" class="createChatForm">
            {{{ InputField
              name="name"
              labelText="Chat name"
              className="modalFormInput"
            }}}
            {{{ Button
              text="Create"
              className="modal__submitButton"
              type="submit"
            }}}
          </form>
          {{{ Button
            onClick=onClose
            text="x"
            className="modal__closeButton"
          }}}
        </div>
      </div>
    `;
  }
}
