import React from 'react';
import { Icon, SemanticCOLORS } from 'semantic-ui-react';

const RED: SemanticCOLORS = 'red';

export function FbIcon({ iconName, color = null, cornerColor = RED }) {
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
