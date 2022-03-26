import React from 'react';
import { converDuration } from 'src/lib';
import { Table } from 'antd';
import { IPerformer } from 'src/interfaces';

import { useTranslation } from '../../../../i18n';

interface IProps {
  data: IPerformer[];
  searching: boolean;
  pageSize: number;
  total: number;
  onChange(pagination, filters, sorter, extra): Function;
}

const StudioModelStatsTable = ({
  data,
  searching,
  total,
  pageSize,
  onChange
}: IProps) => {
  const { t } = useTranslation('components');
  const columns = [
    {
      title: t('Username'),
      key: 'username',
      dataIndex: 'username'
    },
    {
      title: t('Total Favorite'),
      key: 'totalFavorite',
      render: (record) => record?.stats?.favorites || 0
    },
    {
      title: t('Total Galleries'),
      key: 'totalGalleries',
      render: (record) => record?.stats?.totalGalleries || 0
    },
    {
      title: t('Total Photos'),
      key: 'totalPhotos',
      render: (record) => record?.stats?.totalPhotos || 0
    },
    {
      title: t('Total Product'),
      key: 'totalProducts',
      render: (record) => record?.stats?.totalProducts || 0
    },
    {
      title: t('Total Videos'),
      key: 'totalVideos',
      render: (record) => record?.stats?.totalVideos || 0
    },
    {
      title: t('Total Stream Time'),
      key: 'totalStreamTime',
      render: (record) => converDuration(record?.stats?.totalStreamTime || 0)
    },
    {
      title: t('Total Earned'),
      key: 'totalTokenEarned',
      render: (record) => record?.stats?.totalTokenEarned
    },
    {
      title: t('Status'),
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <span style={{ textTransform: 'capitalize' }}>{status}</span>
      )
    }
  ];
  const dataSource = data.map((d) => ({ ...d, key: d._id }));
  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      loading={searching}
      pagination={{ pageSize, total }}
      onChange={onChange}
      scroll={{ x: true }}
    />
  );
};
export default StudioModelStatsTable;
