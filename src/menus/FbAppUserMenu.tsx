import { Menu, Icon, SemanticICONS } from 'semantic-ui-react';
import { FbLink } from '../components';
import { makeUserProfileLink, makeUserPostsLink, makeUserAdvertsLink } from '../makeRoutes';
import * as c from '../constants';

interface AppUserMenuItem {
  name: string;
  href: string;
  label: string;
  iconName: SemanticICONS;
}

// NOTE: use only after mounting on client side
export function FbAppUserMenu({ username, activeItem = 'home' }) {
  //TODO: use i18n
  const items: AppUserMenuItem[] = [
    { name: 'home',    href: makeUserProfileLink({ username }), label: username,  iconName: c.userHomeIcon },
    { name: 'posts',   href: makeUserPostsLink({ username }),   label: 'Posts',   iconName: c.postIcon },
    { name: 'adverts', href: makeUserAdvertsLink({ username }), label: 'Adverts', iconName: c.advertIcon },
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
