import React, { useState } from 'react';
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
import { GeoLocationContextProvider } from './GeoLocationContext';
import { FbGeoLocationStatus } from './FbGeoLocationStatus';
import { WebSocketContextProvider } from './WebSocketContext';
import { FbWebSocketStatus } from './FbWebSocketStatus';

// NOTE: use only after mounting on client side
export function FbProtectedMyMenu({ appConfig, section = 'home', api, currentUserState, i18n, tag = null, slug = null, articleId = null }) {
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

  // websocket
  const [wsMessages, setWsMessages] = useState([]); // TODO: use local storage?
  const appendWsMessage = (msgObj) => {
    setWsMessages([ ...wsMessages, msgObj ]);
  }
  const [wsSesId, setWsSesId] = useState(null); // TODO: use local storage?
  const onWsMessage = (msg) => {
    const msgObj = JSON.parse(msg);
    if (msgObj){
      if (msgObj.kind && (msgObj.kind === 'ses') && msgObj.ses) {
        setWsSesId(msgObj.ses);
      }
      // else ?
      appendWsMessage(msgObj);
    }
  }

  let sectionContent = null;
  const commonProps = { api, currentUserState, wsMessages };
  switch (section) {
    case 'home':       sectionContent = <FbSectionMyHome             {...commonProps} />; break;
    case 'posts':      sectionContent = <FbSectionMyPosts            {...commonProps} />; break;
    case 'new-post':   sectionContent = <FbSectionMyNewPost          {...commonProps} />; break;
    case 'search':     sectionContent = <FbSectionMySearchPostsByTag {...commonProps} tag={tag} />; break;
    case 'neighbours': sectionContent = <FbSectionMyNeighbours       {...commonProps} wsMessages={wsMessages} wsSesId={wsSesId} appendWsMessage={appendWsMessage} />; break;
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
    <GeoLocationContextProvider>
      <WebSocketContextProvider url={appConfig.ws.fullUrl} onMessage={onWsMessage}>
        <Menu secondary>
          {sections.map(({ name, href, iconName, label }) => (
            <Menu.Item key={name} name={name} active={section === name}>
              <FbLink to={href}><span><Icon name={iconName} /> {label}</span></FbLink>
            </Menu.Item>
          ))}
          <Menu.Item name='signout' onClick={signout}><Icon name='sign-out' color='black' /></Menu.Item>
          <Menu.Item name='location'><FbGeoLocationStatus /></Menu.Item>
          <Menu.Item name='websocket'><FbWebSocketStatus /></Menu.Item>
        </Menu>
        <section>
          {sectionContent}
        </section>
      </WebSocketContextProvider>
    </GeoLocationContextProvider>
  )
}
