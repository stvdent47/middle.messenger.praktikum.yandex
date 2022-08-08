import { Block } from 'core/Block';
import { mockUser } from 'data/user';
import { validateRule, ValidationRule } from 'helpers/validation';

import './ProfilePage.css';

const profileNoAvatar = require('static/img/profileNoAvatar.svg');

type ProfilePageProps = {
  email: string;
  login: string;
  firstName: string;
  secondName: string;
  displayName: string;
  phone: string;
};

export class ProfilePage extends Block {
  constructor({
    email,
    login,
    firstName,
    secondName,
    displayName,
    phone,
  }: ProfilePageProps) {
    super({
      email,
      login,
      firstName,
      secondName,
      displayName,
      phone,
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
            console.log({ data });
          }
        },
      },
    });
  }

  protected render(): string {
    return `
      <div>
        <main class="wrapper">
          <div class="profile">
            <section class="profile__displayInfo">
              <div class="profile__avatarContainer">
                <img src="${profileNoAvatar}" alt="" class="profile__avatar">
              </div>
              <h1 class="profile__displayName">
                {{user.displayName}}
              </h1>
            </section>

            <section class="profile__mainInfo">
              <form class="profile__form">
                {{{ InputField
                  name="email"
                  ref="email"
                  labelText="Email"
                  className="profile"
                  validationRule="${ValidationRule.email}"
                  value="${mockUser.email}"
                }}}
                {{{ InputField
                  name="login"
                  ref="login"
                  labelText="Login"
                  className="profile"
                  validationRule="${ValidationRule.login}"
                  value="${mockUser.login}"
                }}}
                {{{ InputField
                  name="first_name"
                  ref="first_name"
                  labelText="First name"
                  className="profile"
                  validationRule="${ValidationRule.first_name}"
                  value="${mockUser.firstName}"
                }}}
                {{{ InputField
                  name="second_name"
                  ref="second_name"
                  labelText="Second name"
                  className="profile"
                  validationRule="${ValidationRule.second_name}"
                  value="${mockUser.secondName}"
                }}}
                {{{ InputField
                  name="display_name"
                  ref="display_name"
                  labelText="Display name"
                  className="profile"
                  validationRule="${ValidationRule.display_name}"
                  value="${mockUser.displayName}"
                }}}
                {{{ InputField
                  name="phone"
                  ref="phone"
                  labelText="Phone"
                  className="profile"
                  validationRule="${ValidationRule.phone}"
                  value="${mockUser.phone}"
                }}}
                {{{ Button
                  text="Save"
                  type="submit"
                  className="profile__buttonSave"
                }}}
              </form>
            </section>

            <section class="profile__buttons">
              {{{ Button text="Change info" className="profile__button" }}}
              {{{ Button text="Change password" className="profile__button" }}}
              <a href="../Auth/LoginPage/login.html">
                {{{ Button text="Sign out" className="profile__button profile__button_signOut" }}}
              </a>
            </section>
          </div>
        </main>
        <button onclick="history.back()" class="goBackButton" />
      </div>`;
  }
}
