import * as React from 'react';
import { Table } from 'antd';
import { Breakpoint } from 'src/lib';

import { useTranslation } from '../../../i18n';

interface IProps {
  earnings: any;
  searching: boolean;
  total: number;
  pageSize: number;
  onChange(pagination, filters, sorter, extra): Function;
}

const breakPoint: Breakpoint[] = ['md'];

const EarningHistoryTable = ({
  earnings,
  searching,
  total,
  pageSize,
  onChange
}: IProps) => {
  const { t } = useTranslation('components');
  const columns = [
    {
      title: t('Commission Time'),
      key: 'daterange',
      responsive: breakPoint,
      render(data, record) {
        return <span>{`${record.fromDate} - ${record.toDate}`}</span>;
      }
    },
    {
      title: t('Amount'),
      dataIndex: 'amount',
      key: 'amount'
    },
    {
      title: t('Type'),
      key: 'type',
      dataIndex: 'type'
    },
    {
      title: t('From'),
      dataIndex: 'performer',
      key: 'performer'
    },
    {
      title: t('Date & Time'),
      dataIndex: 'time',
      key: 'time'
    }
  ];
  const dataSource = earnings.map((p) => ({ ...p, key: p._id }));

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      className="table"
      pagination={{
        total,
        pageSize
      }}
      scroll={{ x: true }}
      showSorterTooltip={false}
      loading={searching}
      onChange={onChange}
    />
  );
};

export default EarningHistoryTable;
