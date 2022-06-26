import { Block } from 'core/Block';

type ButtonProps = {
  text: string;
  onClick: () => void;
  className?: string;
  type?: string;
};

export class Button extends Block {
  static componentName = 'Button';

  constructor({ text, onClick, className = '', type = 'button' }: ButtonProps) {
    super({ text, className, type, events: { click: onClick } });
  }

  protected render(): string {
    return `
        <button class="{{className}}" type="{{type}}">{{text}}</button>
    `;
  }
}
