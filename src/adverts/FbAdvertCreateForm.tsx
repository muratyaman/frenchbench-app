import { Button, Form, Message } from 'semantic-ui-react';
import { FbFileUploadModal } from '../assets/FbFileUploadModal';

export function FbAdvertCreateForm({ api, i18n, formData, onSubmit, onChange, errorMessage = null, successMessage = null, ...otherProps }) {
  const buyingOptions = api.buyingOptionList(i18n).map(({ id, label }) => ({ key: id, text: label, value: id }));
  const serviceOptions = api.serviceOptionList(i18n).map(({ id, label }) => ({ key: id, text: label, value: id }));
  const currencyOptions = api.currencyOptionList(i18n).map(({ id, label }) => ({ key: id, text: label, value: id }));
  
  const onUploadSuccess = ({ asset_id, file_name }) => {
    onChange('asset_id', asset_id);
    onChange('asset_file', file_name);
  };

  return (
    <Form onSubmit={onSubmit} {...otherProps} warning={!!errorMessage} success={!!successMessage}>
      <Form.Group>
        <Form.Input
          fluid
          label='Title'
          name='title'
          placeholder=''
          onChange={(e, { name, value }) => onChange(name, value)}
          width={16}
        />
      </Form.Group>
      <Form.Group>
        <Form.TextArea
          name='content'
          label='Description'
          placeholder=''
          onChange={(e, { name, value }) => onChange(name, value)}
          width={16}
        />
      </Form.Group>
      <Form.Group>
        <Form.Input
          icon='tag'
          iconPosition='left'
          name='tags'
          label='Tags'
          placeholder=''
          onChange={(e, { name, value }) => onChange(name, value)}
          width={16}
        />
      </Form.Group>
      <Form.Group inline>
        <label>I want to </label>
        <Form.Select
          fluid
          name='is_buying'
          options={buyingOptions}
          defaultValue={formData.is_buying}
          onChange={onChange}
        />
        <label> a </label>
        <Form.Select
          fluid
          name='is_service'
          options={serviceOptions}
          defaultValue={formData.is_service}
          onChange={onChange}
        />
      </Form.Group>
      <Form.Group inline>
        <label>Value</label>
        <Form.Input
          icon='money'
          iconPosition='left'
          name='price'
          placeholder=''
          onChange={(e, { name, value }) => onChange(name, value)}
          type='number'
        />
        <Form.Select
          fluid
          options={currencyOptions}
          defaultValue={formData.currency}
          onChange={onChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Field>
          <label>Photo</label>
          <FbFileUploadModal api={api} onUploadSuccess={onUploadSuccess} />
        </Form.Field>
      </Form.Group>
      <p>
        {errorMessage && ( <Message warning header='Error' list={[ errorMessage ]} />)}
        {successMessage && ( <Message warning header='Success' list={[ successMessage ]} />)}
        <Button content='Submit' secondary type='submit' />
      </p>
    </Form>
  )
}
