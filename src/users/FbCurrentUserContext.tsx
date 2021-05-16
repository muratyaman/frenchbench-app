import { createContext, Component, PropsWithChildren } from 'react';
import { FbPropsWithApi } from '../types';
import { UserRetrieveData } from '../utils/apiClient';

export type FbCurrentUserContextProviderPropsBase = FbPropsWithApi;
export type FbCurrentUserContextProviderProps = PropsWithChildren<FbCurrentUserContextProviderPropsBase>;

type OptionalUserData = UserRetrieveData | null;

export interface FbCurrentUserContextType {
  loading: boolean;
  data: OptionalUserData;
  error: string | null;
  reload: () => Promise<void>;
  setData: (data: OptionalUserData) => void;
}

const defaultContext: FbCurrentUserContextType = {
  loading: true,
  data: null,
  error: null,
  reload: async () => { return; },
  setData: (data: OptionalUserData) => { return; },
}

export const FbCurrentUserContext = createContext<FbCurrentUserContextType>(defaultContext);

export type FbCurrentUserContextProviderState = FbCurrentUserContextType;

export class FbCurrentUserContextProvider extends Component<FbCurrentUserContextProviderProps, FbCurrentUserContextProviderState> {
  
  constructor(props: FbCurrentUserContextProviderProps) {
    super(props);
    this.state = {
      ...defaultContext,
      reload: this.reload,
      setData: (data: OptionalUserData) => this.setState({ data }),
    }
  }

  async componentDidMount(): Promise<void> {
    this.reload();
  }

  reload = async (): Promise<void> => {
    try {
      this.setState({ data: null, error: null, loading: true });
      const { data = null, error = null } = await this.props.api.me();
      this.setState({ data, error, loading: false });
    } catch (err) {
      this.setState({ error: err.message, loading: false })
    }
  }
  
  render() {
    return (
      <FbCurrentUserContext.Provider value={this.state}>
        {this.props.children}
      </FbCurrentUserContext.Provider>
    );
  }
}
