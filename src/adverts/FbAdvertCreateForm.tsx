import { Button, Form, Message } from 'semantic-ui-react';
import { FbFileUploadModal } from '../assets/FbFileUploadModal';

export function FbAdvertCreateForm({ api, i18n, formData, onSubmit, onChange, errorMessage = null, successMessage = null, ...otherProps }) {
  const buyingOptions = api.buyingOptionList(i18n).map(({ id, label }) => ({ key: id, text: label, value: id }));
  const serviceOptions = api.serviceOptionList(i18n).map(({ id, label }) => ({ key: id, text: label, value: id }));
  const currencyOptions = api.currencyOptionList(i18n).map(({ id, symbol }) => ({ key: id, text: symbol, value: id }));
  
  const onUploadSuccess = ({ asset_id, file_name }) => {
    onChange('asset_id', asset_id);
    onChange('asset_file', file_name);
  };

  return (
    <Form onSubmit={onSubmit} {...otherProps} warning={!!errorMessage} success={!!successMessage}>
      <Form.Group>
        <Form.Select
          fluid
          label='I am'
          options={buyingOptions}
          defaultValue={formData.is_buying}
          placeholder=''
        />
        <Form.Select
          fluid
          label='...'
          options={currencyOptions}
          defaultValue={formData.currency}
          placeholder=''
        />
        <Form.Input
          icon='money'
          iconPosition='left'
          name='price'
          label='...'
          placeholder='0.00'
          onChange={(e, { name, value }) => onChange(name, value)}
          type='number'
        />
        <Form.Select
          fluid
          label='for'
          options={serviceOptions}
          defaultValue={formData.is_service}
          placeholder=''
        />
      </Form.Group>
      <Form.Group>
        <Form.Input
          name='title'
          label='Title'
          placeholder='title of your advert'
          onChange={(e, { name, value }) => onChange(name, value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.TextArea
          name='content'
          label='Description'
          placeholder='type something'
          onChange={(e, { name, value }) => onChange(name, value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Input
          icon='tag'
          iconPosition='left'
          name='tags'
          label='Tags'
          placeholder='#barber'
          onChange={(e, { name, value }) => onChange(name, value)}
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
