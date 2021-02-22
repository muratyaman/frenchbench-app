import React from 'react';
import { Menu } from 'semantic-ui-react';
import { FbIcon, FbLink } from '../components';

// NOTE: use only after mounting on client side
export function FbAppMenu({ activeItem = 'home', i18n }) {
  const items = [
    { name: 'home',       href: '/app',            label: ' ',                         iconName: 'home' }, // home shows posts
    { name: 'posts',      href: '/app/posts',      label: i18n._('common_posts'),      iconName: 'write square' },
    { name: 'adverts',    href: '/app/adverts',    label: i18n._('common_adverts'),    iconName: 'newspaper' },
    { name: 'neighbours', href: '/app/neighbours', label: i18n._('common_neighbours'), iconName: 'users' },
  ];

  return (
    <Menu secondary>
      {items.map(({ name, href, iconName, label }) => (
        <Menu.Item key={name} name={name} active={activeItem === name}>
          <FbLink to={href}>
            <span><FbIcon iconName={iconName} />{label}</span>
          </FbLink>
        </Menu.Item>
      ))}
    </Menu>
  );
}
