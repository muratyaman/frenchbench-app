import React from 'react';
import { Button, Form, Message } from 'semantic-ui-react';
import { FbFileUploadModal } from './FbFileUploadModal';

export function FbAdvertCreateForm({ api, formData, onSubmit, onChange, errorMessage = null, successMessage = null, ...otherProps }) {
  const buyingOptions = api.options.buyingOptionList().map(({ id, label }) => ({ key: id, text: label, value: id }));
  const serviceOptions = api.options.serviceOptionList().map(({ id, label }) => ({ key: id, text: label, value: id }));
  const currencyOptions = api.options.currencyOptionList().map(({ id, symbol }) => ({ key: id, text: symbol, value: id }));
  const onUploadSuccess = ({ asset_id, file_name }) => {
    onChange('asset_id', asset_id);
    onChange('asset_file', file_name);
  }
  return (
    <Form onSubmit={onSubmit} {...otherProps} warning={!!errorMessage} success={!!successMessage}>
      <Form.Group inline>
        <Form.Select
          fluid
          label='I want to'
          options={buyingOptions}
          defaultValue={formData.is_buying}
          placeholder=''
        />
        <Form.Select
          fluid
          label=' '
          options={currencyOptions}
          defaultValue={formData.currency}
          placeholder=''
        />
        <Form.Input
          icon='money'
          iconPosition='left'
          name='price'
          label=' '
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
      <Form.Input
        name='title'
        label='Title'
        placeholder='title of your advert'
        onChange={(e, { name, value }) => onChange(name, value)}
      />
      <Form.TextArea
        name='content'
        label='Description'
        placeholder='type something'
        onChange={(e, { name, value }) => onChange(name, value)}
      />
      <Form.Input
        icon='tag'
        iconPosition='left'
        name='tags'
        label='Tags'
        placeholder='#barber'
        onChange={(e, { name, value }) => onChange(name, value)}
      />
      <Form.Field>
        <label>Photo</label>
        <FbFileUploadModal api={api} onUploadSuccess={onUploadSuccess} />
      </Form.Field>
      {errorMessage && ( <Message warning header='Error' list={[ errorMessage ]} />)}
      {successMessage && ( <Message warning header='Success' list={[ successMessage ]} />)}
      <Button content='Submit' secondary type='submit' />
    </Form>
  )
}
