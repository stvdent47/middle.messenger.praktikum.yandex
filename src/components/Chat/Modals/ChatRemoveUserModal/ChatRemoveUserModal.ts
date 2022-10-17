/* eslint-disable indent */
import { Block } from 'core/Block';
import { Store } from 'core/Store';
import { removeUserFromChat } from 'services/chats';

import './ChatRemoveUserModal.css';

type ChatRemoveUserModalProps = {
  store: Store<AppState>;
  onClose?: () => void;
};

export class ChatRemoveUserModal extends Block<ChatRemoveUserModalProps> {
  static componentName: string = 'ChatRemoveUserModal';

  protected getStateFromProps(): void {
    this.state = {
      onRemoveUserClick: (evt: PointerEvent) => {
        const target = evt.target as HTMLElement;
        const liElement: Nullable<HTMLElement> = target.closest(
          '.modal__chatRemoveUserListItem',
        );

        if (liElement) {
          this.props.store.dispatch(
            removeUserFromChat,
            Number(liElement.dataset.userId),
          );
        }

        this.props.onClose?.();
      },
    };
  }

  protected render(): string {
    const users = this.props.store.getState().chats.currentChat.users || [];

    return `
      <div class="modal">
        <div class="modal__chatRemoveUser">
          <h1 class="modal__title">Remove user from the chat</h1>
          <ul class="modal__chatRemoveUserList">
            ${users
              .map(
                (user) => `
              <li class="modal__chatRemoveUserListItem" data-user-id="${
                user.id
              }">
                ${user.firstName} ${user.secondName} ${
                  user.displayName ? `(@${user.displayName})` : ''
                }
                {{{ Button
                  className="modal__chatRemoveUserButton"
                  onClick=onRemoveUserClick
                }}}
              </li>
            `,
              )
              .join('')}
          </ul>
          {{{ Button
            className="modal__closeButton"
            text="x"
            onClick=onClose
          }}}
        </div>
      </div>
    `;
  }
}
