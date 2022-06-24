import { Block } from 'core/Block';

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
    super({ email, login, firstName, secondName, displayName, phone });
  }

  protected render(): string {
    return `
      <div>
        {{{ Header }}}

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
              <div class="profile__mainInfoRow">
                <span class="profile__rowName">Email</span>
                <span class="profile__rowValue">{{ email }}</span>
              </div>
              <div class="profile__mainInfoRow">
                <span class="profile__rowName">Login</span>
                <span class="profile__rowValue">{{ login }}</span>
              </div>
              <div class="profile__mainInfoRow">
                <span class="profile__rowName">First name</span>
                <span class="profile__rowValue">{{ firstName }}</span>
              </div>
              <div class="profile__mainInfoRow">
                <span class="profile__rowName">Second name</span>
                <span class="profile__rowValue">{{ secondName }}</span>
              </div>
              <div class="profile__mainInfoRow">
                <span class="profile__rowName">Display name</span>
                <span class="profile__rowValue">{{ displayName }}</span>
              </div>
              <div class="profile__mainInfoRow">
                <span class="profile__rowName">Phone</span>
                <span class="profile__rowValue">{{ phone }}</span>
              </div>
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
