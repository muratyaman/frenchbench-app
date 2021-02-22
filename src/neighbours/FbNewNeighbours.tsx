import React from 'react';
import { Feed, Header } from 'semantic-ui-react';
import { randomImg } from '../utils/randomImg';

export function FbNewNeighbours({ api, currentUserState, socketCtx }) {
  
  // TODO: find new neighbours using api
  const neighbours = [
    {
      id: 'uuid1',
      username: 'john',
      created_at: (new Date()).toISOString(),
    },
    {
      id: 'uuid2',
      username: 'jane',
      created_at: (new Date()).toISOString(),
    },
  ];

  return (
    <div>
      <Header>Recently...</Header>
      <Feed>
        {neighbours.map(neighbour => (
          <Feed.Event key={neighbour.id}>
            <Feed.Label image={randomImg('person', 'small')} />
            <Feed.Content>
              <Feed.Summary>
                <a>{neighbour.username}</a> signed up
                <Feed.Date>{neighbour.created_at}</Feed.Date>
              </Feed.Summary>
            </Feed.Content>
          </Feed.Event>
        ))}
      </Feed>
    </div>
  )
}
