import { Card, Icon } from 'semantic-ui-react'
import { RandomImage } from './RandomImage';

export function PostSummary({ title, summary, keywords }) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p align='center'>
            <RandomImage keywords={keywords} />
          </p>
          <Text>{summary}</Text>
        </CardContent>
      </Card>

      <Card>
        <Image src='/images/avatar/large/matthew.png' wrapped ui={false} />
        <Card.Content>
          <Card.Header>Matthew</Card.Header>
          <Card.Meta>
            <span className='date'>Joined in 2015</span>
          </Card.Meta>
          <Card.Description>
            Matthew is a musician living in Nashville.
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a>
            <Icon name='user' />
            22 Friends
          </a>
        </Card.Content>
      </Card>
    </>
  );
}
