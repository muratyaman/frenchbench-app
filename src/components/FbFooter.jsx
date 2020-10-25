import React from 'react';
import Link from 'next/link';
import { Container, Divider, Grid, Header, Image, List } from 'semantic-ui-react';
import { FbAccordion } from './FbAccordion';

function FbFooterGrid() {
  return (
    <Grid inverted divided stackable textAlign='center'>
      <Grid.Column only='computer' computer={2}>&nbsp;</Grid.Column>
      <Grid.Column mobile={16} tablet={8} computer={4}>
        <Header as='h4' content='Legal stuff' />
        <List link>
          <List.Item><Link href='/info/article/terms'>Terms of Service</Link></List.Item>
          <List.Item><Link href='/info/article/privacy'>Privacy Policy</Link></List.Item>
        </List>
      </Grid.Column>
      <Grid.Column mobile={16} tablet={8} computer={4}>
        <Header as='h4' content='More Information' />
        <List link>
          <List.Item><Link href='/info/article/about'>About Us</Link></List.Item>
          <List.Item><Link href='/info/article/contact'>Contact Us</Link></List.Item>
        </List>
      </Grid.Column>
      <Grid.Column mobile={16} tablet={16} computer={4}>
        <Header as='h4' content='Community Spirit' />
        <p>Love your neighbours.</p>
      </Grid.Column>
      <Grid.Column only='computer' computer={2}>&nbsp;</Grid.Column>
    </Grid>
  )
}

export function FbFooter({ accordion = false }) {
  let footerLinks = <>
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
    <>
    <Container text textAlign='center' className='fb-footer-container'>
      <Image centered size='small' src='/assets/frenchbench-logo-small.png' />
    </Container>
    
    <Divider />
    {footerLinks}

    <Container text textAlign='center' className='fb-footer-container'>  
      <List horizontal divided link size='small'>
        <List.Item>
          Thanks to <a href='https://unsplash.com/' title='unsplash.com'>Unsplash.com</a> and <a href='https://placeholder.com/' title='placeholder.com'>Placeholder.com</a>
        </List.Item>
      </List>
      <List horizontal divided link size='small'>
        <List.Item><span>&copy;{(new Date().getFullYear())} FrenchBench.org</span></List.Item>
      </List>
    </Container>
    </>
  );
}
