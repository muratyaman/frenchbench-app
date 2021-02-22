import { FC, PropsWithChildren } from 'react';
import { Button, Form } from 'semantic-ui-react';

type ChangeDataType = {
  name: string;
  value: string;
}

export interface FbPostSearchFormProps {
  loading: boolean;
  onSubmit: () => void;
  onChange: (ev: any, data: ChangeDataType) => void;
}

export const FbPostSearchForm: FC<FbPostSearchFormProps> = (props: PropsWithChildren<FbPostSearchFormProps>) => {
  const { loading, onSubmit, onChange } = props;
  const _onSubmit = (ev) => {
    ev.preventDefault();
    onSubmit();
  }
  return (
    <Form onSubmit={_onSubmit} loading={loading}>
      <Form.Input
        name='q'
        label='Search'
        placeholder='search posts'
        onChange={onChange}
      />
      <Form.Input
        icon='tag'
        iconPosition='left'
        name='tags'
        placeholder='#barber'
        onChange={onChange}
      />
      <Button content='Search' secondary type='submit' />
    </Form>
  );
};
