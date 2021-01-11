import React from 'react';

const defaultContext = {
  loading: true,
  data: null,
  error: null,
  reload: async () => {},
  setData: () => {},
}

export const FbCurrentUserContext = React.createContext(defaultContext);

export class FbCurrentUserContextProvider extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      ...defaultContext,
      reload: this.reload,
      setData: (data) => this.setState({ data }),
    }
  }

  async componentDidMount() {
    this.reload();
  }

  reload = async () => {
    try {
      this.setState({ data: null, error: null, loading: true });
      const result = await this.props.api.me();
      this.setState({ ...result, loading: false });
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
