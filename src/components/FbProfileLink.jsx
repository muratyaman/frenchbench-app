import React from 'react';
import { Icon } from 'semantic-ui-react';
import { FbLink } from './FbLink';

export function FbProfileLink({ i18n, currentUserState = null }) {
  const { data: user = null, loading = false, error = null } = currentUserState ?? {};
  const { username = null } = user ?? {};
  let ariaLabel = i18n.account_sign_in();
  let appLinkLabel = ariaLabel;
  let appLinkUrl = '/info/sign-in', iconName = 'sign-in', iconColour = 'purple';
  if (loading) {
    appLinkLabel = '...';
    iconName = 'spinner';
  }
  if (username) {
    ariaLabel = 'Signed in as ' + username;
    appLinkLabel = ''; // String(username).substring(0, 6) + '...';
    appLinkUrl = '/app/my/home';
    iconName = 'user circle';
    iconColour = 'purple';
  }

  return (
    <FbLink to={appLinkUrl}>
      <span aria-label={ariaLabel}>{appLinkLabel} <Icon loading={loading} name={iconName} color={iconColour} /></span>
    </FbLink>
  );
}
