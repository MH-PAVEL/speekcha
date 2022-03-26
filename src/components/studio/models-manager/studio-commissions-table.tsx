import { formatDate } from 'src/lib';
import { Table, Button } from 'antd';
import { IPerformer } from 'src/interfaces';
import React from 'react';

import { useTranslation } from '../../../../i18n';

interface IProps {
  data: IPerformer[];
  searching: boolean;
  // pagination?: any;
  pageSize: number;
  total: number;
  update: Function;
  onChange(pagination, filters, sorter, extra): Function;
}

const StudioCommissionsTable = ({
  data,
  searching,
  total,
  pageSize,
  update,
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
      title: t('Commission'),
      key: 'commission',
      dataIndex: 'commissionSetting',
      render(commissionSetting) {
        const { memberCommission } = commissionSetting;
        return <span>{memberCommission}%</span>;
      }
    },
    {
      title: t('Created At'),
      key: 'studioCommission',
      dataIndex: 'createdAt',
      render(createdAt: Date) {
        return <span>{formatDate(createdAt)}</span>;
      }
    },
    {
      title: t('Actions'),
      key: 'actions',
      dataIndex: '_id',
      render: (_id: string) => (
        <Button type="primary" onClick={() => update(_id)}>
          {t('Update')}
        </Button>
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

export default StudioCommissionsTable;
