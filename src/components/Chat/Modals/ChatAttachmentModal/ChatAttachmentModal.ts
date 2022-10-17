import { Block } from 'core/Block';

type ChatAttachmentModalProps = {};

export class ChatAttachmentModal extends Block<ChatAttachmentModalProps> {
  static componentName: string = 'ChatAttachmentModal';

  protected render(): string {
    return `
      <div class="chatAttachmentModal">foo</div>
    `;
  }
}
