import { Block } from 'core/Block';
import { Store } from 'core/Store';
import { updateUserAvatar } from 'services/user';

import './UpdateUserAvatarModal.css';

type UpdateUserAvatarModalProps = {
  store: Store<AppState>;
  onClose?: () => void;
};

export class UpdateUserAvatarModal extends Block<UpdateUserAvatarModalProps> {
  static componentName: string = 'UpdateUserAvatarModal';

  constructor({ store, onClose, ...props }: UpdateUserAvatarModalProps) {
    super({
      ...props,
      onClose,
      events: {
        submit: (evt: SubmitEvent) => {
          evt.preventDefault();

          const input = this.element?.querySelector('input');

          store.dispatch(updateUserAvatar, input?.files?.[0]);

          onClose?.();
        },
      },
    });
  }

  protected render(): string {
    return `
      <div class="modal">
        <div class="updateUserAvatarModal">
          <h1 class="modal__title">Upload a file</h1>
          <form name="updateUserAvatarForm" class="updateUserAvatarForm">
            <input
              type="file"
              class="updateUserAvatarForm__input"
              placeholder="foo"
            />
            {{{ Button
              text="Change"
              className="updateUserAvatarForm__submitButton"
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
