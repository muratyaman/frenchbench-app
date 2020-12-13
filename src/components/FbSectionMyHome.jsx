import React from 'react';
import { Tab } from 'semantic-ui-react';
import { FbPostSearch } from './FbPostSearch';
import { FbAdvertSearch } from './FbAdvertSearch';

export function FbSectionMyHome({ api, currentUserState }) {
  const searchProps = { api, currentUserState }
  const panes = [
    {
      menuItem: 'Posts',
      render: () => <Tab.Pane as='div' attached={false}><FbPostSearch {...searchProps} /></Tab.Pane>,
    },
    {
      menuItem: 'Adverts',
      render: () => <Tab.Pane as='div' attached={false}><FbAdvertSearch {...searchProps} /></Tab.Pane>,
    },
  ];

  return (
    <div className='fb-my-home'>
      <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
    </div>
  )
}
