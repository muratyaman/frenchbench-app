import React from 'react';
import { Card } from 'semantic-ui-react';
import TextLoop from 'react-text-loop';
import { RandomImage } from '../components';
import { localeCodeEn, localeCodeTr } from '../utils/i18n';

export function FbCardHelpNeeded({ i18n }) {
  return (
    <div className='fb-card-help-needed'>
      <Card fluid>
        <RandomImage keywords='community,care,doctor,nurse,garden,barber,handyman' />
        {content[i18n._code]}
      </Card>
    </div>
  );
}

const content = {
  [localeCodeEn]: (
    <Card.Content>
      <Card.Header>I Need Help</Card.Header>
      <Card.Description>
        <div>
          <span>⭐️ I need&nbsp;</span>
          <TextLoop>
            <span>to talk to someone</span>
            <span>to learn coding</span>
            <span>a caretaker</span>
            <span>help with shopping</span>
            <span>a gardener</span>
            <span>lots of food for my party</span>
            <span>a haircut</span>
            <span>a bicycle</span>
            <span>to fix my heater</span>
          </TextLoop>
          <span>&nbsp;.</span>
        </div>
      </Card.Description>
    </Card.Content>
  ),
  [localeCodeTr]: (
    <Card.Content>
      <Card.Header>Yardım Lazım</Card.Header>
      <Card.Description>
        <div>
          <span>⭐️ Benim&nbsp;</span>
          <TextLoop>
            <span>biriyle konuşmaya</span>
            <span>kod yazmayı öğrenmeye</span>
            <span>bakıcıya</span>
            <span>alış veriş için yardıma</span>
            <span>bahçıvana</span>
            <span>parti için yemeğe</span>
            <span>saç kestirmeye</span>
            <span>bisiklete</span>
            <span>ısıtıcımı tamir ettirmeye</span>
          </TextLoop>
          <span>&nbsp;ihtiyacım var.</span>
        </div>
      </Card.Description>
    </Card.Content>
  ),
};
