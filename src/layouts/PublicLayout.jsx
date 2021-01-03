import React, { useContext } from 'react';
import Helmet from 'react-helmet';
import { Icon, Image, Menu } from 'semantic-ui-react';
import { FbFooter, FbLink, FbLocaleSwitch, FbProfileLink } from '../components';
import { FbI18nContext } from '../contexts';
import { FbPublicTopMenu } from '../menus/FbPublicTopMenu';

// fixed menu at top. rendered on both client-side and server-side
export function PublicLayout(props) {
  const { i18n } = useContext(FbI18nContext);
  const { title = '', containerClassName = 'fb-page', currentUserState = null, children } = props;
  const menuProps = { currentUserState, i18n };
  return (
    <>
      <Helmet>
        <title>{title} - FrenchBench</title>
      </Helmet>
      
      <FbPublicTopMenu {...menuProps} />

      <div className={containerClassName}>
        {children}
      </div>

      <FbFooter />
    </>
  );
}
