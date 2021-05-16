import { useContext, useState } from 'react';
import { format } from 'date-fns';
import { Comment, Form, Header, Input } from 'semantic-ui-react';
import { FbWebSocketContext } from '../webSockets/FbWebSocketContext';
import * as wsUtils from '../webSockets/wsUtils';
import { randomImg } from '../utils/randomImg';
import { FbI18nContext } from '../contexts';

export function FbChatWithNeighbours(props) {
  const { i18n } = useContext(FbI18nContext);
  const wsCtx = useContext(FbWebSocketContext);
  const [msg, setMsg] = useState('');
  const [error, setError] = useState(null);

  const sendMessage = () => {
    console.log('FbChat.sendMessage');
    const { send } = wsCtx;
    if (send) {
      try {
        setMsg('');
        setError(null);
        const msgObj: wsUtils.FbWsNewChatMessage = {
          kind: wsUtils.MSG_KIND_ENUM.CHAT,
          msg,
          ts: (new Date()).toISOString(),
        };
        send(msgObj);
      } catch (err) {
        console.error('WebSocketContextProvider.send ERROR', err);
        setError(err.message);
      }
    } else {
      console.error('send func is not available');
    }
  }

  const onChangeMessage = (ev, { name, value }) => {
    setMsg(value);
  }

  const onSubmitForm = (ev) => {
    ev.preventDefault();
    sendMessage();
  }

  const inputActionProps = {
    color: 'purple',
    labelPosition: 'right',
    icon: 'send',
    content: i18n._('common_send'),
  };
  
  // TODO: use socket status to enable/disable form
  
  const imgObj = randomImg('person', 'small');

  return (
    <div>
      <Comment.Group fluid>
        <Header as='h3' dividing>
          {i18n._('neighbours_chat_room')}
        </Header>

        {wsCtx.messages.map(msgObj => (
          <Comment key={msgObj.id}>
            <Comment.Avatar src={imgObj.src} />
            <Comment.Content>
              <Comment.Author as='a'>{msgObj.by}</Comment.Author>
              <Comment.Metadata>
                <div>{format(new Date(msgObj.ts), 'HH:mm')}</div>
              </Comment.Metadata>
              <Comment.Text>
                {msgObj.msg.split('\n').map((txt, idx) => <p key={`${txt}-${idx}`}>{txt}</p>)}
              </Comment.Text>
            </Comment.Content>
          </Comment>
        ))}

        <Form reply onSubmit={onSubmitForm}>
          <Input name='msg' fluid={true} action={inputActionProps} onChange={onChangeMessage} value={msg} />
        </Form>
      </Comment.Group>
    </div>
  );
}
