import React from 'react';
import Helmet from 'react-helmet';
import { Icon, Image, Menu } from 'semantic-ui-react';
import { FbLink } from './FbLink';
import { FbFooter } from './FbFooter';
import { FbProfileLink } from './FbProfileLink';
import { I18N_KEYS } from '../utils/i18n';

// fixed menu at top. rendered only on client-side
export function ProtectedLayout(props) {
  const { title = '', currentUserState = null, containerClassName = 'fb-page', i18n, children } = props;
  const { data: user = null, loading = false, error: userError = null } = currentUserState ?? {};
  return (
    <>
      <Helmet>
        <title>{title} - FrenchBench</title>
      </Helmet>
      <Menu fixed='top' compact>
        <Menu.Item className='fb-header-logo'>
          <FbLink to='/'><Image size='mini' src='/assets/frenchbench-logo-mini.png' /></FbLink>
        </Menu.Item>
        <Menu.Item>
          <FbLink to='/info/i-need-help'>
            <span aria-label={i18n._(I18N_KEYS.common_i_need_help)}>
              {i18n._(I18N_KEYS.common_need)} <Icon name='heart outline' color='purple' />
            </span>
          </FbLink>
        </Menu.Item>
        <Menu.Item>
          <FbLink to='/info/i-can-help'>
            <span aria-label={i18n._(I18N_KEYS.common_i_can_help)}>
              {i18n._(I18N_KEYS.common_can)} <Icon name='heart' color='purple' />
            </span>
          </FbLink>
        </Menu.Item>
        <Menu.Item>
          <FbProfileLink currentUserState={currentUserState} />
        </Menu.Item>
      </Menu>

      <div className={containerClassName}>
        {userError ? <p>Please sign in</p>: children}
      </div>

      <FbFooter accordion />
    </>
  );

}
