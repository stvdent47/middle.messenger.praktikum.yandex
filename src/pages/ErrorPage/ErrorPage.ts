import { Block } from 'core/Block';

import './index.css';

type ErrorPageProps = {
  errorCode: number;
  errorText: string;
};

export class ErrorPage extends Block {
  static componentName: string = 'ErrorPage';

  constructor({ errorCode, errorText }: ErrorPageProps) {
    super({ errorCode, errorText });
  }

  protected render(): string {
    return `
      <div>
        <main class="wrapper">
          <div class="error">
            <div class="error__info">
              <h1 class="error__title">{{ errorCode }}</h1>
              <h2 class="error__text">{{ errorText }}</h2>
            </div>

            <a href="../../Chats/chats.html" class="error__link">Back to chats</a>
          </div>
        </main>
      </div>`;
  }
}
