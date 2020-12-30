import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Menu, Icon } from 'semantic-ui-react';
import { FbSectionMyAdverts } from '../sections/FbSectionMyAdverts';
import { FbSectionMyHome } from '../sections/FbSectionMyHome';
import { FbSectionMyNeighbours } from '../sections/FbSectionMyNeighbours';
import { FbSectionMyNewAdvert } from '../sections/FbSectionMyNewAdvert';
import { FbSectionMyNewPost } from '../sections/FbSectionMyNewPost';
import { FbSectionMyPosts } from '../sections/FbSectionMyPosts';
import { FbSectionMySearchPostsByTag } from '../sections/FbSectionMySearchPostsByTag';
import { FbLink } from './FbLink';

// NOTE: use only after mounting on client side
export function FbProtectedMyMenu({ appConfig, section = 'home', api, currentUserState, i18n, tag = null, slug = null, articleId = null }) {
  const history = useHistory();

  const sections = [
    { name: 'home',       href: '/app/my/home',       label: ' ',        iconName: 'home' },
    { name: 'posts',      href: '/app/my/posts',      label: 'My Posts', iconName: 'write square' },
    { name: 'new-post',   href: '/app/my/new-post',   label: 'New', iconName: ['write square', 'add'] },
    { name: 'search',     href: '/app/my/search/posts-by-tag/help', label: ' ', iconName: 'search' },
    { name: 'adverts',    href: '/app/my/adverts',    label: 'My Adverts', iconName: 'newspaper' },
    { name: 'new-advert', href: '/app/my/new-advert', label: 'New', iconName: ['newspaper', 'add'] },
    { name: 'neighbours', href: '/app/my/neighbours', label: ' ', iconName: 'users' },
  ];

  const { data: user = null } = currentUserState ?? {};
  const { username = null } = user ?? {};
  
  const isFbAdmin = username && (username === 'frenchbench');
  if (isFbAdmin) { // TODO: special case for admin
    sections.push({ name: 'articles', href: '/app/my/articles', label: 'Articles', iconName: 'newspaper' });
  }

  const signout = async (ev) => {
    ev.preventDefault();
    const ignore = await api.signout();
    history.push('/');
  }

  let sectionContent = null;
  const commonProps = { api, currentUserState };
  switch (section) {
    case 'home':       sectionContent = <FbSectionMyHome             {...commonProps} />; break;
    case 'posts':      sectionContent = <FbSectionMyPosts            {...commonProps} />; break;
    case 'new-post':   sectionContent = <FbSectionMyNewPost          {...commonProps} />; break;
    case 'search':     sectionContent = <FbSectionMySearchPostsByTag {...commonProps} tag={tag} />; break;
    case 'adverts':    sectionContent = <FbSectionMyAdverts          {...commonProps} />; break;
    case 'new-advert': sectionContent = <FbSectionMyNewAdvert        {...commonProps} />; break;
    case 'neighbours': sectionContent = <FbSectionMyNeighbours       {...commonProps} />; break;
    case 'articles':
      if (articleId) {
        sectionContent = <FbSectionMyArticle {...commonProps} slug={slug} articleId={articleId} />;
      } else {
        sectionContent = <FbSectionMyArticles {...commonProps} />;
      }
      break;
    default:
      sectionContent = <div>page not found</div>;
      break;
  }

  return (
    <>
      <Menu secondary>
        {sections.map(({ name, href, iconName, label }) => (
          <Menu.Item key={name} name={name} active={section === name}>
            <FbLink to={href}>
              <span>
                {Array.isArray(iconName) ? (
                  <Icon.Group>
                    <Icon name={iconName[0]} />
                    <Icon corner name={iconName[1]} color='red' />
                  </Icon.Group>
                ) : (
                  <Icon name={iconName} />
                )}
                {label}
              </span>
            </FbLink>
          </Menu.Item>
        ))}
        <Menu.Item name='signout' onClick={signout}><Icon name='sign-out' color='black' /></Menu.Item>
      </Menu>
      <section>
        {sectionContent}
      </section>
    </>
  )
}
