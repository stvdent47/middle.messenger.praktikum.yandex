import { Block } from 'core/Block';
import { mockAvatar } from 'data/user';
import { mockMessage } from 'data/chats';

import './ChatsPage.css';

const profileLinkArrow = require('static/img/profileLinkArrow.svg');
export class Chats extends Block {
  protected render(): string {
    return `
      <main class="wrapperChat">
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
          <ul class="chats__chatList">
            {{{ ChatButton
              username="jim"
              isLastMessageMine=false
              message="lorem"
              time="10:59"
              countBadge=1
            }}}
            {{{ ChatButton
              username="michael"
              isLastMessageMine=false
              message="${mockMessage}"
              time="10:59"
              countBadge=12
            }}}
            {{{ ChatButton
              username="dwight"
              userAvatar="${mockAvatar}"
              isLastMessageMine=true
              message="${mockMessage}"
              time="friday"
              countBadge=0
            }}}
          </ul>
        </section>

        {{{ ChatFeed chatId="1" userAvatar="${mockAvatar}" }}}
      </main>`;
  }
}
