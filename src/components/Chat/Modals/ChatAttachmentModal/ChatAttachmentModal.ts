import { Block } from 'core/Block';

type ChatAttachmentModalProps = {};

export class ChatAttachmentModal extends Block<ChatAttachmentModalProps> {
  static componentName: string = 'ChatAttachmentModal';
  constructor(props: ChatAttachmentModalProps) {
    super(props);
  }

  protected render(): string {
    return `
      <div class="chatAttachmentModal">foo</div>
    `;
  }
}
