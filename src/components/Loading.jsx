import React, { useContext } from 'react';
import { Icon } from 'semantic-ui-react';
import { FbI18nContext } from '../contexts';

export function Loading({ content = null }) {
  const { i18n } = useContext(FbI18nContext);
  if (!content) {
    content = i18n.common_loading();
  }
  return (
    <div className='fb-loading'>
      <h3><Icon name='spinner' size='large' loading />{content}</h3>
    </div>
  )
}
