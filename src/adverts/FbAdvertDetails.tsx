import { useContext } from 'react';
import { formatDistance } from 'date-fns';
import { Card, Image, Label } from 'semantic-ui-react';
import { FbHashTagLinkList, FbLink } from '../components';
import { randomImgSrc } from '../utils/randomImgSrc';
import { makeAdvertLink, makeUserProfileLink } from '../makeRoutes';
import { makeHashTagList } from '../utils/makeHashTagList';
import { FbAssetImage } from '../assets/FbAssetImage';
import { FbI18nContext } from '../contexts';
import { formatMoney } from '../utils';

export function FbAdvertDetails({ api, advert, username }) {
  const { i18n } = useContext(FbI18nContext);
  const { title = '', content = '', tags = '', is_buying, is_service, price, currency, created_at = null, slug, assets = [] } = advert;
  const dt = formatDistance(new Date(created_at), new Date());
  const tagArr = makeHashTagList(tags);
  const tag0 = tagArr[0];
  const keywords = tag0;
  const avatarSrc = randomImgSrc('silhouette', 96, 96);
  const link = makeAdvertLink({ username, slug });
  const asset0 = assets[0] ?? null;
  const asset0info = asset0?.asset ?? null;
  const contentLines = content.split('\n').map((line, idx) => (<p key={`${idx}-${line}`}>{line}</p>))
  const buyingOption = api.buyingOptionList(i18n).find(({ id }) => id == is_buying);
  const serviceOption = api.serviceOptionList(i18n).find(({ id }) => id == is_service);
  //const currencyOption = api.currencyOptionList(i18n).find(({ id }) => id == currency);
  const priceDesc = formatMoney(price, i18n._code, currency);
  const userProfileLink = makeUserProfileLink({ username });
  return (
    <div className='fb-advert-list-item'>
      <Card>
        <Card.Content>
          <FbLink to={userProfileLink}><Image floated='right' size='mini' src={avatarSrc} /></FbLink>
          <Card.Header>{title}</Card.Header>
          <Card.Meta>{username} advertised {dt} ago</Card.Meta>
          <Card.Description>
            <FbAssetImage asset={asset0info} keywords={keywords} link={link} w={240} h={240} wrapped={false}
              label={{ as: 'span', color: 'purple', content: priceDesc, icon: 'money', ribbon: false }} />
          </Card.Description>
          <Card.Description extra>
            <FbHashTagLinkList tags={tags} />
          </Card.Description>
          <Card.Description extra>
            <Label color='purple' ribbon='right'>{buyingOption.label} {priceDesc} for this {serviceOption.label}</Label>
            {contentLines}
          </Card.Description>
        </Card.Content>
      </Card>

    </div>
  );
}
