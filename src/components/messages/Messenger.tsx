import React, { PureComponent } from 'react';
import '../stream-chat/Messenger.less';
import { connect } from 'react-redux';
import { deactiveConversation } from '@redux/message/actions';
import { Button } from 'antd';
import ConversationList from './ConversationList';
import MessageList from './MessageList';

import { withTranslation } from '../../../i18n';

interface IProps {
  toSource?: string;
  toId?: string;
  activeConversation?: any;
  deactiveConversation: Function;
  t: any;
}
class Messenger extends PureComponent<IProps> {
  onClose() {
    const { deactiveConversation: dispatchDeactiveConversation } = this.props;
    dispatchDeactiveConversation();
  }

  render() {
    const { toSource, toId, activeConversation, t } = this.props;
    return (
      <div className="messenger">
        <div className={!activeConversation._id ? 'sidebar' : 'sidebar active'}>
          <ConversationList toSource={toSource} toId={toId} />
        </div>
        <div
          className={
            !activeConversation._id ? 'chat-content' : 'chat-content active'
          }
        >
          <Button onClick={this.onClose.bind(this)} className="close-btn">
            {t('close')}
          </Button>
          <MessageList />
        </div>
      </div>
    );
  }
}
const mapStates = (state: any) => {
  const { activeConversation } = state.conversation;
  return {
    activeConversation
  };
};

const mapDispatch = { deactiveConversation };
export default connect(
  mapStates,
  mapDispatch
)(withTranslation('components')(Messenger));
