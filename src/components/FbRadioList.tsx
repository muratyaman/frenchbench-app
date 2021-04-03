import { FC } from 'react';
import { Form, Radio } from 'semantic-ui-react';

interface FbRadioListOption {
  label: string;
  value: string;
}

export interface FbRadioListProps {
  name: string;
  className?: string;
  options: FbRadioListOption[];
  defaultValue: string;
  onChange: (name: string, value: string) => Promise<void> | void;
}

export const FbRadioList: FC<FbRadioListProps> = (props: FbRadioListProps) => {
  const { name, className = '', defaultValue, onChange } = props;
  return (
    <>
      {props.options.map(o => (
        <Form.Field
          className={`fb-radio-list ${className}`}
          inline
          key={`radio-${o.value}`}
          control={Radio}
          label={o.label}
          value={o.value}
          checked={o.value === defaultValue}
          onChange={(ev) => onChange(name, o.value)}
        />
      ))}
    </>
  );
}
