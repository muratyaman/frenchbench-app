import { Component, PropsWithChildren } from 'react';
import { FbLoadingParagraph, FbLoadMore } from '../components';
import { ApiClient } from '../utils';
import { FbPostList } from './FbPostList';
import { FbPostSearchForm } from './FbPostSearchForm';

const PAGE_LIMIT = 10;

export interface FbPostSearchPropsBase {
  api: ApiClient;
}

export type FbPostSearchProps = PropsWithChildren<FbPostSearchPropsBase>;

export class FbPostSearch extends Component<FbPostSearchProps> {
  state = {
    inputParams: {
      q: '',
      tags: '',
      with_assets: true,
      offset: 0,
    },
    loading: true,
    pagesOfPosts: [],
    meta: null,
    error: null,
  }

  componentDidMount() {
    this.search(true);
  }

  getOffset = () => {
    const { inputParams } = this.state;
    return (inputParams && inputParams.offset) ?? 0;
  }

  getRowCount = () => {
    const { meta } = this.state;
    return (meta && meta.row_count) ?? 0;
  }

  search = async (reset = true) => {
    try {
      const inputParams = { ...this.state.inputParams }; // shallow clone
      let { pagesOfPosts } = this.state;
      if (reset) {
        pagesOfPosts = [];
        inputParams.offset = 0;
      } else {
        inputParams.offset += PAGE_LIMIT; // TODO: use limit defined by user
      }
      this.setState({ loading: true, error: null, pagesOfPosts, meta: null, inputParams });
      const { data = [], meta = null, error = null } = await this.props.api.post_search(inputParams);
      if (data && data.length) { // have data
        pagesOfPosts.push(data);
      }
      this.setState({ loading: false, error, pagesOfPosts, meta });
    } catch (err) {
      this.setState({ loading: false, error: err.message });
    }
  }

  onChange = (ev, { name, value }) => {
    const inputParams = { ...this.state.inputParams }; // shallow clone
    inputParams[name] = value;
    this.setState({ inputParams });
  }

  onSubmit = () => {
    this.search(true);
  }

  loadMore = () => {
    this.search(false);
  }

  render() {
    const { loading, error, pagesOfPosts } = this.state;
    const offset = this.getOffset();
    const rc = this.getRowCount();
    const formProps = { loading, onSubmit: this.onSubmit, onChange: this.onChange };
    return (
      <div className='fb-post-search'>
        { <FbPostSearchForm {...formProps} />}
        
        { pagesOfPosts && pagesOfPosts.length && pagesOfPosts.map((posts, idx) => (
          <div key={`page-${idx}`}><FbPostList posts={posts} /></div>
        ))}
        
        { loading && <FbLoadingParagraph /> }
        
        { error && <p>Error loading posts</p>}
        
        { (offset < rc) && <FbLoadMore onClick={this.loadMore} loading={loading} />}
      </div>
    );
  }
}
