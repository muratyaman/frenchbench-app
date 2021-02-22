import { FC, PropsWithChildren } from 'react';
import { Button, Divider, Form } from 'semantic-ui-react';

interface ChangedData {
  name: string;
  value: string;
}

export interface FbAdvertSearchFormProps {
  loading?: boolean;
  onSubmit: () => void;
  onChange: (ev, data: ChangedData) => void;
}

export const FbAdvertSearchForm: FC<FbAdvertSearchFormProps> = (
  props: PropsWithChildren<FbAdvertSearchFormProps>,
) => {
  const { onSubmit, onChange } = props;
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
        onChange={onChange}
      />
      <Button content='Search' secondary type='submit' />
      <Divider />
    </Form>
  )
}