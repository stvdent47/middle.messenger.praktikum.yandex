import { Block } from 'core/Block';

import './ChatsPage.css';

const profileLinkArrow = require('../../static/img/profileLinkArrow.svg');

export class Chats extends Block {
  protected render(): string {
    return `
      <div>
        {{{ Header }}}
        <main class="wrapper">
          <section class="chats">
            <div class="chats__profileLinkContainer">
              <a href="../ProfilePage/profile-page.html" class="chats__profileLink">
                Profile
                <img src="${profileLinkArrow}}" alt="" class="chats__profileLinkArrow" />
              </a>
            </div>
            <div class="chats__search">
              <input type="text" class="chats__searchInput" placeholder="Search" />
            </div>
            <div class="chats__chatList">
              <p class="messages__placeholder">A list of chats will be here</p>
            </div>
          </section>

          <section class="messages">
            <p class="messages__placeholder">
              Choose a chat to send a message
            </p>
          </section>
        </main>
      </div>`;
  }
}
