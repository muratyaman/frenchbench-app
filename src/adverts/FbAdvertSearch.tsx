import { Component, PropsWithChildren } from 'react';
import { FbLoadingParagraph, FbLoadMore } from '../components';
import { FbPropsWithApiAndI18n } from '../types';
import { FbAdvertList } from './FbAdvertList';
import { FbAdvertSearchForm } from './FbAdvertSearchForm';

const PAGE_LIMIT = 10;

export type FbAdvertSearchPropsBase = FbPropsWithApiAndI18n;
export type FbAdvertSearchProps = PropsWithChildren<FbAdvertSearchPropsBase>;

export class FbAdvertSearch extends Component<FbAdvertSearchProps> {
  state = {
    inputParams: {
      q: '',
      tags: '',
      with_assets: true,
      offset: 0,
    },
    loading: true,
    pagesOfAdverts: [],
    meta: null,
    error: null,
  }

  componentDidMount(): void {
    this.search(true);
  }

  getOffset = (): number => {
    const { inputParams } = this.state;
    return inputParams?.offset ?? 0;
  }

  getRowCount = (): number => {
    const { meta } = this.state;
    return meta?.row_count ?? 0;
  }

  search = async (reset = true): Promise<void> => {
    try {
      const inputParams = { ...this.state.inputParams }; // shallow clone
      let { pagesOfAdverts } = this.state;
      if (reset) {
        pagesOfAdverts = [];
        inputParams.offset = 0;
      } else {
        inputParams.offset += PAGE_LIMIT; // TODO: use limit defined by user
      }
      this.setState({ loading: true, error: null, pagesOfAdverts, meta: null, inputParams });
      const { data = [], meta = null, error = null } = await this.props.api.advert_search(inputParams);
      if (data && data.length) { // have data
        pagesOfAdverts.push(data);
      }
      this.setState({ loading: false, error, pagesOfAdverts, meta });
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
    const { api, i18n } = this.props;
    const { loading, error, pagesOfAdverts } = this.state;
    const offset = this.getOffset();
    const rc = this.getRowCount();
    return (
      <div className='fb-advert-search'>
        { <FbAdvertSearchForm loading={loading} onSubmit={this.onSubmit} onChange={this.onChange} />}
        
        { pagesOfAdverts && pagesOfAdverts.length && pagesOfAdverts.map((adverts, idx) => (
          <div key={`page-${idx}`}><FbAdvertList api={api} i18n={i18n} adverts={adverts} /></div>
        ))}
        
        { loading && <FbLoadingParagraph /> }
        
        { error && <p>Error loading adverts</p>}
        
        { (offset < rc) && <FbLoadMore onClick={this.loadMore} loading={loading} />}
      </div>
    );
  }
}
