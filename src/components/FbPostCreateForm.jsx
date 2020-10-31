import React from 'react';
import { Button, Form, Message } from 'semantic-ui-react';
import { FbFileUploadModal } from './FbFileUploadModal';

export function FbPostCreateForm({ api, onSubmit, onChange, errorMessage = null, successMessage = null, ...otherProps }) {
  const onUploadSuccess = ({ asset_id, file_name }) => {
    onChange('asset_id', asset_id);
    onChange('asset_file', file_name);
  }
  return (
    <Form onSubmit={onSubmit} {...otherProps} warning={!!errorMessage} success={!!successMessage}>
      <Form.Input
        name='title'
        label='Create new post'
        placeholder='title of your post'
        onChange={(e, { name, value }) => onChange(name, value)}
      />
      <Form.TextArea
        name='content'
        placeholder='type something'
        onChange={(e, { name, value }) => onChange(name, value)}
      />
      <Form.Input
        icon='tag'
        iconPosition='left'
        name='tags'
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
