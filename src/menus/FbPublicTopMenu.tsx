import { Icon, Image, Menu } from 'semantic-ui-react';
import { FbLink, FbProfileLink } from '../components';
import { makeInfoICanHelpLink, makeInfoINeedHelpLink } from '../makeRoutes';

export function FbPublicTopMenu({ currentUserState, i18n }) {
  const profileProps = { currentUserState, i18n };
  return (
    <Menu fixed='top' compact>
      <Menu.Item className='fb-header-logo'>
        <FbLink to='/'><Image size='mini' src='/assets/frenchbench-logo-mini.png' /></FbLink>
      </Menu.Item>
      <Menu.Item>
        <FbLink to={makeInfoICanHelpLink()}>
          <span aria-label={i18n._('common_i_can_help')}>
            {i18n._('common_can')} <Icon name='heart' color='purple' />
          </span>
        </FbLink>
      </Menu.Item>
      <Menu.Item>
        <FbLink to={makeInfoINeedHelpLink()}>
          <span aria-label={i18n._('common_i_need_help')}>
            {i18n._('common_need')} <Icon name='heart outline' color='purple' />
          </span>
        </FbLink>
      </Menu.Item>
      <Menu.Item><FbProfileLink {...profileProps} /></Menu.Item>
    </Menu>
  );
}
