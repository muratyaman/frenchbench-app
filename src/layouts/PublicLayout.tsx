import React, { useContext } from 'react';
import Helmet from 'react-helmet';
import { FbFooter } from '../components';
import { FbI18nContext } from '../contexts';
import { FbPublicTopMenu } from '../menus/FbPublicTopMenu';
import { FbPublicBottomMenu } from '../menus/FbPublicBottomMenu';
import { FbCurrentUserContext } from '../users/FbCurrentUserContext';

// fixed menu at top. rendered on both client-side and server-side
export function PublicLayout(props) {
  const currentUserState = useContext(FbCurrentUserContext);
  const { i18n } = useContext(FbI18nContext);
  const { title = '', containerClassName = 'fb-page', children } = props;
  const menuProps = { currentUserState, i18n };
  return (
    <div className='fb-layout fb-layout-public'>
      <Helmet>
        <title>{title} - FrenchBench Communities</title>
      </Helmet>
      
      <FbPublicTopMenu {...menuProps} />

      <div className={`fb-page ${containerClassName}`}>
        {children}
      </div>

      <FbFooter />
      <FbPublicBottomMenu />
    </div>
  );
}
