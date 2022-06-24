import { Block } from 'core/Block';

import '../index.css';

type RegisterPageProps = {};

export class RegisterPage extends Block {
  static componentName: string = 'RegisterPage';

  constructor(props: RegisterPageProps) {
    super({
      ...props,
      events: {
        submit: (evt: SubmitEvent) => {
          evt.preventDefault();

          console.log('register submit');
        },
      },
    });
  }

  render() {
    return `
      <div>
        {{{ Header }}}

        <main class="wrapper">
          <div class="form form__register">
            <h1 class="form__title">Create account</h1>
            <form class="form__form">
              <div class="form__inputs">
                <label for="first_name" class="form__inputLabel">First name</label>
                <input type="text" name="first_name" class="form__input" />
                <p class="form__inputError">Invalid first name</p>
                <label for="second_name" class="form__inputLabel">Second name</label>
                <input type="text" name="second_name" class="form__input" />
                <p class="form__inputError">Invalid second name</p>
                <label for="login" class="form__inputLabel">Login</label>
                <input type="text" name="login" class="form__input" />
                <p class="form__inputError">Invalid login</p>
                <label for="email" class="form__inputLabel">Email</label>
                <input type="email" name="email" class="form__input" />
                <p class="form__inputError">Invalid email</p>
                <label for="password" class="form__inputLabel">Password</label>
                <input type="password" name="password" class="form__input" />
                <p class="form__inputError">Invalid password</p>
                <label for="phone" class="form__inputLabel">Phone</label>
                <input type="text" name="phone" class="form__input" />
                <p class="form__inputError">Invalid phone</p>
              </div>
              {{{ Button text="Create account" className="form__submitButton" type="submit"}}}
            </form>
            <a href="../LoginPage/login.html" class="form__link">Sign in</a>
          </div>
        </main>
      </div>`;
  }
}
