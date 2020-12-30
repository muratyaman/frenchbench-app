import React from 'react';
import { Button, Divider, Form } from 'semantic-ui-react';

export function FbPostSearchForm({ onSubmit, onChange }) {
  const _onSubmit = (ev) => {
    ev.preventDefault();
    onSubmit();
  }
  return (
    <Form onSubmit={_onSubmit}>
      <Form.Input
        name='q'
        label='Search'
        placeholder='search posts'
        onChange={(e, { name, value }) => onChange(name, value)}
      />
      <Form.Input
        icon='tag'
        iconPosition='left'
        name='tags'
        placeholder='#barber'
        onChange={(e, { name, value }) => onChange(name, value)}
      />
      <Button content='Search' secondary type='submit' />
      <Divider />
    </Form>
  )
}