import React from 'react';
import { Grid, Header, Icon } from 'semantic-ui-react'
import { FbRandomImage } from '../components';

export function FbUserProfile({ user }) {
  if (!user) return <p>no user info</p>;

  const { id, username, first_name, last_name, email, phone } = user ?? {};
  const imgProps = { keywords: 'silhouette', w: 96, h: 96, circular: true, wrapped: false, ui: true, label: null };
  
  return (
    <div className='fb-profile'>
      <Grid>
        <Grid.Column width={10}>
          <Header as='h3'><FbRandomImage {...imgProps} /></Header>
          <div className='fb-profile-row'><Header as='h3'>{first_name ?? 'no name'}&nbsp;{last_name ?? 'no surname'}</Header></div>
          <div className='fb-profile-row'><Icon name='mobile alternate' /> <span>{phone ?? 'no phone number'}</span></div>
          <div className='fb-profile-row'><Icon name='mail' size='small' /> <span>{email ?? 'no email address'}</span></div>
        </Grid.Column>
        <Grid.Column width={6} textAlign='right'>
          <div><Icon name='globe' /> Website.com</div>
          <div><Icon name='facebook' /> Facebook.com</div>
          <div><Icon name='instagram' /> Instagram.com</div>
          <div><Icon name='twitter' /> Twitter.com</div>
          <div><Icon name='linkedin' /> LinkedIn.com</div>
          <div><Icon name='youtube' /> YouTube.com</div>
        </Grid.Column>
      </Grid>
    </div>
  );
}
