import { Block } from 'core/Block';

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
          console.log('login submit');
        },
      },
    });

    this.setProps({
      onClickButton: this.onClickButton.bind(this),
    });
  }

  onClickButton(evt: SubmitEvent) {
    evt.preventDefault();
    console.log('button click');
  }

  render() {
    return `
      <div>
        {{{ Header }}}

        <main class="wrapper">
          <div class="form form__login">
            <h1 class="form__title">Sign in</h1>
            <form class="form__form">
              <div class="form__inputs">
                <label for="login" class="form__inputLabel">Login</label>
                <input type="text" name="login" class="form__input" />
                <p class="form__inputError">Invalid login</p>
                <label for="password" class="form__inputLabel">Password</label>
                <input type="password" name="password" class="form__input" />
                <p class="form__inputError">Invalid password</p>
              </div>
              {{{ Button text="Login" className="form__submitButton" type="submit" }}}
            </form>
            <a href="../RegisterPage/register.html" class="form__link">Create account</a>
          </div>
        </main>
      </div>`;
  }
}
