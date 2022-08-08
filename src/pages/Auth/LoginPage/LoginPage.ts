import { Block } from 'core/Block';
import { validateRule, ValidationRule } from 'helpers/validation';

import '../index.css';

type LoginPageProps = {};

export class LoginPage extends Block {
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
              console.log({ data });
            }
          }
        },
      },
    });
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
              {{{ Button text="Login" className="form__submitButton" type="submit" }}}
            </form>
            <a href="../RegisterPage/register.html" class="form__link">Create account</a>
          </div>
        </main>`;
  }
}
