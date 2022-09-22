import { Block } from 'core/Block';
import { Store } from 'core/Store';
import { addUserToChat } from 'services/chats';

import './ChatAddUserModal.css';

type ChatAddUserModalProps = {
  store: Store<AppState>;
  onClose?: () => void;
};

export class ChatAddUserModal extends Block<ChatAddUserModalProps> {
  static componentName: string = 'ChatAddUserModal';

  constructor({ store, onClose, ...props }: ChatAddUserModalProps) {
    super({
      ...props,
      onClose,
      events: {
        submit: (evt: SubmitEvent) => {
          evt.preventDefault();

          const input: Nullable<HTMLInputElement> | undefined =
            this.element?.querySelector('input');

          store.dispatch(addUserToChat, {
            chatId: 111,
            userLogin: input?.value,
          });

          onClose?.();
        },
      },
    });
  }

  protected render(): string {
    // TODO — сделать выбор юзера из поиска
    return `
      <div class="modal">
        <div class="modal__chatAddUser">
          <h1 class="modal__title">Add user to the chat</h1>
          <form name="chatAddUserForm" class="chatAddUserForm">
            {{{ InputField
              name="login"
              labelText="Login"
              className="chatAddUserFormInput"
            }}}
            {{{ Button
              text="Add user"
              className="chatAddUserForm__submitButton"
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
