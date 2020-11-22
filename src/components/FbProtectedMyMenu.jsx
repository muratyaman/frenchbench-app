import React from 'react';
import { useHistory } from 'react-router-dom';
import { Menu, Icon } from 'semantic-ui-react';
import { FbLink } from './FbLink';
import { FbSectionMyHome } from './FbSectionMyHome';
import { FbSectionMyPosts } from './FbSectionMyPosts';
import { FbSectionMyNewPost } from './FbSectionMyNewPost';
import { FbSectionMySearchPostsByTag } from './FbSectionMySearchPostsByTag';
import { FbSectionMyNeighbours } from './FbSectionMyNeighbours';
import { FbSectionMyArticle } from './FbSectionMyArticle';
import { FbSectionMyArticles } from './FbSectionMyArticles';

export function FbProtectedMyMenu({ section = 'home', api, currentUserState, i18n, tag = null, slug = null, articleId = null }) {
  const history = useHistory();
  const sections = [
    { name: 'home',       href: '/app/my/home',       label: ' ',        iconName: 'home' },
    { name: 'posts',      href: '/app/my/posts',      label: 'My Posts', iconName: 'write square' },
    { name: 'new-post',   href: '/app/my/new-post',   label: 'New Post', iconName: 'newspaper' },
    { name: 'search',     href: '/app/my/search/posts-by-tag/help', label: ' ', iconName: 'search' },
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
            <FbLink to={href}><span><Icon name={iconName} /> {label}</span></FbLink>
          </Menu.Item>
        ))}
        {/*<Menu.Item><Input icon='search' placeholder='Search...' /></Menu.Item>*/}
        <Menu.Item name='signout' onClick={signout}><Icon name='sign-out' color='red' /></Menu.Item>
      </Menu>
      <section>
        {sectionContent}
      </section>
    </>
  )
}
