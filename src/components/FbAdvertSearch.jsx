import React from 'react';
import { FbLoadingParagraph } from './FbLoadingParagraph';
import { FbAdvertList } from './FbAdvertList';
import { FbAdvertSearchForm } from './FbAdvertSearchForm';

export class FbAdvertSearch extends React.Component {
  state = {
    search: {
      q: '',
      with_assets: true,
      //tags: '',
      //min_price: -1,
      //max_price: -1,
      //is_buying: -1,
      //is_service: -1,
    },
    loading: true,
    adverts: [],
    error: null,
  }
  componentDidMount() {
    this.search();
  }
  search = async () => {
    try {
      this.setState({ loading: true, error: null, adverts: [] });
      const { data = [], error = null } = await this.props.api.advert_search(this.state.search);
      this.setState({ loading: false, error, adverts: data });
    } catch (err) {
      this.setState({ loading: false, error: err.message });
    }
  }
  onChange = ({ name, value }) => {
    const search = { ...this.state.search }; // shallow clone, avoid side-effects
    search[name] = value;
    this.setState({ search });
  }
  onSubmit = () => {
    this.search();
  }
  render(){
    const { loading, error, adverts } = this.state;
    return (
      <div className='fb-advert-search'>
        { !loading && <FbAdvertSearchForm onSubmit={this.onSubmit} onChange={this.onChange} />}
        { loading && <FbLoadingParagraph /> }
        { error && <p>Error loading adverts</p>}
        { adverts && <FbAdvertList adverts={adverts} />}
      </div>
    );
  }
}
