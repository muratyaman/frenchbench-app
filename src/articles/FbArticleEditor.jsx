import React from 'react';
import ReactMde from 'react-mde';
import { Button, Form, Icon, Message } from 'semantic-ui-react';
import { FbLoadingParagraph } from '../components';
import { md2Html } from '../utils/md2html';

const STAGE_LOADING = 'loading';
const STAGE_READY   = 'ready';
const STAGE_SAVING  = 'saving';

export class FbArticleEditor extends React.Component {

  constructor(props) {
    super(props);
    const { slug, title, keywords, content } = props.article;
    this.state = {
      slug,
      title,
      keywords,
      content,
      selectedTab: 'write', // 'preview'
      errorMessage: null,
      successMessage: null,
      stage: STAGE_LOADING,
    };
  }

  componentDidMount() {
    this.setState({ stage: STAGE_READY });
  }

  onChangeData = (e, { name, value }) => {
    this.setState({ [name]: value });
  }
  onChangeContent = (content) => {
    this.setState({ content });
  }

  onTabChange = (selectedTab) => {
    this.setState({ selectedTab });
  }

  onSubmit = async () => {
    let errorMessage = null, successMessage = null;
    this.setState({ stage: STAGE_SAVING, errorMessage, successMessage });
    const { api, article: { id } } = this.props;
    const { title, slug, keywords, content } = this.state;
    try {
      const { data, error } = await api.article_update(id, { title, slug, keywords, content });
      if (data) successMessage = 'Saved';
      if (error) errorMessage = error;
    } catch (err) {
      errorMessage = err.message;
    }
    this.setState({ stage: STAGE_READY, errorMessage, successMessage });
  }

  render() {
    const { stage, title, slug, keywords, content, selectedTab, errorMessage, successMessage } = this.state;
    if (stage === STAGE_LOADING) return <FbLoadingParagraph />;
    const isSaving = stage === STAGE_SAVING;
    return (
      <Form onSubmit={this.onSubmit} loading={isSaving}>
        <Form.Input name='title'    label='Title'    onChange={this.onChangeData} value={title} />
        <Form.Input name='slug'     label='Slug'     onChange={this.onChangeData} value={slug} />
        <Form.Input name='keywords' label='Keywords' onChange={this.onChangeData} value={keywords}  />
        <ReactMde
          value={content}
          onChange={this.onChangeContent}
          selectedTab={selectedTab}
          onTabChange={this.onTabChange}
          generateMarkdownPreview={md2Html}
        >{content}</ReactMde>

        <Button icon labelPosition='left' color='black' type='submit'><Icon name='save' /> Save</Button>
        {errorMessage && ( <Message warning header='Error' list={[ errorMessage ]} />)}
        {successMessage && ( <Message warning header='Success' list={[ successMessage ]} />)}
      </Form>
    );
  }
}
