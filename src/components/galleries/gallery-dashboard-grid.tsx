import * as React from 'react';
import { IPerformerGallery } from 'src/interfaces';
import { Card, Space, Tag, Alert, Button } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import { EditOutlined } from '@ant-design/icons';
import { capitalizeFirstLetter } from 'src/lib/string';
import { formatDate } from 'src/lib';
import TrashButton from '@components/common/base/trash';
import './index.less';
import NumberFormat from '@components/common/layout/numberformat';
import Router from 'next/router';

import { useTranslation } from '../../../i18n';

interface IProps {
  data: IPerformerGallery[];
  success?: boolean;
  error?: any;
  searching?: boolean;
  title?: string | string[];
  addGalleries?: Function;
  hasMore?: boolean;
  remove?: Function;
}

const renderActiveTag = (status: 'draft' | 'active' | 'inactive', t: any) => {
  // const { t } = useTranslation('components');
  switch (status) {
    case 'active':
      return (
        <Tag color="success" className="photo-status">
          {t('Active')}
        </Tag>
      );
    case 'inactive':
      return (
        <Tag color="warning" className="photo-status">
          {t('Inactive')}
        </Tag>
      );
    case 'draft':
      return (
        <Tag color="default" className="photo-status">
          {t('Inactive')}
        </Tag>
      );
    default:
      return <></>;
  }
};

const renderSale = (isSale: boolean, token: number, t: any) => {
  switch (isSale) {
    case true:
      return (
        <Tag color="#87d068" className="sale-tag">
          <NumberFormat value={token} suffix={t('Tokens')} />
        </Tag>
      );
    case false:
      return (
        <Tag color="#f50" className="sale-tag">
          {t('Free')}
        </Tag>
      );
    default:
      return <></>;
  }
};

const Dashboard = ({
  data,
  searching,
  title,
  hasMore,
  addGalleries,
  success,
  remove,
  error
}: IProps) => {
  const { t } = useTranslation('components');
  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={addGalleries}
      hasMore={hasMore}
      loader={<p key={0}>{t('Loading')}...</p>}
    >
      <Card className="photo-grid" title={title} bordered={false}>
        {!searching ? (
          success &&
          (data.length > 0 ? (
            data.map((gallery) => (
              <Card.Grid className="photo-box" key={gallery._id}>
                <div className="photo-thumbnail">
                  <img
                    src={
                      (gallery.coverPhotoId &&
                        gallery.coverPhoto &&
                        gallery.coverPhoto.thumbnails[0]) ||
                      '/gallery.png'
                    }
                    alt=""
                  />
                  <Space className="actions">
                    <Button
                      type="link"
                      onClick={() =>
                        Router.push(
                          {
                            pathname: '/account/performer/galleries/update',
                            query: { data: JSON.stringify(gallery) }
                          },
                          `/account/performer/galleries/${gallery._id}/update`
                        )
                      }
                    >
                      <EditOutlined />
                    </Button>
                    <TrashButton confirm={() => remove(gallery._id)} />
                  </Space>
                  {renderActiveTag(gallery.status, t)}
                  {renderSale(gallery.isSale, gallery.token, t)}
                </div>
                <div className="photo-info">
                  <span>{capitalizeFirstLetter(gallery.name)}</span>
                  <span>
                    {gallery.numOfItems} {t('Items')}
                  </span>
                </div>
                <div className="photo-description">
                  {t('Created On')}{' '}
                  {formatDate(gallery.createdAt, 'DD MMMM YYYY')}
                </div>
                <div className="photo-description">{gallery.description}</div>
              </Card.Grid>
            ))
          ) : (
            <p>{t('No items')}</p>
          ))
        ) : (
          <p>{t('Loading')}...</p>
        )}
      </Card>
      {error && <Alert type="error" message="Error request" banner />}
    </InfiniteScroll>
  );
};
Dashboard.defaultProps = {
  success: false,
  error: false,
  searching: false,
  title: '',
  addGalleries: null,
  hasMore: false,
  remove: null
};

export default Dashboard;
