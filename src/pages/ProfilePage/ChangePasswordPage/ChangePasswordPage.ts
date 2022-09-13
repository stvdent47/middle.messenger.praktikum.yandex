import { Block } from 'core/Block';
import { Router } from 'core/BrowseRouter';
import { Store } from 'core/Store';
import { validateRule, ValidationRule } from 'helpers/validation';
import { withRouter } from 'hocs/withRouter';
import { withStore } from 'hocs/withStore';
import { changePassword } from 'services/user';
import { Screens } from 'utils/screenList';

import './ChangePasswordPage.css';

const profileNoAvatar = require('static/img/profileNoAvatar.svg');

type ChangePasswordPageProps = {
  store: Store<AppState>;
  router: Router;
};

class ChangePasswordPage extends Block<ChangePasswordPageProps> {
  static componentName: string = 'ChangePasswordPage';

  constructor({ store, ...props }: ChangePasswordPageProps) {
    super({
      ...props,
      store,
      events: {
        submit: (evt: SubmitEvent) => {
          evt.preventDefault();
          console.log({ evt });
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
            // TODO — показывать ошибку, если старый пароль неверный
            store.dispatch(changePassword, data);
          }
        },
      },
    });
  }

  // protected getStateFromProps(): void {
  //   this.state = {
  //     isOldPasswordIncorrect: false,
  //   };
  // }

  componentDidMount(): void {
    if (
      this.props.store.getState().isAppInitiated &&
      !this.props.store.getState().user
    ) {
      this.props.router.go(`/${Screens.Login}`);
    }
  }

  protected render(): string {
    const user = this.props.store.getState()?.user;
    const avatarUrl = user?.avatar
      ? `https://ya-praktikum.tech/api/v2/resources${user.avatar}`
      : profileNoAvatar;

    return `
      <main class="wrapperChangePassword">
        <div class="changePassword">
          <img
            src=${avatarUrl}
            alt="profile photo"
            class="changePassword__avatar"
          />
          <form>
            {{{ InputField
              name="oldPassword"
              ref="oldPassword"
              inputType="password"
              labelText="Current password"
              errorText="Invalid password"
              className="form"
              validationRule="${ValidationRule.password}"
            }}}
            {{{ InputField
              name="newPassword"
              ref="newPassword"
              inputType="password"
              labelText="New password"
              errorText="Invalid password"
              className="form"
              validationRule="${ValidationRule.password}"
            }}}
            {{{ Button
              text="Change password"
              className="form__submitButton changePassword__submitButton"
              type="submit"
            }}}
          </form>
        </div>

        <button onclick="history.back()" class="goBackButton" />
      </main>
    `;
  }
}

export default withRouter(withStore(ChangePasswordPage));
