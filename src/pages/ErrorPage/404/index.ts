import { renderDOM } from 'core/renderDOM';
import { ErrorPage } from '../ErrorPage';

document.addEventListener('DOMContentLoaded', () => {
  renderDOM('#root', new ErrorPage({ errorCode: 404, errorText: 'Not found' }));
});
