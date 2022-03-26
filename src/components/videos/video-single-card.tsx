import { Tag } from 'antd';
import React from 'react';
import { IVideo } from 'src/interfaces';
import { defaultColor } from 'src/lib';
// import Link from 'next/link';
import './index.less';
import NumberFormat from '@components/common/layout/numberformat';

import { useTranslation, Link } from '../../../i18n';

interface IProps {
  video: IVideo;
}

const generateToken = (token: number, isSale: boolean, t: any) =>
  token && (
    <Tag color={token > 0 ? defaultColor.primaryColor : '#ccc'}>
      {isSale && token > 0 ? (
        <NumberFormat value={token} suffix={t('tokens')} />
      ) : (
        t('FREE')
      )}
    </Tag>
  );

const VideoSingleCard = ({ video }: IProps) => {
  const { t } = useTranslation('components');
  const { token, title, thumbnail, isSaleVideo, _id } = video;
  return (
    <div className="video-single-card">
      <div className="video-single-card-thumb">
        <div className="value">{generateToken(token, isSaleVideo, t)}</div>
        <Link
          href={{
            pathname: '/videos/detail',
            query: { id: _id, data: JSON.stringify(video) }
          }}
          as={`/video/${_id}`}
        >
          <a>
            <img
              src={
                (thumbnail && thumbnail !== 'null' && thumbnail) ||
                video.video.thumbnails[0]
              }
              alt=""
            />
          </a>
        </Link>
      </div>
      <div className="info">{t(title)}</div>
    </div>
  );
};

export default VideoSingleCard;
