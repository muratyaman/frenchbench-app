import { FC, PropsWithChildren } from 'react';
import { Checkbox, Grid, Header, Icon } from 'semantic-ui-react';
import { FbEditable, FbLinkExt, FbRandomImage } from '../components';
import * as _ from '../constants';
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

  const { id, username, is_volunteer,
    first_name, last_name, email, phone_mobile, headline, neighbourhood,
    link_website, link_facebook, link_instagram, link_twitter, link_linkedin, link_youtube,
  } = user ?? {};
  const imgProps = { keywords: 'silhouette', w: 96, h: 96, circular: true, wrapped: false, ui: true, label: null };
  
  const editables = [
    { icon: _.nameIcon, field: 'first_name', initialValue: first_name, placeHolder: 'First name', onSubmit: async (value) => {
      const res = await api.userfield_update_self({ field: 'first_name', value });
      if (res.data && afterEdit) afterEdit();
      return res.data;
    }},
    { icon: _.nameIcon, field: 'last_name', initialValue: last_name, placeHolder: 'Last name', onSubmit: async (value) => {
      const res = await api.userfield_update_self({ field: 'last_name', value });
      if (res.data && afterEdit) afterEdit();
      return res.data;
    }},
    { icon: _.emailIcon, field: 'email', initialValue: email, placeHolder: 'Email', onSubmit: async (value) => {
      const res = await api.userfield_update_self({ field: 'email', value });
      if (res.data && afterEdit) afterEdit();
      return res.data;
    }},
    { icon: _.mobileIcon, field: 'phone_mobile', initialValue: phone_mobile, placeHolder: 'Mobile phone', onSubmit: async (value) => {
      const res = await api.userfield_update_self({ field: 'phone_mobile', value });
      if (res.data && afterEdit) afterEdit();
      return res.data;
    }},
    { icon: _.headlineIcon, field: 'headline', initialValue: headline, placeHolder: 'Headline', onSubmit: async (value) => {
      const res = await api.userfield_update_self({ field: 'headline', value });
      if (res.data && afterEdit) afterEdit();
      return res.data;
    }},
    { icon: _.neighboursIcon, field: 'neighbourhood', initialValue: neighbourhood, placeHolder: 'Neighbourhood', onSubmit: async (value) => {
      const res = await api.userfield_update_self({ field: 'neighbourhood', value });
      if (res.data && afterEdit) afterEdit();
      return res.data;
    }},
  ];
  const onSubmitVolunteer = async (value) => {
    const res = await api.userfield_update_self({ field: 'is_volunteer', value });
    if (res.data && afterEdit) afterEdit();
    return res.data;
  };

  const editables2 = [
    { icon: _.globeIcon, field: 'link_website', initialValue: link_website, placeHolder: 'Website', onSubmit: async (value) => {
      const res = await api.userfield_update_self({ field: 'link_website', value });
      if (res.data && afterEdit) afterEdit();
      return res.data;
    }},
    { icon: _.facebookIcon, field: 'link_facebook', initialValue: link_facebook, placeHolder: 'Facebook', onSubmit: async (value) => {
      const res = await api.userfield_update_self({ field: 'link_facebook', value });
      if (res.data && afterEdit) afterEdit();
      return res.data;
    }},
    { icon: _.instagramIcon, field: 'link_instagram', initialValue: link_instagram, placeHolder: 'Instagram', onSubmit: async (value) => {
      const res = await api.userfield_update_self({ field: 'link_instagram', value });
      if (res.data && afterEdit) afterEdit();
      return res.data;
    }},
    { icon: _.twitterIcon, field: 'link_twitter', initialValue: link_twitter, placeHolder: 'Twitter', onSubmit: async (value) => {
      const res = await api.userfield_update_self({ field: 'link_twitter', value });
      if (res.data && afterEdit) afterEdit();
      return res.data;
    }},
    { icon: _.linkedinIcon, field: 'link_linkedin', initialValue: link_linkedin, placeHolder: 'LinkedIn', onSubmit: async (value) => {
      const res = await api.userfield_update_self({ field: 'link_linkedin', value });
      if (res.data && afterEdit) afterEdit();
      return res.data;
    }},
    { icon: _.youtubeIcon, field: 'link_youtube', initialValue: link_youtube, placeHolder: 'Youtube', onSubmit: async (value) => {
      const res = await api.userfield_update_self({ field: 'link_youtube', value });
      if (res.data && afterEdit) afterEdit();
      return res.data;
    }},
  ];

  return (
    <div className='fb-profile'>
      <Grid>
        <Grid.Column width={8}>
          { !editable ? (
            <>
              <Header as='h3'><FbRandomImage {...imgProps} /></Header>
              <div className='fb-profile-row'>
                <Header as='h3'>{first_name ?? 'no first name'}&nbsp;{last_name ?? 'no last name'}</Header>
              </div>
              <div className='fb-profile-row'>
                <Icon name={_.emailIcon} size='small' /> <span>{email ?? 'no email address'}</span>
              </div>
              <div className='fb-profile-row'>
                <Icon name={_.mobileIcon} /> <span>{phone_mobile ?? 'no phone number'}</span>
              </div>
              <div className='fb-profile-row'>
                <Icon name={_.headlineIcon} size='small' /> <span>{headline ?? 'no headline'}</span>
              </div>
              <div className='fb-profile-row'>
                <Icon name={_.neighbourhoodIcon} size='small' /> <span>{neighbourhood ?? 'no neighbourhood'}</span>
              </div>
              <div className='fb-profile-row'>
                <Icon name={_.volunteerIcon} size='small' /> <span>{is_volunteer ? '' : 'Not'} Volunteering</span>
              </div>
            </>
          ) : (
            <>
              {editables.map(({ icon, field, initialValue, placeHolder, onSubmit }) => (
                <div key={`${field}`} className={`fb-user-profile-info-row fb-editable-row fb-user-${field}`}>
                  <Icon name={icon} />
                  <FbEditable initialValue={initialValue} onSubmit={onSubmit} placeHolder={placeHolder}>
                    <span className='fb-user-profile-info-view'> {
                      initialValue ? <span>{initialValue}</span> : '-'
                    } </span>
                  </FbEditable>
                </div>
              ))}
              <div className='fb-user-profile-info-row fb-editable-row fb-user-is_volunteer'>
                <Icon name={_.volunteerIcon} />
                <FbEditable initialValue={String(is_volunteer)} onSubmit={onSubmitVolunteer} placeHolder='Volunteer'
                  renderEdit={({ isEditing, isUpdating, value, setValue }) => (
                    <Checkbox label='Volunteer?' defaultChecked={parseInt(value) > 0} disabled={!isEditing} loading={isUpdating} value='1'
                    onChange={(ev, { checked }) => setValue(checked ? '1' : '0')} />
                  )}>
                  <span className='fb-user-profile-info-view'> {
                    <span>{is_volunteer ? '' : 'Not'} Volunteer</span>
                  } </span>
                </FbEditable>
              </div>
            </>
          )}
        </Grid.Column>

        <Grid.Column width={8} textAlign='right'>
          {!editable ? editables2.map(({ icon, field, initialValue, placeHolder }) => (
            <div key={`${field}`} className='fb-user-profile-info-row'>
              <Icon name={icon} /> <span className='fb-user-profile-info-view'> {
                initialValue ? <FbLinkExt href={initialValue} target='_blank' alt={`link to ${placeHolder}`}>{initialValue}</FbLinkExt> : '-'
              }</span>
            </div>
          )): null}
          {editable ? editables2.map(({ icon, field, initialValue, placeHolder, onSubmit }) => (
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
