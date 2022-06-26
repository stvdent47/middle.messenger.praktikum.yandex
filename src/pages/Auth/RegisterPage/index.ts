import { renderDOM } from 'core/renderDOM';
import { RegisterPage } from './RegisterPage';

document.addEventListener('DOMContentLoaded', () => {
  renderDOM('#root', new RegisterPage({}));
});
