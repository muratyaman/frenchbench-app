import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Container, Dropdown, Icon, Image, Menu, Segment } from 'semantic-ui-react';
import { FbFooter } from './FbFooter';
import { Loading } from './Loading';
import { newApiOnClient, newConfigOnClient } from '../utils/clientSide';

// fixed menu at top. rendered only on client-side
export class ProtectedLayout extends React.Component {
  constructor(props) {
    super(props);
    this.api = null;
    this.state = { mounted: false };
  }

  componentDidMount() {
    const config = newConfigOnClient();
    this.api = newApiOnClient(config.api);
    this.setState({ mounted: true });
    // this.props.mountedOnClientSide(this.api); // trigger, wait for children to change
  }

  async render() {
    const { title = '', children } = this.props;
    const { mounted } = this.state;

    let contentNode = null;
    if (!mounted) {
      contentNode = <Loading />;
    } else {
      contentNode = children; // first server-side, then api called and updated
    }
    return (
      <>
        <Head>
          <title>{title} - FrenchBench</title>
        </Head>
        <Menu fixed='top' inverted>
          <Container>
            <Menu.Item header>
              <Link href='/'>
                <Image size='mini' src='/assets/frenchbench-logo-small.jpg' style={{ marginRight: '1.5em' }} />
              </Link>
              <Link href='/'>FrenchBench</Link>
            </Menu.Item>
            <Menu.Item header>
              <Link href='/i-need-help'>
                <span aria-label='I need help'>Need <Icon name='heart outline' color='white' /></span>
              </Link>
            </Menu.Item>
            <Menu.Item header>
              <Link href='/i-can-help'>
                <span aria-label='I can help'>Can <Icon name='heart' color='red' /></span>
              </Link>
            </Menu.Item>
            <Menu.Item header>
              *username*
            </Menu.Item>

            <Dropdown item simple text='i'>
              <Dropdown.Menu>
                <Dropdown.Item>List Item</Dropdown.Item>
                <Dropdown.Item>List Item</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item>List Item</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Container>
        </Menu>

        <Container text style={{ marginTop: '3.5em' }}>
          {contentNode}
        </Container>

        {/* TODO: collapsable footer would be nice */}
        <Segment inverted vertical style={{ margin: '5em 0em 0em', padding: '5em 0em' }}>
          <FbFooter />
        </Segment>
      </>
    );
  }
}
