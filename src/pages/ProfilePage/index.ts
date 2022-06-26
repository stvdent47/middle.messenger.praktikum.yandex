import { renderDOM } from 'core/renderDOM';
import { ProfilePage } from './ProfilePage';
import { mockUser } from 'data/user';

const { email, login, firstName, secondName, displayName, phone } = mockUser;
document.addEventListener('DOMContentLoaded', () => {
  renderDOM(
    '#root',
    new ProfilePage({
      email,
      login,
      firstName,
      secondName,
      displayName,
      phone,
    }),
  );
});
