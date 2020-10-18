import React from 'react';
import { Grid, Header, Icon } from 'semantic-ui-react'
import { Loading } from './Loading';
import { RandomImage } from './RandomImage';

export function Profile({ userState = null }) {
  const { data: user = null, loading = null, error = null } = userState ?? {};
  if (loading) return <Loading />
  if (!user) return <p>no user info</p>;
  const { id, username, first_name, last_name, email, phone } = user ?? {};
  let greet = first_name ?? username;
  return (
    <div className='fb-profile'>
      <Grid equal>
        <Grid.Column width={7}>
          <Header as='h3'>
            <RandomImage keywords='silhouette' w='96' h='96' circular wrapped={false} ui={true} label={null} /> Hi {greet}!
          </Header>  
        </Grid.Column>
        <Grid.Column width={8} textAlign='right'>
          <div className='fb-profile-row'><Header as='h3'>{first_name}&nbsp;{last_name}</Header></div>
          <div className='fb-profile-row'><Icon name='mobile alternate' /> <span>{phone}</span></div>
          <div className='fb-profile-row'><Icon name='mail' size='small' /> <span>{email}</span></div>
        </Grid.Column>
      </Grid>
    </div>
  );
}
