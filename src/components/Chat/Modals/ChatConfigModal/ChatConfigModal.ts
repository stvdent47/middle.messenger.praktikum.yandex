import { Block } from 'core/Block';

import './ChatConfigModal.css';

const iconAdd = require('static/img/chatIconPlus.svg');
const iconRemove = require('static/img/chatIconCross.svg');

type ChatConfigModalProps = {
  onAddUserClick: () => void;
  onRemoveUserClick: () => void;
  onDeleteChatClick: () => void;
};

export class ChatConfigModal extends Block<ChatConfigModalProps> {
  static componentName: string = 'ChatConfigModal';

  protected render(): string {
    return `
      <div class="modal__chatConfig">
        <ul class="chatConfig__optionList">
          <li class="chatConfig__option">
            <img
              src=${iconAdd}
              alt="add user icon"
              class="chatConfig__optionIcon"
            />
            {{{ Button
              className="chatConfig__optionButton"
              text="Add user"
              onClick=onAddUserClick
            }}}
          </li>
          <li class="chatConfig__option">
            <img
              src=${iconRemove}
              alt="remove user icon"
              class="chatConfig__optionIcon"
            />
            {{{ Button
              className="chatConfig__optionButton"
              text="Remove user"
              onClick=onRemoveUserClick
            }}}
          </li>
          <li class="chatConfig__option">
            <img
              src=${iconRemove}
              alt="remove user icon"
              class="chatConfig__optionIcon"
            />
            {{{ Button
              className="chatConfig__optionButton"
              text="Delete chat"
              onClick=onDeleteChatClick
            }}}
          </li>
        </ul>
      </div>
    `;
  }
}
