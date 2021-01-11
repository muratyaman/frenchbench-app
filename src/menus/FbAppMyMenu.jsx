import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Menu, Icon } from 'semantic-ui-react';
import { FbIcon, FbLink } from '../components';
import { FbI18nContext } from '../contexts';

// NOTE: use only after mounting on client side
export function FbAppMyMenu({ activeItem = 'home', api, currentUserState }) {
  const history = useHistory();
  const { i18n } = useContext(FbI18nContext);

  const items = [
    { name: 'home',    href: '/app/my/home',    label: ' ',                      iconName: 'home' },
    { name: 'posts',   href: '/app/my/posts',   label: i18n.common_my_posts(),   iconName: 'write square' },
    { name: 'adverts', href: '/app/my/adverts', label: i18n.common_my_adverts(), iconName: 'newspaper' },
  ];

  const { data: user = null } = currentUserState ?? {};
  const { username = null } = user ?? {};
  
  const isFbAdmin = username && (username === 'frenchbench');
  if (isFbAdmin) { // TODO: special case for admin
    items.push({ name: 'articles', href: '/app/my/articles', label: i18n.common_my_articles(), iconName: 'newspaper' });
  }

  const signout = async (ev) => {
    ev.preventDefault();
    const ignore = await api.signout();
    history.push('/');
  }

  return (
    <Menu secondary>
      {items.map(({ name, href, iconName, label }) => (
        <Menu.Item key={name} name={name} active={activeItem === name}>
          <FbLink to={href}>
            <span><FbIcon iconName={iconName} />{label}</span>
          </FbLink>
        </Menu.Item>
      ))}
      <Menu.Item name='signout' onClick={signout}>
        <Icon name='sign-out' color='red' /> {i18n.common_sign_out()}
      </Menu.Item>
    </Menu>
  );
}
