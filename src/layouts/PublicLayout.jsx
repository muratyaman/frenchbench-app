import React, { useContext } from 'react';
import Helmet from 'react-helmet';
import { Icon, Image, Menu } from 'semantic-ui-react';
import { FbFooter, FbLink, FbLocaleSwitch, FbProfileLink } from '../components';
import { FbI18nContext } from '../contexts';

// fixed menu at top. rendered on both client-side and server-side
export function PublicLayout(props) {
  const { i18n } = useContext(FbI18nContext);
  const { title = '', containerClassName = 'fb-page', currentUserState = null, children } = props;
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
            <span aria-label={i18n.common_i_need_help()}>
              {i18n.common_need()} <Icon name='heart outline' color='purple' />
            </span>
          </FbLink>
        </Menu.Item>
        <Menu.Item>
          <FbLink to='/info/i-can-help'>
            <span aria-label={i18n.common_i_can_help()}>
              {i18n.common_can()} <Icon name='heart' color='purple' />
            </span>
          </FbLink>
        </Menu.Item>
        <Menu.Item>
          <FbProfileLink currentUserState={currentUserState} i18n={i18n} />
        </Menu.Item>
        <Menu.Item>
          <FbLocaleSwitch />
        </Menu.Item>
      </Menu>

      <div className={containerClassName}>
        {children}
      </div>

      <FbFooter />
    </>
  );
}
