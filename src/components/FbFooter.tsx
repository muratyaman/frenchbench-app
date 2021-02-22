import React from 'react';
import { FbLink } from './FbLink';
import { Container, Divider, Grid, Image, List } from 'semantic-ui-react';

export function FbFooter() {
  return (
    <>
      <Container text textAlign='center' className='fb-footer-container'>
        <Image centered size='small' src='/assets/frenchbench-logo-small.png' />
        <p>Love your neighbours.</p>
        <div>&copy;{(new Date().getFullYear())} FrenchBench.org</div>
      </Container>
      
      <Divider />
      
      <Grid inverted divided stackable textAlign='center'>
        <Grid.Column only='computer' computer={2}>&nbsp;</Grid.Column>
        <Grid.Column mobile={16} tablet={8} computer={8}>
          <FbLink to='/info/article/about'>About Us</FbLink>&nbsp;-&nbsp;
          <FbLink to='/info/article/contact'>Contact Us</FbLink>&nbsp;-&nbsp;
          <FbLink to='/info/article/terms'>Terms of Service</FbLink>&nbsp;-&nbsp;
          <FbLink to='/info/article/privacy'>Privacy Policy</FbLink>&nbsp;-&nbsp;
          <FbLink to='/info/article/safety'>Safety</FbLink>
        </Grid.Column>
        <Grid.Column only='computer' computer={2}>&nbsp;</Grid.Column>
      </Grid>

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
