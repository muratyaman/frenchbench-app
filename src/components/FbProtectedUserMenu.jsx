import React from 'react';
import Link from 'next/link';
import { Menu, Icon } from 'semantic-ui-react';
import { FbSectionUserHome } from './FbSectionUserHome';
import { FbSectionUserPost } from './FbSectionUserPost';
import { FbSectionUserPosts } from './FbSectionUserPosts';

export function FbProtectedUserMenu({ username, section = 'home', api, userState, post_ref = null }) {
  const sections = [
    { name: 'home',  href: `/app/user/${username}`,       label: username, iconName: 'user circle' },
    { name: 'posts', href: `/app/user/${username}/posts`, label: 'Posts',  iconName: 'write square' },
  ];
  
  let sectionContent = null;
  switch (section) {
    case 'home':
      sectionContent = <FbSectionUserHome api={api} userState={userState} />;
      break;
    case 'posts':
      if (post_ref) {
        sectionContent = <FbSectionUserPost api={api} userState={userState} username={username} post_ref={post_ref} />;
      } else {
        sectionContent = <FbSectionUserPosts api={api} userState={userState} username={username} />;
      }
      break;
    default:
      sectionContent = <div>page not found</div>;
  }
  return (
    <>
      <Menu secondary>
        {sections.map(({ name, href, iconName, label }) => (
          <Menu.Item key={name} name={name} active={section === name}>
            <Link href={href}><span><Icon name={iconName} /> {label}</span></Link>
          </Menu.Item>
        ))}
      </Menu>
      <section>
        {sectionContent}
      </section>
    </>
  )
}
