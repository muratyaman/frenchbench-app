import React, { Component } from 'react';
import { Accordion, Icon } from 'semantic-ui-react';

export class FbAccordion extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeIndex: -1,
    }
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;
    const { titles = [], contents = [], ...accordionProps } = this.props;
    const titleList = titles.map((title, index) => (
      <Accordion.Title key={`title-${index}`} active={activeIndex === index} index={index} onClick={this.handleClick}>
        <Icon name='dropdown' /> {title}
      </Accordion.Title>
    ));
    const contentList = contents.map((content, index)=> (
      <Accordion.Content key={`content-${index}`} active={activeIndex === index}>
        {content}
      </Accordion.Content>
    ));
    return (
      <Accordion {...accordionProps}>
        {titleList}
        {contentList}
      </Accordion>
    )
  }
}