import React from 'react';
import { Button, Form, Message } from 'semantic-ui-react';

export function FbPostCreateForm({ onSubmit, onChange, errorMessage = null, successMessage = null, ...otherProps }) {
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
      {errorMessage && ( <Message warning header='Error' list={[ errorMessage ]} />)}
      {successMessage && ( <Message warning header='Success' list={[ successMessage ]} />)}
      <Button content='Submit' secondary type='submit' />
    </Form>
  )
}
