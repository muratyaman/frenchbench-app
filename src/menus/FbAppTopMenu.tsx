import React from 'react';
import { Image, Menu } from 'semantic-ui-react';
import { FbIcon, FbLink, FbProfileLink } from '../components';
import { FbWebSocketStatus } from '../webSockets';
import { FbGeoLocationStatus } from '../geoLocation';

export function FbAppTopMenu({ currentUserState, i18n, activeItem = '' }) {
  const profileProps = { currentUserState, i18n };
  return (
    <Menu fixed='top' compact>
      <Menu.Item name='home' active={activeItem === 'home'} className='fb-header-logo'>
        <FbLink to='/app'>
          <Image size='mini' src='/assets/frenchbench-logo-mini.png' />
        </FbLink>
      </Menu.Item>
      <Menu.Item name='my' active={activeItem === 'my'}>
        <FbProfileLink {...profileProps} />
      </Menu.Item>
      <Menu.Item name='my-new-post' active={activeItem === 'my-new-post'}>
        <FbLink to='/app/my/new-post'>
          <span aria-label={i18n._('common_new_post')}>
            <FbIcon iconName={['heart', 'plus']} color='purple' cornerColor='black' />
          </span>
        </FbLink>
      </Menu.Item>
      <Menu.Item name='location'>
        <FbGeoLocationStatus />
      </Menu.Item>
      <Menu.Item name='websocket'>
        <FbWebSocketStatus />
      </Menu.Item>
    </Menu>
  );
}
