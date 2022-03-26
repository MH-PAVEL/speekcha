/* eslint-disable dot-notation */
/* eslint-disable camelcase */
import { StreamSettings } from 'src/interfaces';
import { streamService } from 'src/services';
import Router from 'next/router';
import React, { PureComponent } from 'react';
import withAntmedia from 'src/antmedia';
import { WEBRTC_ADAPTOR_INFORMATIONS } from 'src/antmedia/constants';
import { SocketContext } from 'src/socket';
import videojs from 'video.js';
import MicControlsPlugin from 'src/videojs/mic-controls/plugin';

import './index.less';

interface IProps {
  participantId?: string;
  className?: string;
  webRTCAdaptor: any;
  initWebRTCAdaptor: Function;
  publish_started: boolean;
  initialized: boolean;
  leaveSession: Function;
  muteLocalMic: Function;
  unmuteLocalMic: Function;
  settings: StreamSettings;
}

interface States {
  conversationId: string;
  streamId: string;
}

class Publisher extends PureComponent<IProps, States> {
  private socket;

  private publisher: videojs.Player;

  constructor(props: IProps) {
    super(props);
    this.state = {
      conversationId: null,
      streamId: null
    };
  }

  componentDidMount() {
    this.socket = this.context;
    videojs.registerPlugin('webRTCMicControlsPlugin', MicControlsPlugin);
    Router.events.on('routeChangeStart', this.onbeforeunload);
    window.addEventListener('beforeunload', this.onbeforeunload);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.onbeforeunload);
    Router.events.off('routeChangeStart', this.onbeforeunload);
  }

  onbeforeunload = () => {
    const { publish_started, webRTCAdaptor } = this.props;
    const { conversationId, streamId } = this.state;
    if (streamId && publish_started) {
      webRTCAdaptor && webRTCAdaptor.leaveFromRoom(conversationId);
      this.socket.emit('private-stream/leave', {
        conversationId,
        streamId
      });
    }

    if (this.publisher) {
      this.publisher.dispose();
      this.publisher = undefined;
    }

    this.setState({
      conversationId: null,
      streamId: null
    });
  };

  async handelWebRTCAdaptorCallback(info: WEBRTC_ADAPTOR_INFORMATIONS, obj: any) {
    const {
      webRTCAdaptor, settings, muteLocalMic, unmuteLocalMic
    } = this.props;
    const { conversationId, streamId } = this.state;
    if (info === WEBRTC_ADAPTOR_INFORMATIONS.INITIALIZED) {
      webRTCAdaptor.joinRoom(conversationId, streamId);
    } else if (info === WEBRTC_ADAPTOR_INFORMATIONS.JOINED_THE_ROOM) {
      const token = await streamService.getPublishToken({ streamId, settings });
      webRTCAdaptor.publish(streamId, token);
    } else if (info === WEBRTC_ADAPTOR_INFORMATIONS.PUBLISH_STARTED) {
      const player = videojs('private-publishe', {
        liveui: true,
        controls: true,
        muted: true,
        controlBar: {
          playToggle: false,
          currentTimeDisplay: false,
          fullscreenToggle: false,
          pictureInPictureToggle: false,
          volumePanel: false
        }
      });
      player.error(null);
      player.one('play', () => {
        this.publisher = player;
        // eslint-disable-next-line dot-notation
        this.publisher['webRTCMicControlsPlugin']({
          muteLocalMic,
          unmuteLocalMic,
          isMicMuted: false
        });
      });
      this.socket.emit('private-stream/join', {
        conversationId,
        streamId: obj.streamId
      });
    } else if (info === WEBRTC_ADAPTOR_INFORMATIONS.PUBLISH_FINISHED) {
      this.socket.emit('private-stream/leave', {
        conversationId,
        streamId: obj.streamId
      });
    }
  }

  start(conversationId: string) {
    this.setState({ conversationId });
  }

  publish(streamId: string) {
    const { initWebRTCAdaptor } = this.props;
    this.setState({ streamId });
    initWebRTCAdaptor(this.handelWebRTCAdaptorCallback.bind(this));
  }

  stop() {
    const { leaveSession } = this.props;
    leaveSession && leaveSession();
  }

  render() {
    const { publish_started } = this.props;

    return (
      <video
        id="private-publisher"
        hidden={!publish_started}
        autoPlay
        playsInline
        muted
      />
    );
  }
}

Publisher.contextType = SocketContext;
export default withAntmedia(Publisher);