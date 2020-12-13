import React from 'react';
import { Button, Divider, Form } from 'semantic-ui-react';

export function FbAdvertSearchForm({ onSubmit, onChange }) {
  const _onSubmit = (ev) => {
    ev.preventDefault();
    onSubmit();
  }
  return (
    <Form onSubmit={_onSubmit}>
      <Form.Input
        name='q'
        label='Search'
        placeholder='search adverts'
        onChange={(e, { name, value }) => onChange(name, value)}
      />
      <Button content='Search' secondary type='submit' />
      <Divider />
    </Form>
  )
}