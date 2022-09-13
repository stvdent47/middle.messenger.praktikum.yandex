import { EMPTY_PLACEHOLDER } from 'constants/default';
import { Block } from 'core/Block';
import { Router } from 'core/BrowseRouter';
import { Store } from 'core/Store';
import { validateRule, ValidationRule } from 'helpers/validation';
import { withRouter } from 'hocs/withRouter';
import { withStore } from 'hocs/withStore';
import { signOut } from 'services/auth';
import { updateUser } from 'services/user';
import { Screens } from 'utils/screenList';

import './ProfilePage.css';

const profileNoAvatar = require('static/img/profileNoAvatar.svg');

type ProfilePageProps = {
  router: Router;
  store: Store<AppState>;
  onSignOut?: () => void;
};

class ProfilePage extends Block<ProfilePageProps> {
  static componentName: string = 'ProfilePage';

  constructor(props: ProfilePageProps) {
    super({
      ...props,
      events: {
        submit: (evt: SubmitEvent) => {
          evt.preventDefault();

          const inputs: NodeListOf<HTMLInputElement> | undefined =
            this.element?.querySelectorAll('input');
          let isValid = true;
          const data: Record<string, string> = {};
          if (inputs) {
            inputs.forEach((input) => {
              const { name, value } = input;

              const errorText = validateRule(
                ValidationRule[name as keyof typeof ValidationRule],
                value,
              );

              if (errorText) {
                isValid = false;
                this.refs[name].refs.errorText.setProps({
                  errorText,
                });
              } else {
                data[name] = value;
              }
            });
          }

          if (isValid) {
            props.store.dispatch(updateUser, data);

            this.setState({ isUpdate: false });
          }
        },
      },
    });
  }

  protected getStateFromProps(): void {
    this.state = {
      isUpdateUserAvatarModalOpen: false,

      onChangeInfo: () => {
        this.setState({
          isUpdate: true,
        });
      },
      toggleUpdateUserAvatarModal: () => {
        console.log('toggle');
        this.setState({
          isUpdateUserAvatarModalOpen: !this.state.isUpdateUserAvatarModalOpen,
        });
      },
      onSignOut: () => this.props.store.dispatch(signOut),
    };
  }

  componentDidMount(): void {
    if (
      this.props.store.getState().isAppInitiated &&
      !this.props.store.getState().user
    ) {
      this.props.router.go(`/${Screens.Login}`);
    } else {
      this.setState({
        isUpdate: false,
      });
    }
  }

  protected render(): string {
    const user = this.props.store.getState().user;
    const avatarUrl = user?.avatar
      ? `https://ya-praktikum.tech/api/v2/resources${user.avatar}`
      : profileNoAvatar;
    console.log({ user, avatarUrl });
    return `
        <main class="wrapperProfile">
          <div class="profile">
            <section class="profile__displayInfo">
              <div
                class="profile__avatarContainer"
                style="background-image: url(${avatarUrl})"
              >
                {{{ Button
                  onClick=toggleUpdateUserAvatarModal
                  className="profile__avatar"
                }}}
              </div>
              <h1 class="profile__displayName">
                ${user?.displayName || EMPTY_PLACEHOLDER}
              </h1>
            </section>

            <section class="profile__mainInfo">
              <form class="profile__form">
                {{{ InputField
                  name="email"
                  ref="email"
                  labelText="Email"
                  className="profile"
                  isDisabled=${!this.state.isUpdate}
                  validationRule="${ValidationRule.email}"
                  value="${user?.email || EMPTY_PLACEHOLDER}"
                }}}
                {{{ InputField
                  name="login"
                  ref="login"
                  labelText="Login"
                  className="profile"
                  isDisabled=${!this.state.isUpdate}
                  validationRule="${ValidationRule.login}"
                  value="${user?.login || EMPTY_PLACEHOLDER}"
                }}}
                {{{ InputField
                  name="first_name"
                  ref="first_name"
                  labelText="First name"
                  className="profile"
                  isDisabled=${!this.state.isUpdate}
                  validationRule="${ValidationRule.first_name}"
                  value="${user?.firstName || EMPTY_PLACEHOLDER}"
                }}}
                {{{ InputField
                  name="second_name"
                  ref="second_name"
                  labelText="Second name"
                  className="profile"
                  isDisabled=${!this.state.isUpdate}
                  validationRule="${ValidationRule.second_name}"
                  value="${user?.secondName || EMPTY_PLACEHOLDER}"
                }}}
                {{{ InputField
                  name="display_name"
                  ref="display_name"
                  labelText="Display name"
                  className="profile"
                  isDisabled=${!this.state.isUpdate}
                  validationRule="${ValidationRule.display_name}"
                  value="${user?.displayName || EMPTY_PLACEHOLDER}"
                }}}
                {{{ InputField
                  name="phone"
                  ref="phone"
                  labelText="Phone"
                  className="profile"
                  isDisabled=${!this.state.isUpdate}
                  validationRule="${ValidationRule.phone}"
                  value="${user?.phone || EMPTY_PLACEHOLDER}"
                }}}
                {{#if isUpdate}}
                  {{{ Button
                    text="Save"
                    type="submit"
                    className="profile__buttonSave"
                  }}}
                {{/if}}
              </form>
            </section>

            {{#if ${!this.state.isUpdate}}}
              <section class="profile__buttons">
                {{{ Button
                  onClick=onChangeInfo
                  text="Change info"
                  className="profile__button"
                }}}
                {{{ Link
                  router=router
                  to="/${Screens.ChangePassword}"
                  text="Change password"
                  className="profile__button"
                }}}
                {{{ Button
                  text="Sign out"
                  className="profile__button profile__button_signOut"
                  onClick=onSignOut
                }}}
              </section>
            {{/if}}
          </div>
          {{#if isUpdateUserAvatarModalOpen}}
            {{{ UpdateUserAvatarModal store=store onClose=toggleUpdateUserAvatarModal }}}
          {{/if}}

          <button onclick="history.back()" class="goBackButton" />
        </main>
        `;
  }
}

export default withRouter(withStore(ProfilePage));
