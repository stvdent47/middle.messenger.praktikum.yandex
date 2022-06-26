import { renderDOM } from 'core/renderDOM';
import { Chats } from './ChatsPage';

document.addEventListener('DOMContentLoaded', () => {
  renderDOM('#root', new Chats());
});
