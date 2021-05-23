import { FC, PropsWithChildren } from 'react';
import { Grid, Header, Icon } from 'semantic-ui-react'
import { FbLinkExt, FbRandomImage } from '../components';
import { FbEditable } from '../components/FbEditable';
import { facebookIcon, globeIcon, instagramIcon, linkedinIcon, twitterIcon, youtubeIcon } from '../constants';
import { ApiClient, UserModel } from '../utils';

export interface FbUserProfileProps {
  api: ApiClient;
  user: UserModel;
  editable?: boolean;
  afterEdit?: () => void;
}

export const FbUserProfile: FC<FbUserProfileProps> = (props: PropsWithChildren<FbUserProfileProps>) => {
  const { user, api, editable = false, afterEdit } = props;
  if (!user) {
    console.warn('FbUserProfile, NO USER INFO');
    return <p>no user info</p>;
  }

  const { id, username, first_name, last_name, email, phone_mobile,
    link_website, link_facebook, link_instagram, link_twitter, link_linkedin, link_youtube,
  } = user ?? {};
  const imgProps = { keywords: 'silhouette', w: 96, h: 96, circular: true, wrapped: false, ui: true, label: null };
  
  const editables = [
    { color: 'blue', icon: globeIcon, field: 'link_website', initialValue: link_website, placeHolder: 'Website', onSubmit: async (value) => {
      const res = await api.userfield_update_self({ field: 'link_website', value });
      if (res.data && afterEdit) afterEdit();
      return res.data;
    }},
    { icon: facebookIcon, field: 'link_facebook', initialValue: link_facebook, placeHolder: 'Facebook', onSubmit: async (value) => {
      const res = await api.userfield_update_self({ field: 'link_facebook', value });
      if (res.data && afterEdit) afterEdit();
      return res.data;
    }},
    { icon: instagramIcon, field: 'link_instagram', initialValue: link_instagram, placeHolder: 'Instagram', onSubmit: async (value) => {
      const res = await api.userfield_update_self({ field: 'link_instagram', value });
      if (res.data && afterEdit) afterEdit();
      return res.data;
    }},
    { icon: twitterIcon, field: 'link_twitter', initialValue: link_twitter, placeHolder: 'Twitter', onSubmit: async (value) => {
      const res = await api.userfield_update_self({ field: 'link_twitter', value });
      if (res.data && afterEdit) afterEdit();
      return res.data;
    }},
    { icon: linkedinIcon, field: 'link_linkedin', initialValue: link_linkedin, placeHolder: 'LinkedIn', onSubmit: async (value) => {
      const res = await api.userfield_update_self({ field: 'link_linkedin', value });
      if (res.data && afterEdit) afterEdit();
      return res.data;
    }},
    { icon: youtubeIcon, field: 'link_youtube', initialValue: link_youtube, placeHolder: 'Youtube', onSubmit: async (value) => {
      const res = await api.userfield_update_self({ field: 'link_youtube', value });
      if (res.data && afterEdit) afterEdit();
      return res.data;
    }},
  ];

  return (
    <div className='fb-profile'>
      <Grid>
        <Grid.Column width={8}>
          <Header as='h3'><FbRandomImage {...imgProps} /></Header>
          <div className='fb-profile-row'>
            <Header as='h3'>{first_name ?? 'no first name'}&nbsp;{last_name ?? 'no last name'}</Header>
          </div>
          <div className='fb-profile-row'>
            <Icon name='mobile alternate' /> <span>{phone_mobile ?? 'no phone number'}</span>
          </div>
          <div className='fb-profile-row'>
            <Icon name='mail' size='small' /> <span>{email ?? 'no email address'}</span>
          </div>
        </Grid.Column>

        <Grid.Column width={8} textAlign='right'>
          {!editable ? editables.map(({ icon, field, initialValue, placeHolder }) => (
            <div key={`${field}`} className='fb-user-profile-info-row'>
              <Icon name={icon} /> <span className='fb-user-profile-info-view'> {
                initialValue ? <FbLinkExt href={initialValue} target='_blank' alt={`link to ${placeHolder}`}>{initialValue}</FbLinkExt> : '-'
              }</span>
            </div>
          )): null}
          {editable ? editables.map(({ icon, field, initialValue, placeHolder, onSubmit }) => (
            <div key={`${field}`} className={`fb-user-profile-info-row fb-editable-row fb-user-${field}`}>
              <Icon name={icon} />
              <FbEditable initialValue={initialValue} onSubmit={onSubmit} placeHolder={placeHolder}>
                <span className='fb-user-profile-info-view'> {
                  initialValue ? <FbLinkExt href={initialValue} target='_blank' alt={`link to ${placeHolder}`}>{initialValue}</FbLinkExt> : '-'
                } </span>
              </FbEditable>
            </div>
          )) : null}
        </Grid.Column>
      </Grid>
    </div>
  );
}
