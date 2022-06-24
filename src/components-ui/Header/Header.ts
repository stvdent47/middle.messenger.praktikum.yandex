import { Block } from 'core/Block';

type HeaderProps = {};

export class Header extends Block {
  static componentName: string = 'Header';

  constructor(props: HeaderProps) {
    super(props);
  }

  protected render(): string {
    return `
      <a href="../../index.html" style="position:absolute;">Home</a>
    `;
  }
}
