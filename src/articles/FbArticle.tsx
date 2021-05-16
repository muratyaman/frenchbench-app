import { Card } from 'semantic-ui-react';
import { formatDistance } from 'date-fns';
import { FbRandomImage } from '../components';

export function FbArticle({ title, content, keywords, created_at = null }) {
  //const contentWithBr = content.split('\n').map((line, idx) => (<p key={`${line}-${idx}`}>{line}</p>))
  const ago = formatDistance(new Date(created_at), new Date());
  // TODO: danger: content is html generated from markdown text
  return (
    <div className='fb-article'>
      <Card>
        <FbRandomImage keywords={keywords} />
        <Card.Content>
          <Card.Header>{title}</Card.Header>
          <Card.Meta>
            <span className='date'>{ago} ago</span>
          </Card.Meta>
          <Card.Description>
            <div
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </Card.Description>
        </Card.Content>
      </Card>
    </div>
  );
}
