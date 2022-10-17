import ChatPage from 'pages/ChatsPage/ChatsPage';
import LoginPage from 'pages/Auth/LoginPage/LoginPage';
import ProfilePage from 'pages/ProfilePage/ProfilePage';
import ChangePasswordPage from 'pages/ProfilePage/ChangePasswordPage/ChangePasswordPage';
import RegisterPage from 'pages/Auth/RegisterPage/RegisterPage';

import { ErrorPage } from 'pages/ErrorPage/ErrorPage';

export enum Screens {
  Login = 'login',
  Register = 'signup',
  Chats = 'chats',
  Profile = 'profile',
  ChangePassword = 'change-password',

  NotFound = 'notFound',
  ServerError = 'serverError',
}

const screenMap: Record<Screens, BlockClass<never>> = {
  [Screens.Login]: LoginPage,
  [Screens.Register]: RegisterPage,
  [Screens.Chats]: ChatPage,
  [Screens.Profile]: ProfilePage,
  [Screens.ChangePassword]: ChangePasswordPage,

  [Screens.NotFound]: ErrorPage,
  [Screens.ServerError]: ErrorPage,
};

export const getScreenComponent = (screen: Screens) => screenMap[screen];
