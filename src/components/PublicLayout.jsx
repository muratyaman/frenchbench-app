import React from 'react';
import Head from 'next/head'
import Link from 'next/link';
import { Container, Divider, Dropdown, Grid, Header, Icon, Image, List, Menu, Segment } from 'semantic-ui-react';

// fixed menu at top
export function PublicLayout({ title = '', children }) {
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
            <Link href='/i-need-help'>
              <span aria-label='I need help'>Need <Icon name='heart outline' color='white' /></span>
            </Link>
          </Menu.Item>
          <Menu.Item header>
            <Link href='/i-can-help'>
              <span aria-label='I can help'>Can <Icon name='heart' color='red' /></span>
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

      <Container text style={{ marginTop: '3.5em' }}>
        {children}
      </Container>

      <Segment inverted vertical style={{ margin: '5em 0em 0em', padding: '5em 0em' }}>
        <Container textAlign='center'>
          <Grid divided inverted stackable>
            <Grid.Column width={4}>
              <Header inverted as='h4' content='Legal stuff' />
              <List link inverted>
                <List.Item><Link href='/terms'>Terms of Service</Link></List.Item>
                <List.Item><Link href='/privacy'>Privacy Policy</Link></List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={4}>
              <Header inverted as='h4' content='More Information' />
              <List link inverted>
                <List.Item><Link href='/about'>About Us</Link></List.Item>
                <List.Item><Link href='/contact'>Contact Us</Link></List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={4}>
              <Header inverted as='h4' content='Footer Header' />
              <p>
                Extra space for a call to action inside the footer that could help re-engage users.
              </p>
            </Grid.Column>
          </Grid>

          <Divider inverted section />
          <Image centered size='small' src='/assets/frenchbench-logo-small.jpg' />
          <List horizontal inverted divided link size='small'>
            <List.Item><span>&copy;{(new Date().getFullYear())} FrenchBench</span></List.Item>
          </List>
        </Container>
      </Segment>
    </>
  );
}
