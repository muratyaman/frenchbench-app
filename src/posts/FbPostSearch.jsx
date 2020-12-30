import React from 'react';
import { FbLoadingParagraph } from '../components';
import { FbPostList } from './FbPostList';
import { FbPostSearchForm } from './FbPostSearchForm';

export class FbPostSearch extends React.Component {
  state = {
    search: {
      q: '',
      tags: '',
      with_assets: true,
    },
    loading: true,
    posts: [],
    error: null,
  }
  componentDidMount() {
    this.search();
  }
  search = async () => {
    try {
      this.setState({ loading: true, error: null, posts: [] });
      const { data = [], error = null } = await this.props.api.post_search(this.state.search);
      this.setState({ loading: false, error, posts: data });
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
    const { loading, error, posts } = this.state;
    return (
      <div className='fb-post-search'>
        { !loading && <FbPostSearchForm onSubmit={this.onSubmit} onChange={this.onChange} />}
        { loading && <FbLoadingParagraph /> }
        { error && <p>Error loading posts</p>}
        { posts && <FbPostList posts={posts} />}
      </div>
    );
  }
}
