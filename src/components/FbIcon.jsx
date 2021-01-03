import React from 'react';
import { Icon } from 'semantic-ui-react';

export function FbIcon({ iconName, color = null, cornerColor = 'red' }) {
  if (Array.isArray(iconName)) {
    return (
      <Icon.Group>
        <Icon name={iconName[0]} color={color} />
        <Icon name={iconName[1]} color={cornerColor} corner />
      </Icon.Group>
    );
  }
  return (<Icon name={iconName} color={color} />);
}
