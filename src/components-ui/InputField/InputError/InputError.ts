import { Block } from 'core/Block';

type InputErrorProps = {
  errorText?: string;
  className: string;
};

export class InputError extends Block {
  static componentName: string = 'InputError';

  constructor(props: InputErrorProps) {
    super(props);
  }

  protected render(): string {
    return `<p class="{{ className }}__inputError">{{ errorText }}</p>`;
  }
}
