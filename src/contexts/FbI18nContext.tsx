import { Component, createContext } from 'react';
import { I18N_TYPE, localeCodeEn, newI18N } from '../utils/i18n';

export interface FbI18nContextProviderProps {
  localeCode: string;
}

export interface FbI18nContextType {
  localeCode: string;
  i18n: I18N_TYPE;
  setLocale: (code: string) => Promise<void>,
}

const defaultContext: FbI18nContextType = {
  localeCode: localeCodeEn,
  i18n: newI18N(localeCodeEn),
  setLocale: async (code: string) => {},
}

export const FbI18nContext = createContext<FbI18nContextType>(defaultContext);

export class FbI18nContextProvider extends Component<FbI18nContextProviderProps, FbI18nContextType> {
  
  constructor(props) {
    super(props);
    const { localeCode } = props;
    this.state = {
      localeCode,
      i18n: newI18N(localeCode),
      setLocale: this.setLocale,
    }
  }

  setLocale = async (localeCode: string) => {
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
