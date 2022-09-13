import { Block } from 'core/Block';
import { Router } from 'core/BrowseRouter';
import { Store } from 'core/Store';

import { withRouter } from 'hocs/withRouter';
import { withStore } from 'hocs/withStore';
import { ChatView } from 'models/chat';
import { getChats } from 'services/chats';
import { Screens } from 'utils/screenList';

import './ChatsPage.css';

const profileLinkArrow = require('static/img/profileLinkArrow.svg');

type ChatPageProps = {
  router: Router;
  store: Store<AppState>;
  chats: ChatView[];
};

class ChatPage extends Block<ChatPageProps> {
  static componentName: string = 'ChatsPage';

  constructor({ store, ...props }: ChatPageProps) {
    super({ store, ...props });

    store.dispatch(getChats);
  }

  protected getStateFromProps(): void {
    this.state = {
      isModalCreateChatOpen: false,

      toggleCreateChatModal: () => {
        this.setState({
          isModalCreateChatOpen: !this.state.isModalCreateChatOpen,
        });
      },
    };
  }

  componentDidMount(): void {
    if (
      this.props.store.getState().isAppInitiated &&
      !this.props.store.getState().user
    ) {
      this.props.router.go(`/${Screens.Login}`);
    }
  }

  protected render(): string {
    return `
      <main class="wrapperChat">
        <section class="chats">
          <div class="chats__buttons">
            {{{ Button
              text="Create chat"
              onClick=toggleCreateChatModal
              className="chats__buttonNewChat"
            }}}
            <div class="chats__profileLinkContainer">
              {{{ Link
                router=router
                to="/${Screens.Profile}"
                text="Profile"
                className="chats__profileLink"
              }}}
              <img src="${profileLinkArrow}}" alt="" class="chats__profileLinkArrow" />
            </div>
          </div>
          <div class="chats__search">
            <input type="text" class="chats__searchInput" placeholder="Search" />
          </div>
          {{{ ChatList store=store }}}
        </section>

        {{{ ChatFeed store=store }}}

        {{#if isModalCreateChatOpen }}
          {{{ ChatCreateChatModal store=store onClose=toggleCreateChatModal }}}
        {{/if}}
      </main>
    `;
  }
}

export default withRouter(withStore(ChatPage));
