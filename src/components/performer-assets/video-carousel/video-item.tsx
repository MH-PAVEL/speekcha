import React from 'react';
// import Link from 'next/link';
import { IVideo } from 'src/interfaces';
import { Tag } from 'antd';
import { LockOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { formatDuration, defaultColor } from 'src/lib';
import NumberFormat from '@components/common/layout/numberformat';

import { useTranslation, Link } from '../../../../i18n';

interface IProps {
  video: IVideo;
}
const generateToken = (token: number, isSale: boolean, t: any) => (
  <Tag color={isSale ? defaultColor.primaryColor : defaultColor.successColor}>
    {isSale ? <NumberFormat value={token} suffix={t('Tokens')} /> : t('FREE')}
  </Tag>
);

export default ({ video }: IProps) => {
  const { t } = useTranslation('components');
  return (
    <div className="item">
      <div
        className="item-image"
        style={{
          backgroundImage: `url(${
            video.thumbnail || video?.video?.thumbnails[0] || '/no-image.jpg'
          })`
        }}
      >
        <div className="value">
          {generateToken(video.token, video.isSaleVideo, t)}
        </div>

        {video.isSaleVideo && !video.isBought && (
          <div className="item-lock">
            <LockOutlined />
          </div>
        )}
        {video.video && video.video.duration && (
          <div className="item-duration ant-tag ant-tag-has-color">
            {formatDuration(video.video.duration)}
          </div>
        )}
        <Link
          shallow={false}
          href={{
            pathname: '/videos/detail',
            query: { id: video._id, data: JSON.stringify(video) }
          }}
          as={`/video/${video._id}`}
        >
          <a>
            <PlayCircleOutlined className="icon-play" />
          </a>
        </Link>
      </div>
      <div className="item-title">
        <span className="item-name">{video.title}</span>
      </div>
    </div>
  );
};
