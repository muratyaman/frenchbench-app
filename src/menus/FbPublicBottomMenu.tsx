import React from 'react';
import { Button, Dropdown, Image, Menu } from 'semantic-ui-react';
import { FbLink, FbLocaleSwitch } from '../components';

export function FbPublicBottomMenu({ activeItem = 'home', onClick = () => {} }) {
  return (
    <>
      
      <Menu secondary>
        <Menu.Item
          name='home'
          active={activeItem === 'home'}
          onClick={onClick}
        >
          <FbLink to='/app'><Image size='mini' src='/assets/frenchbench-logo-mini.png' /></FbLink>
        </Menu.Item>
        <Menu.Item
          name='messages'
          active={activeItem === 'messages'}
          onClick={onClick}
        />

        <Menu.Menu position='right'>
          <FbLocaleSwitch />
          <Dropdown item text='Language'>
            <Dropdown.Menu>
              <Dropdown.Item>English</Dropdown.Item>
              <Dropdown.Item>Russian</Dropdown.Item>
              <Dropdown.Item>Spanish</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Menu.Item>
            <Button primary>Sign Up</Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </>
  );
}
