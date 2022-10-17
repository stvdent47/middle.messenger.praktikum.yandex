import { Block } from 'core/Block';
import { Router } from 'core/BrowseRouter';

type LinkProps = {
  router: Router;
  to: string;
  text: string;
  className?: string;
};

export class Link extends Block<LinkProps> {
  static componentName: string = 'Link';

  constructor({ router, to, text, className }: LinkProps) {
    super({
      text,
      to,
      className,
      events: {
        click: () => {
          router.go(to);
        },
      },
    });
  }

  protected render(): string {
    return `
      <div class="{{className}}">{{text}}</div>
    `;
  }
}
