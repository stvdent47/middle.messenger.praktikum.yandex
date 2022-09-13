import { Block } from 'core/Block';
import { Router } from 'core/BrowseRouter';
import { Store } from 'core/Store';
import { validateRule, ValidationRule } from 'helpers/validation';
import { withRouter } from 'hocs/withRouter';
import { withStore } from 'hocs/withStore';
import { signup } from 'services/auth';
import { Screens } from 'utils/screenList';

import '../index.css';

type RegisterPageProps = {
  router: Router;
  store: Store<AppState>;
};

class RegisterPage extends Block<RegisterPageProps> {
  static componentName: string = 'RegisterPage';

  constructor(props: RegisterPageProps) {
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
          }

          if (isValid) {
            console.log({ data });
            this.props.store.dispatch(signup, data);
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
          <div class="form form__register">
            <h1 class="form__title">Create account</h1>
            <form class="form__form">
              <div class="form__inputs">
                {{{ InputField
                  name="first_name"
                  ref="first_name"
                  labelText="First name"
                  className="form"
                  validationRule="${ValidationRule.first_name}"
                }}}
                {{{ InputField
                  name="second_name"
                  ref="second_name"
                  labelText="Second name"
                  className="form"
                  validationRule="${ValidationRule.second_name}"
                }}}
                {{{ InputField
                  name="login"
                  ref="login"
                  labelText="Login"
                  className="form"
                  validationRule="${ValidationRule.login}"
                }}}
                {{{ InputField
                  name="email"
                  ref="email"
                  inputType="email"
                  labelText="Email"
                  className="form"
                  validationRule="${ValidationRule.email}"
                }}}
                {{{ InputField
                  name="password"
                  ref="password"
                  inputType="password"
                  labelText="Password"
                  className="form"
                  validationRule="${ValidationRule.password}"
                }}}
                {{{ InputField
                  name="phone"
                  ref="phone"
                  labelText="Phone"
                  className="form"
                  validationRule="${ValidationRule.phone}"
                }}}
              </div>
              {{{ Button text="Create account" className="form__submitButton" type="submit"}}}
            </form>
            {{{ Link
              router=router
              to="/${Screens.Login}"
              text="Sign in"
              className="form__link"
            }}}
          </div>
        </main>
      `;
  }
}

export default withRouter(withStore(RegisterPage));
