import React from 'react';
import { FbLink } from './FbLink';
import { Container, Divider, Grid, Header, Image, List } from 'semantic-ui-react';
import { FbAccordion } from './FbAccordion';

export function FbFooterGrid() {
  return (
    <Grid inverted divided stackable textAlign='center'>
      <Grid.Column only='computer' computer={2}>&nbsp;</Grid.Column>
      <Grid.Column mobile={16} tablet={8} computer={8}>
        <Header as='h4' content='Legal stuff' />
        <List link>
          <List.Item><FbLink to='/info/article/terms'>Terms of Service</FbLink></List.Item>
          <List.Item><FbLink to='/info/article/privacy'>Privacy Policy</FbLink></List.Item>
        </List>
      </Grid.Column>
      <Grid.Column mobile={16} tablet={8} computer={8}>
        <Header as='h4' content='More Information' />
        <List link>
          <List.Item><FbLink to='/info/article/about'>About Us</FbLink></List.Item>
          <List.Item><FbLink to='/info/article/contact'>Contact Us</FbLink></List.Item>
        </List>
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
        <p>Love your neighbours.</p>
        <div>&copy;{(new Date().getFullYear())} FrenchBench.org</div>
      </Container>
      
      <Divider />
      {footerLinks}
      <Container text textAlign='center' className='fb-footer-container'>
        <List horizontal divided link size='small'>
          <List.Item>
            Thanks to <a href='https://unsplash.com/' title='unsplash.com'>Unsplash.com</a> and <a href='https://placeholder.com/' title='placeholder.com'>Placeholder.com</a>
          </List.Item>
        </List>
      </Container>
    </>
  );
}
