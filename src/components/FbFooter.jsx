import React from 'react';
import Link from 'next/link';
import { Container, Divider, Grid, Header, Image, List } from 'semantic-ui-react';
import { FbAccordion } from './FbAccordion';

function FbFooterGrid() {
  return (
    <Grid divided stackable>
      <Grid.Column mobile={16} tablet={8} computer={4}>
        <Header as='h4' content='Legal stuff' />
        <List link>
          <List.Item><Link href='/info/article/terms'>Terms of Service</Link></List.Item>
          <List.Item><Link href='/info/article/privacy'>Privacy Policy</Link></List.Item>
        </List>
      </Grid.Column>
      <Grid.Column mobile={16} tablet={8} computer={4}>
        <Header inverted as='h4' content='More Information' />
        <List link>
          <List.Item><Link href='/info/article/about'>About Us</Link></List.Item>
          <List.Item><Link href='/info/article/contact'>Contact Us</Link></List.Item>
        </List>
      </Grid.Column>
      <Grid.Column mobile={16} tablet={16} computer={7}>
        <Header as='h4' content='Footer Header' />
        <p>
          Extra space for a call to action inside the footer that could help re-engage users.
        </p>
      </Grid.Column>
    </Grid>
  )
}

export function FbFooter({ accordion = false }) {
  let footerLinks = <>
    <Divider section />
    <FbFooterGrid />
  </>;
  if (accordion) {
    const titles = [
      'More information',
    ];
    const contents = [
      <FbFooterGrid />,
    ];
    footerLinks = (
      <FbAccordion titles={titles} contents={contents} fluid styled />
    );
  }
  return (
    <Container textAlign='center'>
      <Divider section />
      <Image centered size='small' src='/assets/frenchbench-logo-small.jpg' />
      <List horizontal divided link size='small'>
        <List.Item><span>&copy;{(new Date().getFullYear())} FrenchBench</span></List.Item>
      </List>
      {footerLinks}
    </Container>
  );
}
