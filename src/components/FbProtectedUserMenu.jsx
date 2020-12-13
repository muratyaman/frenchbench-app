import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { FbLink } from './FbLink';
import { FbSectionUserHome } from './FbSectionUserHome';
import { FbSectionUserPost } from './FbSectionUserPost';
import { FbSectionUserPosts } from './FbSectionUserPosts';
import { FbSectionUserAdvert } from './FbSectionUserAdvert';
import { FbSectionUserAdverts } from './FbSectionUserAdverts';

// NOTE: use only after mounting on client side
export function FbProtectedUserMenu({ username, section = 'home', api, userState, post_ref = null, advert_ref = null }) {
  const sections = [
    { name: 'home',  href: `/app/user/${username}`,       label: username, iconName: 'user circle' },
    { name: 'posts', href: `/app/user/${username}/posts`, label: 'Posts',  iconName: 'write square' },
    { name: 'adverts', href: `/app/user/${username}/adverts`, label: 'Adverts',  iconName: 'newspaper' },
  ];
  
  let sectionContent = null;
  const commonProps = { api, userState, username };
  switch (section) {
    case 'home':
      sectionContent = <FbSectionUserHome {...commonProps} />;
      break;
    case 'posts':
      if (post_ref) {
        sectionContent = <FbSectionUserPost {...commonProps} post_ref={post_ref} />;
      } else {
        sectionContent = <FbSectionUserPosts {...commonProps} />;
      }
      break;
    case 'adverts':
      if (advert_ref) {
        sectionContent = <FbSectionUserAdvert {...commonProps} advert_ref={advert_ref} />;
      } else {
        sectionContent = <FbSectionUserAdverts {...commonProps} />;
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
            <FbLink to={href}><span><Icon name={iconName} /> {label}</span></FbLink>
          </Menu.Item>
        ))}
      </Menu>
      <section>
        {sectionContent}
      </section>
    </>
  )
}
