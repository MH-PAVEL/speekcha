/* eslint-disable no-return-assign */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { sendStreamMessage } from '@redux/stream-chat/actions';
import { Input, message } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import Emotions from './emotions';
import './Compose.less';
import { withTranslation } from '../../../i18n';

interface IProps {
  loggedIn: boolean;
  sendStreamMessage: Function;
  sendMessage: any;
  conversation: any;
  isPublic?: boolean;
  t: any;
}

class Compose extends PureComponent<IProps> {
  uploadRef: any;

  _input: any;

  constructor(props) {
    super(props);
    this.uploadRef = React.createRef();
  }

  state = { text: '' };

  componentDidMount() {
    if (!this.uploadRef) this.uploadRef = React.createRef();
    if (!this._input) this._input = React.createRef();
  }

  componentDidUpdate(previousProps: IProps) {
    const { sendMessage } = this.props;
    if (sendMessage.success !== previousProps.sendMessage.success) {
      this.setText('');
      this._input && this._input.focus();
    }
  }

  onKeyDown = (evt) => {
    if (evt.keyCode === 13) {
      this.send();
    }
  };

  onChange = (evt) => {
    this.setText(evt.target.value);
  };

  onEmojiClick = (emojiObject) => {
    const { text } = this.state;
    this.setText(text + emojiObject.emoji);
  };

  setText(text) {
    this.setState({ text });
  }

  send() {
    const { text } = this.state;
    const { loggedIn } = this.props;
    if (!loggedIn) {
      message.error(this.props.t('Please login'));
      return;
    }

    if (!text) {
      return;
    }

    const {
      conversation,
      isPublic,
      sendStreamMessage: dispatchSendStreamMessage
    } = this.props;
    const { _id, type } = conversation;
    dispatchSendStreamMessage({
      conversationId: _id,
      data: {
        text
      },
      type,
      isPublic
    });
  }

  render() {
    const { loggedIn, t } = this.props;
    const { text } = this.state;
    const { sendMessage, conversation } = this.props;
    if (!this.uploadRef) this.uploadRef = React.createRef();
    if (!this._input) this._input = React.createRef();
    return (
      <div className="compose" hidden={!loggedIn || !conversation._id}>
        <Input
          value={text}
          className="compose-input"
          placeholder={t('Enter message here')}
          onKeyDown={this.onKeyDown}
          onChange={this.onChange}
          disabled={sendMessage.sending}
          autoFocus
          ref={(c) => (this._input = c)}
        />
        <div className="grp-icons">
          <SendOutlined
            onClick={this.send.bind(this)}
            style={{ fontSize: '25px', marginRight: '10px', color: '#fe26b3' }}
          />
          <div className="grp-emotions">
            <img src="/emotion-ico.png" width="25px" alt="" />
            <Emotions onEmojiClick={this.onEmojiClick.bind(this)} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStates = (state: any) => ({
  loggedIn: state.auth.loggedIn,
  sendMessage: state.streamMessage.sendMessage
});

const mapDispatch = { sendStreamMessage };
export default connect(
  mapStates,
  mapDispatch
)(withTranslation('components')(Compose));
