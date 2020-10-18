import React from 'react';
import Link from 'next/link';
import { Icon } from 'semantic-ui-react';

export function FbProfileLink({ userState = null }) {
  const { data: user = null, loading = false, error = null } = userState ?? {};
  const { username = null } = user ?? {};
  let ariaLabel = 'Sign in', appLinkLabel = 'Sign in', appLinkUrl = '/info/sign-in', iconName = 'sign-in', iconColour = 'yellow';
  if (loading) {
    appLinkLabel = '...';
    iconName = 'spinner';
  }
  if (username) {
    ariaLabel = 'Signed in as ' + username;
    appLinkLabel = String(username).substring(0, 5) + '...';
    appLinkUrl = '/app/my/home';
    iconName = 'setting';
    iconColour = 'teal';
  }

  return (
    <Link href={appLinkUrl}>
      <span aria-label={ariaLabel}>{appLinkLabel} <Icon loading={loading} name={iconName} color={iconColour} /></span>
    </Link>
  );
}
