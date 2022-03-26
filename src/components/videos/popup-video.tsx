/* eslint-disable dot-notation */
/* eslint-disable no-return-assign */
import React from 'react';
import Popup from '@components/common/base/popup';
import videojs from 'video.js';
// import { withTranslation } from '../../../i18n';

interface IProps {
  t: any;
}

class PopupVideoDetail extends React.PureComponent<IProps> {
  popup: any;

  handler(src: string) {
    let video = document.querySelector('#video');
    if (!video) {
      video = document.createElement('video');
      video.setAttribute('id', 'video');
      video.setAttribute('class', 'video-js');
      video.setAttribute('autoplay', 'autoplay');
      document.querySelector('.ant-modal-body').append(video);
    }

    if (!window['video-player']) {
      window['video-player'] = videojs('video', {
        poster: '/xcam-logo-black.png',
        controls: true
      });
    }

    window['video-player'].src({ type: 'video/mp4', src });
    window['video-player'].play();
    // window['video'].on()
  }

  onOk() {
    window['video-player'] = window['video-player'].pause();
    // window['video-player'].poster = '/xcam-logo-black.png';
    this.popup.setVisible(false);
  }

  showModalBuyAssets(videoUrl: string) {
    this.popup.setVisible(true);
    setTimeout(() => this.handler(videoUrl), 500);
  }

  render() {
    const { t } = this.props;
    return (
      <Popup
        title={t('Video detail')}
        t={t}
        ref={(ref) => (this.popup = ref)}
        content={<></>}
        onOk={this.onOk.bind(this)}
        onCancel={this.onOk.bind(this)}
      />
    );
  }
}

// export default withTranslation('components')(PopupVideoDetail);
export default PopupVideoDetail;
