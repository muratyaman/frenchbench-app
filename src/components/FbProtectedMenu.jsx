import React from 'react';
import Link from 'next/link';
import { Menu, Icon } from 'semantic-ui-react';
import { PostSummaryList } from './PostSummaryList';

export function FbProtectedMenu({ section = 'home', api }) {
  const sections = [
    { name: 'home',  href: '/app',          label: 'Home',  iconName: 'home' },
    { name: 'posts', href: '/app/my/posts', label: 'Posts', iconName: 'write square' },
    { name: 'ads',   href: '/app/my/ads',   label: 'Ads',   iconName: 'newspaper' },
  ];
  const logout = (ev) => {
    // do something, clear cookie, go to home page
  }
  return (
    <>
      <Menu secondary>
        {sections.map(({ name, href, iconName, label }, idx) => (
          <Menu.Item key={name} name={name} active={section === name}>
            <Link href={href}><span><Icon name={iconName} /> {label}</span></Link>
          </Menu.Item>
        ))}
        {/*<Menu.Item><Input icon='search' placeholder='Search...' /></Menu.Item>*/}
        <Menu.Item name='logout' onClick={logout}><Icon name='sign-out' /></Menu.Item>
      </Menu>
      <section>
        {(section === 'posts') && <PostSummaryList posts={[]} />}
      </section>
    </>
  )
}
