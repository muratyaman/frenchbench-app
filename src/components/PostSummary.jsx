import { Card, CardContent, CardTitle, CardHeader } from '@react-md/card';
import { Text } from '@react-md/typography';
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
    </>
  );
}
