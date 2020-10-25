import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Container, Icon, Image, Menu, Segment } from 'semantic-ui-react';
import { FbFooter } from './FbFooter';
import { FbProfileLink } from './FbProfileLink';

// fixed menu at top. rendered on both client-side and server-side
export function PublicLayout(props) {
  const { title = '', containerClassName = 'fb-page', currentUserState = null, children } = props;
  return (
    <>
      <Head>
        <title>{title} - FrenchBench</title>
      </Head>
      <Menu fixed='top' compact>
        <Menu.Item className='fb-header-logo'>
          <Link href='/'><Image size='mini' src='/assets/frenchbench-logo-mini.png' /></Link>
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
          <FbProfileLink currentUserState={currentUserState} />
        </Menu.Item>
      </Menu>

      <div className={containerClassName}>
        {children}
      </div>

      <FbFooter />
    </>
  );
}
