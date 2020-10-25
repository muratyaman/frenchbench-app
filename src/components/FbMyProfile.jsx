import React from 'react';
import { Button, Grid, Header, Icon } from 'semantic-ui-react'
import { Loading } from './Loading';
import { RandomImage } from './RandomImage';

export function FbMyProfile({ currentUserState = null }) {
  const { data: user = null, loading = null, error = null } = currentUserState ?? {};
  if (loading) return <Loading />
  if (!user) return <p>no user info</p>;
  const { id, username, first_name, last_name, email, phone } = user ?? {};
  let greet = first_name ?? username;
  const imgProps = { keywords: 'silhouette', w: 96, h: 96, circular: true, wrapped: false, ui: true, label: null };
  return (
    <div className='fb-profile'>
      <Grid>
        <Grid.Column width={9}>
          <Header as='h3'><RandomImage {...imgProps} /> Hi {greet}!</Header>
          <p>This is your profile page</p>
          <div className='fb-profile-row'><Header as='h3'>{first_name}&nbsp;{last_name}</Header></div>
          <div className='fb-profile-row'><Icon name='mobile alternate' /> <span>{phone ?? 'no phone number'}</span></div>
          <div className='fb-profile-row'><Icon name='mail' size='small' /> <span>{email ?? 'no email' }</span></div>
        </Grid.Column>
        <Grid.Column width={7} textAlign='right'>
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
