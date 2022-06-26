import { Block } from 'core/Block';

type InputProps = {
  name: string;
  className: string;
  inputType?: 'text' | 'password' | 'email';
  isDisabled?: boolean;
  inputPlaceholder?: string;
  value?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  onInput?: () => void;
};

export class Input extends Block {
  static componentName: string = 'Input';

  constructor({
    inputType = 'text',
    isDisabled = false,
    onFocus,
    onBlur,
    onInput,
    ...props
  }: InputProps) {
    super({
      inputType,
      isDisabled,
      ...props,
      events: {
        focus: onFocus,
        blur: onBlur,
        input: onInput,
      },
    });
  }

  protected render(): string {
    return `
      <input
        name="{{ name }}"
        type="{{ inputType }}"
        class="{{ className }}__input"
        placeholder="{{ inputPlaceholder }}"
        autocomplete="off"
        value="{{ value }}"
        {{#if isDisabled}}
          disabled
        {{/if}}
      />`;
  }
}
