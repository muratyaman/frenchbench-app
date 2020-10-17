import React from 'react';
import Head from 'next/head'
import Link from 'next/link';
import { Container, Dropdown, Icon, Image, Menu, Segment } from 'semantic-ui-react';
import { FbFooter } from './FbFooter';

// fixed menu at top. rendered on both client-side and server-side
export function PublicLayout({ title = '', containerClassName = 'fb-page', user = null, children }) {
  // TODO: based on user, show Login or username
  const { username = null } = user ?? {};
  const appLinkLabel = username ? String(username).substring(0, 5) + '...': 'Login';
  return (
    <>
      <Head>
        <title>{title} - FrenchBench</title>
      </Head>
      <Menu fixed='top' inverted>
        <Container>
          <Menu.Item>
            <Link href='/'>
              <Image size='mini' src='/assets/frenchbench-logo-small.jpg' style={{ marginRight: '1.5em' }} />
            </Link>
            <Link href='/'>FrenchBench</Link>
          </Menu.Item>
          <Menu.Item>
            <Link href='/info/i-need-help'>
              <span aria-label='I need help'>Need <Icon name='heart outline' color='purple' /></span>
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link href='/info/i-can-help'>
              <span aria-label='I can help'>Can <Icon name='heart' color='purple' /></span>
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link href='/app'>
              <span aria-label={appLinkLabel}>{appLinkLabel} <Icon name='key' color='purple' /></span>
            </Link>
          </Menu.Item>
        </Container>
      </Menu>

      <Container text style={{ marginTop: '3.5em' }} className={containerClassName}>
        {children}
      </Container>

      <Segment inverted vertical style={{ margin: '5em 0em 0em', padding: '5em 0em' }}>
        <FbFooter />
      </Segment>
    </>
  );
}
