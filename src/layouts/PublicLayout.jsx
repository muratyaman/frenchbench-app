import React, { useContext } from 'react';
import Helmet from 'react-helmet';
import { FbFooter } from '../components';
import { FbI18nContext } from '../contexts';
import { FbPublicTopMenu } from '../menus/FbPublicTopMenu';

// fixed menu at top. rendered on both client-side and server-side
export function PublicLayout(props) {
  const currentUserState = useContext(FbCurrentUserContext);
  const { i18n } = useContext(FbI18nContext);
  const { title = '', containerClassName = 'fb-page', children } = props;
  const menuProps = { currentUserState, i18n };
  return (
    <>
      <Helmet>
        <title>{title} - FrenchBench Communities</title>
      </Helmet>
      
      <FbPublicTopMenu {...menuProps} />

      <div className={containerClassName}>
        {children}
      </div>

      <FbFooter />
    </>
  );
}
