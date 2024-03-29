import { Block } from './Block';

export function renderDOM(rootSelector: string, block: Block) {
  const root = document.querySelector(rootSelector);

  if (!root) {
    throw new Error('No root element is found');
  }

  root.replaceChildren(block.getContent());
}
