import { useContext } from 'react';
import { Container, Divider, Grid, Image, List } from 'semantic-ui-react';
import { FbFooterLinks } from '../content/FbFooterLinks';
import { FbI18nContext } from '../contexts';

export function FbFooter() {
  const { i18n } = useContext(FbI18nContext);
  return (
    <>
      <Container text textAlign='center' className='fb-footer-container'>
        <Image centered size='small' src='/assets/frenchbench-logo-small.png' />
        <p>{i18n._('common_love_your_neighbours')}</p>
        <div>&copy;{(new Date().getFullYear())} FrenchBench.org</div>
      </Container>
      
      <Divider />
      
      <Grid inverted divided stackable textAlign='center'>
        <Grid.Column only='computer' computer={2}>&nbsp;</Grid.Column>
        <Grid.Column mobile={16} tablet={8} computer={8}>
          <FbFooterLinks />
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
