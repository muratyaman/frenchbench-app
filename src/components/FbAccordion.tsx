import { FC, PropsWithChildren, useState } from 'react';
import { Accordion, Icon } from 'semantic-ui-react';

export interface FbAccordionProps {
  titles: string[];
  contents: any[];
}

export const FbAccordion: FC<FbAccordionProps> = (props: PropsWithChildren<FbAccordionProps>) => {
  const [activeIndex, setActiveIndex ] = useState(-1);

  const handleClick = (e, { index }) => {
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  }

  const { titles = [], contents = [], ...accordionProps } = props;

  const titleList = titles.map((title, idx) => (
    <Accordion.Title 
      key={`title-${idx}`} active={activeIndex === idx} index={idx}
      onClick={handleClick}
    >
      <Icon name='dropdown' /> {title}
    </Accordion.Title>
  ));

  const contentList = contents.map((content, idx)=> (
    <Accordion.Content key={`content-${idx}`} active={activeIndex === idx}>
      {content}
    </Accordion.Content>
  ));

  return (
    <Accordion {...accordionProps}>
      {titleList}
      {contentList}
    </Accordion>
  );
}