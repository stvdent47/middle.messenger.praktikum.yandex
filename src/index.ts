import { BlockConstructable, registerComponent } from 'core/registerComponents';
import { Button } from 'components-ui/Button';
import { ChatButton, ChatFeed, ChatMessage } from 'components-ui/Chat';
import { InputField } from 'components-ui/InputField';
import { Input } from 'components-ui/InputField/Input';
import { InputError } from 'components-ui/InputField/InputError';

import './index.css';

const components: BlockConstructable[] = [
  Button,
  ChatButton,
  ChatFeed,
  ChatMessage,
  InputField,
  Input,
  InputError,
];

components.forEach((Component) => {
  registerComponent(Component);
});
