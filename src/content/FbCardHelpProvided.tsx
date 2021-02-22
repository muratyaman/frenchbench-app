import { Card } from 'semantic-ui-react';
import TextLoop from 'react-text-loop';
import { FbRandomImage } from '../components';
import { localeCodeEn, localeCodeTr } from '../utils/i18n';

export function FbCardHelpProvided({ i18n }) {
  return (
    <div className='fb-card-help-provided'>
      <Card fluid>
        <FbRandomImage keywords='community,help,doctor,nurse,teacher,barber,electrician,cook,handyman' />
        {content[i18n._code]}
      </Card>
    </div>
  );
}

const content = {
  [localeCodeEn]: (
    <Card.Content>
      <Card.Header>I Can Help</Card.Header>
      <Card.Description>
        <div>
          <span>⭐️ I am &nbsp;</span>
          <TextLoop>
            <span>a doctor</span>
            <span>a nurse</span>
            <span>a teacher</span>
            <span>a gardener</span>
            <span>a cleaner</span>
            <span>a barber</span>
            <span>an electrician</span>
            <span>a handyman</span>
            <span>a cook</span>
            <span>selling a bicycle</span>
            <span>selling a lawn mower</span>
            <span>renting a generator</span>
          </TextLoop>
          <span>&nbsp;.</span>
        </div>
      </Card.Description>
    </Card.Content>
  ),
  [localeCodeTr]: (
    <Card.Content>
      <Card.Header>Yardım Edebilirim</Card.Header>
      <Card.Description>
        <div>
          <span>⭐️ Ben &nbsp;</span>
          <TextLoop>
            <span>doktorum</span>
            <span>hemşireyim</span>
            <span>öğretmenim</span>
            <span>bahçıvanım</span>
            <span>temizlikçiyim</span>
            <span>berberim</span>
            <span>elektrikçiyim</span>
            <span>tamirciyim</span>
            <span>aşçıyım</span>
            <span>bisikletimi satıyorum</span>
            <span>çim kesicimi satıyorum</span>
            <span>jeneratörümü kiralıyorum</span>
          </TextLoop>
          <span>&nbsp;.</span>
        </div>
      </Card.Description>
    </Card.Content>
  ),
};
