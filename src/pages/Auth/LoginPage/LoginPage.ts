import { Block } from 'core/Block';
import { Router } from 'core/BrowseRouter';
import { Store } from 'core/Store';
import { validateRule, ValidationRule } from 'helpers/validation';
import { withRouter } from 'hocs/withRouter';
import { withStore } from 'hocs/withStore';
import { login } from 'services/auth';
import { Screens } from 'utils/screenList';

import '../index.css';

type LoginPageProps = {
  router: Router;
  store: Store<AppState>;
};

class LoginPage extends Block<LoginPageProps> {
  static componentName: string = 'LoginPage';

  constructor(props: LoginPageProps) {
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

              const errorMessage = validateRule(
                ValidationRule[name as keyof typeof ValidationRule],
                value,
              );

              if (errorMessage) {
                isValid = false;
                this.refs[name].refs.errorText.setProps({
                  errorText: errorMessage,
                });
              } else {
                data[name] = value;
              }
            });

            if (isValid) {
              // debugger;
              this.props.store.dispatch(login, data);
            }
          }
        },
      },
    });
  }

  componentDidMount(): void {
    if (
      this.props.store.getState().isAppInitiated &&
      this.props.store.getState().user
    ) {
      this.props.router.go(`/${Screens.Chats}`);
    }
  }

  protected render(): string {
    return `
        <main class="wrapper">
          <div class="form form__login">
            <h1 class="form__title">Sign in</h1>
            <form class="form__form">
              <div class="form__inputs">
                {{{ InputField
                  name="login"
                  ref="login"
                  labelText="Login"
                  errorText="Invalid login"
                  className="form"
                  validationRule="${ValidationRule.login}"
                }}}

                {{{ InputField
                  name="password"
                  ref="password"
                  inputType="password"
                  labelText="Password"
                  errorText="Invalid password"
                  className="form"
                  validationRule="${ValidationRule.password}"
                }}}
              </div>
              {{{ Button
                text="Login"
                className="form__submitButton"
                type="submit"
              }}}
            </form>
            {{{ Link
              router=router
              to="/${Screens.Register}"
              text="Create account"
              className="form__link"
            }}}
          </div>
        </main>`;
  }
}

export default withRouter(withStore(LoginPage));
