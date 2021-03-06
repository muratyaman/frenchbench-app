import React from 'react';
import { Icon } from 'semantic-ui-react';
import { FbLink } from './FbLink';
import * as c from '../constants';
import { makeMyHomeLink } from '../makeRoutes';

export function FbProfileLink({ i18n, currentUserState = null }) {
  const { data: user = null, loading = false, error = null } = currentUserState ?? {};
  const { username = null } = user ?? {};
  let ariaLabel = i18n._('account_sign_in');
  let appLinkLabel = ariaLabel;
  let appLinkUrl = '/info/sign-in', iconName = c.iconSignIn, iconColour = c.PURPLE;
  if (loading) {
    appLinkLabel = '...';
    iconName = c.iconSpinner;
  }
  if (username) {
    ariaLabel = 'Signed in as ' + username;
    appLinkLabel = ''; // String(username).substring(0, 6) + '...';
    appLinkUrl = makeMyHomeLink();
    iconName = c.iconUserCircle;
    iconColour = c.PURPLE;
  }

  return (
    <FbLink to={appLinkUrl}>
      <span aria-label={ariaLabel}>
        {appLinkLabel}
        {' '}
        <Icon loading={loading} name={iconName} color={iconColour} />
      </span>
    </FbLink>
  );
}
