import React from 'react';
import Head from 'next/head'
import Link from 'next/link';
import { Container, Dropdown, Icon, Image, Menu, Segment } from 'semantic-ui-react';
import { FbFooter } from './FbFooter';

// fixed menu at top. rendered on both client-side and server-side
export function PublicLayout({ title = '', containerClassName = 'fb-page', children }) {
  return (
    <>
      <Head>
        <title>{title} - FrenchBench</title>
      </Head>
      <Menu fixed='top' inverted>
        <Container>
          <Menu.Item header>
            <Link href='/'>
              <Image size='mini' src='/assets/frenchbench-logo-small.jpg' style={{ marginRight: '1.5em' }} />
            </Link>
            <Link href='/'>FrenchBench</Link>
          </Menu.Item>
          <Menu.Item header>
            <Link href='/s/i-need-help'>
              <span aria-label='I need help'>Need <Icon name='heart outline' color='yellow' /></span>
            </Link>
          </Menu.Item>
          <Menu.Item header>
            <Link href='/s/i-can-help'>
              <span aria-label='I can help'>Can <Icon name='heart' color='purple' /></span>
            </Link>
          </Menu.Item>

          <Dropdown item simple text='i'>
            <Dropdown.Menu>
              <Dropdown.Item>List Item</Dropdown.Item>
              <Dropdown.Item>List Item</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>List Item</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
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
