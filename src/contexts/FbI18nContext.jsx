import React from 'react';
import { localeCodeEn, newI18N } from '../utils/i18n';

const defaultContext = {
  localeCode: localeCodeEn,
  i18n: newI18N(localeCodeEn),
  setLocale: async () => {},
}

export const FbI18nContext = React.createContext(defaultContext);

export class FbI18nContextProvider extends React.Component {
  
  constructor(props) {
    super(props);
    const { localeCode } = props;
    const i18n = newI18N(localeCode);
    this.state = {
      localeCode,
      i18n,
      setLocale: this.setLocale,
    }
  }

  setLocale = async (localeCode) => {
    try {
      // TODO: load translations from server
      const i18n = newI18N(localeCode);
      this.setState({ i18n });
    } catch (err) {
      console.error('FbI18nContextProvider.setLocale() ERROR', err.message);
    }
  }
  
  render() {
    return (
      <FbI18nContext.Provider value={this.state}>
        {this.props.children}
      </FbI18nContext.Provider>
    );
  }
}
