import React from 'react';
import { Comment, Form, Header, Input } from 'semantic-ui-react';
import { WebSocketContext } from './WebSocketContext';
import { randomImg } from '../utils/randomImg';

export const MSG_KIND_SES    = 'ses'; // connected, server => session ID => client
export const MSG_KIND_JOINED = 'joined';
export const MSG_KIND_LEFT   = 'left';
export const MSG_KIND_CHAT   = 'chat';

export class FbChat extends React.Component {
  
  static contextType = WebSocketContext;

  constructor(props) {
    super(props);
    this.state = {
      sesId: null,
      message: '',
    }
  }

  sendMessage = () => {
    console.log('FbChat.sendMessage');
    const { send  = null } = this.context;
    const { message } = this.state;
    const { wsSesId, appendWsMessage } = this.props;
    if (send) {
      try {
        this.setState({ message: null, lastError: null }); // reset
        const msgObj = {
          kind: MSG_KIND_CHAT,
          msg: message,
          ts: (new Date()).toISOString(),
          ses: wsSesId,
          // by: 'username-of-current-user'
        };
        // appendWsMessage(msgObj); // TODO: consider using this, it acts like a backup until msg is broadcast
        send(JSON.stringify(msgObj));
      } catch (err) {
        console.error('WebSocketContextProvider.send ERROR', err);
        this.setState({ lastError: err.message });
      }
    } else {
      console.error('send func is not available');
    }
  }

  onChangeMessage = (ev, { name, value }) => {
    this.setState({ [name]: value });
  }

  onSubmitForm = (ev) => {
    ev.preventDefault();
    this.sendMessage();
  }

  render() {
    const { wsMessages, wsSesId } = this.props;
    const { message } = this.state;
    //const { api, currentUserState } = this.props;
    const { socketStatus } = this.context;
    
    return (
      <div>
        <Comment.Group fluid>
          <Header as='h3' dividing>
            Neighbourhood Chat Room
          </Header>

          {wsMessages.map(msgObj => (
            <Comment key={msgObj.id}>
              <Comment.Avatar src={randomImg('person', 'small')} />
              <Comment.Content>
                <Comment.Author as='a'>{msgObj.by}</Comment.Author>
                <Comment.Metadata>
                  <div>{msgObj.ts}</div>
                </Comment.Metadata>
                <Comment.Text>
                  {msgObj.msg.split('\n').map(txt => <p key>{txt}</p>)}
                </Comment.Text>
                {/*<Comment.Actions>
                  <Comment.Action>Reply</Comment.Action>
                </Comment.Actions>*/}
              </Comment.Content>
            </Comment>
          ))}

          <Form reply onSubmit={this.onSubmitForm}>
            <Input name='message' fluid action={{ color: 'purple', labelPosition: 'right', icon: 'send', content: 'Send' }}
              placeholder='your message' onChange={this.onChangeMessage} value={message} />
          </Form>
        </Comment.Group>
      </div>
    )
  }

}
