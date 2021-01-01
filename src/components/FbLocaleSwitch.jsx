import React, { useContext } from 'react';
import { Dropdown } from 'semantic-ui-react';
import { FbI18nContext } from '../contexts';
import { countryOptions } from '../utils/i18n';

export function FbLocaleSwitch(props) {
  const { i18n, setLocale } = useContext(FbI18nContext);
  return (
    <Dropdown
      selection
      compact
      defaultValue={i18n._code}
      options={countryOptions}
      onChange={(e, { value }) => setLocale(value)}
    />
  )
}
