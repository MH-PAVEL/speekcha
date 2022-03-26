import { Table, Tag } from 'antd';
import React from 'react';
import { IRefundRequest } from 'src/interfaces';
import { formatDate } from 'src/lib';

import { useTranslation } from '../../../i18n';

interface IProps {
  requests: IRefundRequest[];
  rowKey: string;
  pageSize: number;
  total: number;
  onChange: Function;
}

export const RefundRequestTable = ({
  requests,
  rowKey,
  pageSize,
  total,
  onChange
}: IProps) => {
  const { t } = useTranslation('components');
  const columns = [
    {
      title: t('Performer'),
      dataIndex: 'performerId',
      key: 'performerId',
      render(data, record) {
        return <span>{record?.performerInfo?.username || 'N/A'}</span>;
      }
    },
    {
      title: t('Product'),
      dataIndex: 'sourceId',
      key: 'sourceId',
      render(data, record) {
        return (
          <span>
            {(record.productInfo && record.productInfo.name) || 'N/A'}
          </span>
        );
      }
    },
    {
      title: t('Qty'),
      dataIndex: 'sourceId',
      render(data, record) {
        return (
          <span>
            {(record.orderInfo && record.orderInfo.quantity) || 'N/A'}
          </span>
        );
      }
    },
    {
      title: t('Tokens'),
      dataIndex: 'token',
      align: 'center' as 'center',
      render(data) {
        return <span>{data}</span>;
      }
    },
    {
      title: t('Order Number'),
      align: 'center' as 'center',
      render: (record) => record?.orderInfo?.orderNumber || 'N/A'
    },
    {
      title: t('Status'),
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: t('Resolved'), value: 'resolved' },
        { text: t('Pending'), value: 'pending' },
        { text: t('Rejected'), value: 'rejected' }
      ],
      onFilter: (value, record) => record.status.includes(value),
      render(status: string) {
        switch (status) {
          case 'resolved':
            return <Tag color="green">{t('Resolved')}</Tag>;
          case 'pending':
            return <Tag color="warning">{t('Pending')}</Tag>;
          case 'rejected':
            return <Tag color="default">{t('Rejected')}</Tag>;
          default:
            return <Tag color="default">{t('Rejected')}</Tag>;
        }
      }
    },
    {
      title: t('Last updated at'),
      dataIndex: 'updatedAt',
      sorter: true,
      key: 'updatedAt',
      render(date: Date) {
        return <span>{formatDate(date)}</span>;
      }
    }
  ];
  return (
    <Table
      columns={columns}
      rowKey={rowKey}
      dataSource={requests}
      pagination={{ total, pageSize }}
      onChange={onChange.bind(this)}
    />
  );
};
