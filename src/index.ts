import { BlockConstructable, registerComponent } from 'core/registerComponents';
import { Header } from 'components-ui/Header';
import { Button } from 'components-ui/Button';
import { InputField } from 'components-ui/InputField';

import './index.css';

const components: BlockConstructable[] = [Header, Button, InputField];

components.forEach((Component) => {
  registerComponent(Component);
});
