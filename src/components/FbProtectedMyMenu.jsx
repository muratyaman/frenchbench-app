import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Menu, Icon } from 'semantic-ui-react';
import { FbSectionMyHome } from './FbSectionMyHome';
import { FbSectionMyPosts } from './FbSectionMyPosts';
import { FbSectionMyNewPost } from './FbSectionMyNewPost';

export function FbProtectedMyMenu({ section = 'home', api, currentUserState }) {
  const sections = [
    { name: 'home',     href: '/app/my/home',     label: 'Home',        iconName: 'home' },
    { name: 'posts',    href: '/app/my/posts',    label: 'My Posts',    iconName: 'write square' },
    { name: 'new-post', href: '/app/my/new-post', label: 'My New Post', iconName: 'newspaper' },
  ];
  const signout = async (ev) => {
    ev.preventDefault();
    const ignore = await api.signout();
    Router.push('/');
  }
  let sectionContent = null;
  switch (section) {
    case 'home':     sectionContent = <FbSectionMyHome    api={api} currentUserState={currentUserState} />; break;
    case 'posts':    sectionContent = <FbSectionMyPosts   api={api} currentUserState={currentUserState} />; break;
    case 'new-post': sectionContent = <FbSectionMyNewPost api={api} currentUserState={currentUserState} />; break;
    default:         sectionContent = <div>page not found</div>;
  }
  return (
    <>
      <Menu secondary>
        {sections.map(({ name, href, iconName, label }) => (
          <Menu.Item key={name} name={name} active={section === name}>
            <Link href={href}><span><Icon name={iconName} /> {label}</span></Link>
          </Menu.Item>
        ))}
        {/*<Menu.Item><Input icon='search' placeholder='Search...' /></Menu.Item>*/}
        <Menu.Item name='signout' onClick={signout}><Icon name='sign-out' /></Menu.Item>
      </Menu>
      <section>
        {sectionContent}
      </section>
    </>
  )
}
