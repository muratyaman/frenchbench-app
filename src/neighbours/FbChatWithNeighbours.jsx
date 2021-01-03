import React from 'react';
import { format } from 'date-fns';
import { Comment, Form, Header, Input } from 'semantic-ui-react';
import { MSG_KIND_CHAT, FbWebSocketContext } from '../webSockets/FbWebSocketContext';
import { randomImg } from '../utils/randomImg';

export class FbChatWithNeighbours extends React.Component {
  
  static contextType = FbWebSocketContext;

  constructor(props) {
    super(props);
    this.state = {
      msg: '',
      error: '',
    }
  }

  sendMessage = () => {
    console.log('FbChat.sendMessage');
    const { send } = this.context;
    const { msg } = this.state;
    if (send) {
      try {
        this.setState({ msg: '', error: null }); // reset
        const msgObj = {
          kind: MSG_KIND_CHAT,
          msg,
          ts: (new Date()).toISOString(),
        };
        send(msgObj);
      } catch (err) {
        console.error('WebSocketContextProvider.send ERROR', err);
        this.setState({ error: err.message });
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
    const { msg } = this.state;
    const { messages } = this.context;
    // TODO: use socket status to enable/disable form
    return (
      <div>
        <Comment.Group fluid>
          <Header as='h3' dividing>
            Neighbourhood Chat Room
          </Header>

          {messages.map(msgObj => (
            <Comment key={msgObj.id}>
              <Comment.Avatar src={randomImg('person', 'small')} />
              <Comment.Content>
                <Comment.Author as='a'>{msgObj.by}</Comment.Author>
                <Comment.Metadata>
                  <div>{format(new Date(msgObj.ts), 'HH:mm')}</div>
                </Comment.Metadata>
                <Comment.Text>
                  {msgObj.msg.split('\n').map((txt, idx) => <p key={txt+idx}>{txt}</p>)}
                </Comment.Text>
              </Comment.Content>
            </Comment>
          ))}

          <Form reply onSubmit={this.onSubmitForm}>
            <Input name='msg' fluid action={{ color: 'purple', labelPosition: 'right', icon: 'send', content: 'Send' }}
              placeholder='your message' onChange={this.onChangeMessage} value={msg} />
          </Form>
        </Comment.Group>
      </div>
    )
  }

}
