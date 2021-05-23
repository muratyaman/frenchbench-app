import { FC, PropsWithChildren, useContext } from 'react';
import Helmet from 'react-helmet';
import { FbClientSideContainer, FbLoading } from '../components';
import { FbI18nContext } from '../contexts';
import { FbAppTopMenu } from '../menus/FbAppTopMenu';
import { FbCurrentUserContext } from '../users/FbCurrentUserContext';

export interface ProtectedLayoutProps {
  title?: string;
  containerClassName?: string;
  activeItemOfTopMenu?: string;
}

// fixed menu at top. rendered only on client-side
export const ProtectedLayout: FC<ProtectedLayoutProps> = (props: PropsWithChildren<ProtectedLayoutProps>) => {
  const { title = '', containerClassName = '', activeItemOfTopMenu = 'home', children } = props;
  const currentUserState = useContext(FbCurrentUserContext);
  const { i18n } = useContext(FbI18nContext);
  const { data: user = null, loading = false, error: userError = null } = currentUserState ?? {};
  const menuProps = { activeItem: activeItemOfTopMenu, currentUserState, i18n };
  return (
    <FbClientSideContainer className='fb-layout fb-layout-protected'>
      <Helmet>
        <title>{title} - FrenchBench Communities</title>
      </Helmet>
      
      <FbAppTopMenu {...menuProps} />

      <div className={`fb-page ${containerClassName}`}>
        {loading && <FbLoading />}
        {!loading && !user && <p>{i18n._('common_please_sign_in')}</p>}
        {user && children}
      </div>
    </FbClientSideContainer>
  );
}
