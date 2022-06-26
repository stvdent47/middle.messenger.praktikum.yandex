import { renderDOM } from 'core/renderDOM';
import { LoginPage } from './LoginPage';

document.addEventListener('DOMContentLoaded', () => {
  renderDOM('#root', new LoginPage({}));
});
