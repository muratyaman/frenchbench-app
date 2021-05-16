import { Image, Menu } from 'semantic-ui-react';
import { FbLink, FbLocaleSwitch } from '../components';

export function FbPublicBottomMenu(props) {
  return (
    <Menu secondary>
      <Menu.Item name='home'>
        <FbLink to='/'><Image size='mini' src='/assets/frenchbench-logo-mini.png' /></FbLink>
      </Menu.Item>
      <Menu.Menu position='right'>
        <FbLocaleSwitch />
      </Menu.Menu>
    </Menu>
  );
}
