import { Block } from 'core/Block';

type InputErrorProps = {
  errorText?: string;
  className: string;
};

export class InputError extends Block<InputErrorProps> {
  static componentName: string = 'InputError';

  protected render(): string {
    return '<p class="{{ className }}__inputError">{{ errorText }}</p>';
  }
}
