import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { FbLink } from '../components';
import { makeUserProfileLink, makeUserPostsLink, makeUserAdvertsLink } from '../makeRoutes';

// NOTE: use only after mounting on client side
export function FbAppUserMenu({ username, activeItem = 'home' }) {
  const items = [
    { name: 'home',    href: makeUserProfileLink({ username }), label: username,  iconName: 'user circle' },
    { name: 'posts',   href: makeUserPostsLink({ username }),   label: 'Posts',   iconName: 'write square' },
    { name: 'adverts', href: makeUserAdvertsLink({ username }), label: 'Adverts', iconName: 'newspaper' },
  ];
  
  return (
    <>
      <Menu secondary>
        {items.map(({ name, href, iconName, label }) => (
          <Menu.Item key={name} name={name} active={activeItem === name}>
            <FbLink to={href}><span><Icon name={iconName} /> {label}</span></FbLink>
          </Menu.Item>
        ))}
      </Menu>
    </>
  )
}
