import * as React from 'react';
import { IPhoto } from 'src/interfaces';
// import Link from 'next/link';
import { Card, Space, Tag } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import { EditOutlined } from '@ant-design/icons';
import { capitalizeFirstLetter } from 'src/lib/string';
import { formatDate } from 'src/lib';
import TrashButton from '@components/common/base/trash';
// import Loader from '@components/common/base/loader';
import { useTranslation, Link } from '../../../i18n';

import './index.less';

interface IProps {
  data: IPhoto[];
  success?: boolean;
  // error?: any;
  searching?: boolean;
  title?: string | string[];
  addPhotos?: Function;
  hasMore?: boolean;
  remove?: Function;
}

const renderActiveTag = (status: 'draft' | 'active' | 'inactive', t: any) => {
  switch (status) {
    case 'active':
      return (
        <Tag color="#87d068" className="photo-status">
          {t('Active')}
        </Tag>
      );
    case 'inactive':
      return (
        <Tag color="#f50" className="photo-status">
          {t('Inactive')}
        </Tag>
      );
    case 'draft':
      return <Tag className="photo-status">{t('Inactive')}</Tag>;
    default:
      return <></>;
  }
};

const PhotoDashboard = ({
  data,
  searching,
  title,
  hasMore,
  addPhotos,
  success,
  remove
}: IProps) => {
  const { t } = useTranslation('components');
  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={addPhotos}
      hasMore={hasMore}
      loader={<p key={0}>{t('Loading')}...</p>}
    >
      <Card className="photo-grid" title={title} bordered={false}>
        {!searching ? (
          success &&
          (data.length > 0 ? (
            data.map((photo) => (
              <Card.Grid className="photo-box" key={photo._id}>
                <div className="photo-thumbnail">
                  <img
                    src={photo.photo.thumbnails[0] || '/no-image.jpg'}
                    alt=""
                  />
                  <Space className="actions">
                    <Link
                      href={{
                        pathname: '/account/performer/photos/update',
                        query: { data: JSON.stringify(photo) }
                      }}
                      as={`/account/performer/photos/${photo._id}/update`}
                    >
                      <EditOutlined style={{ color: '#ff0066' }} />
                    </Link>
                    <TrashButton confirm={() => remove(photo._id)} />
                  </Space>
                  {renderActiveTag(photo.status, t)}
                </div>
                <div className="photo-info">
                  <span>{capitalizeFirstLetter(photo.title)}</span>
                </div>
                <div className="photo-description">
                  {t('Created at')}{' '}
                  {formatDate(photo.createdAt, 'DD MMMM YYYY')}
                </div>
                <div className="photo-description">
                  <Link
                    href={{
                      pathname: '/account/performer/galleries/update',
                      query: { data: JSON.stringify(photo.gallery) }
                    }}
                    as={`/account/performer/galleries/${photo.gallery._id}/update`}
                  >
                    {photo.gallery.name}
                  </Link>
                </div>
              </Card.Grid>
            ))
          ) : (
            <p>{t('No items')}</p>
          ))
        ) : (
          <p>{t('Loading')}...</p>
        )}
      </Card>
    </InfiniteScroll>
  );
};

PhotoDashboard.defaultProps = {
  success: false,
  // error: null,
  searching: false,
  title: '',
  addPhotos: null,
  hasMore: false,
  remove: null
};
export default PhotoDashboard;
