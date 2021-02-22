import React from 'react';
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react';

export function FbLoadingParagraph(props) {
  return (
    <Segment>
      <Dimmer active inverted>
        <Loader inverted>Loading</Loader>
      </Dimmer>
      <Image src='/assets/short-paragraph.png' />
    </Segment>
  )
}
