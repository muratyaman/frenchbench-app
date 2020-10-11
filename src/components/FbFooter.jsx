import React from 'react';
import Link from 'next/link';
import { Container, Divider, Grid, Header, Image, List } from 'semantic-ui-react';

export function FbFooter(props) {
  return (
    <Container textAlign='center'>
      <Grid divided inverted stackable>
        <Grid.Column width={4}>
          <Header inverted as='h4' content='Legal stuff' />
          <List link inverted>
            <List.Item><Link href='/s/article/terms'>Terms of Service</Link></List.Item>
            <List.Item><Link href='/s/article/privacy'>Privacy Policy</Link></List.Item>
          </List>
        </Grid.Column>
        <Grid.Column width={4}>
          <Header inverted as='h4' content='More Information' />
          <List link inverted>
            <List.Item><Link href='/s/article/about'>About Us</Link></List.Item>
            <List.Item><Link href='/s/article/contact'>Contact Us</Link></List.Item>
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
  );
}
