import { Block } from 'core/Block';
import { validateRule, ValidationRule } from 'helpers/validation';

type InputFieldProps = {
  name: string;
  className: string;
  inputType?: string;
  inputValue?: string;
  isDisabled?: boolean;
  inputPlaceholder?: string;
  value?: string;
  labelText?: string;
  errorText?: string;
  validationRule?: ValidationRule;
};

export class InputField extends Block {
  static componentName: string = 'InputField';

  constructor({
    inputType = 'text',
    isDisabled = false,
    validationRule,
    ...props
  }: InputFieldProps) {
    super({
      ...props,
      inputType,
      isDisabled,
      onBlur: (evt: FocusEvent) => {
        const input = evt.target as HTMLInputElement;
        const { value } = input;

        if (validationRule) {
          const errorText = validateRule(validationRule, value);
          this.refs.errorText.setProps({ errorText });
        }
      },
      onFocus: (evt: FocusEvent) => {
        const input = evt.target as HTMLInputElement;
        const { value } = input;

        if (validationRule) {
          const errorText = validateRule(validationRule, value);
          this.refs.errorText.setProps({ errorText });
        }
      },
      onInput: (evt: FocusEvent) => {
        const input = evt.target as HTMLInputElement;
        const { value } = input;

        if (validationRule) {
          const errorText = validateRule(validationRule, value);
          this.refs.errorText.setProps({ errorText });
        }
      },
    });
  }

  protected render(): string {
    return `
      <div class="{{ className }}__inputContainer">
        <label
          for="{{ name }}"
          class="{{ className }}__inputLabel"
        >
          {{ labelText }}
        </label>
        {{{ Input
          value=value
          name=name
          className=className
          onFocus=onFocus
          onBlur=onBlur
          onInput=onInput
          inputType=inputType
          isDisabled=isDisabled
        }}}
        {{{ InputError
          className=className
          ref="errorText"
        }}}
      </div>`;
  }
}
