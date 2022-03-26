import { Table, Tag } from 'antd';
import React from 'react';
import { IProduct, ITransaction } from 'src/interfaces';
import { formatDate } from 'src/lib';

import { useTranslation } from '../../../i18n';

interface IProps {
  transactions: ITransaction[];
  rowKey: string;
  pageSize: number;
  total: number;
  onChange: Function;
}

export const TransactionHistoryTable = ({
  transactions,
  rowKey,
  pageSize,
  total,
  onChange
}: IProps) => {
  const { t } = useTranslation('components');
  const columns = [
    {
      title: t('Transaction ID'),
      dataIndex: '_id',
      key: '_id',
      render: (_id: string) => _id?.slice(16, 24).toUpperCase() || 'N/A'
    },
    {
      title: t('Products'),
      dataIndex: 'products',
      key: 'products',
      render(products: IProduct[]) {
        return (products || []).map((product) => (
          <p>
            <strong>{product.name}</strong> <br />
            <small>{product?.description?.slice(0, 150) || ''}</small>
          </p>
        ));
      }
    },
    {
      title: t('Price'),
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      align: 'center' as 'center',
      sorter: true,
      render: (totalPrice: number) => totalPrice?.toFixed(2) || 'N/A'
    },
    {
      title: t('Status'),
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: t('Success'), value: 'success' },
        { text: t('Pending'), value: 'pending' },
        { text: t('Canceled'), value: 'canceled' }
      ],
      onFilter: (value, record) => record.status.includes(value),
      render(status: string) {
        switch (status) {
          case 'success':
            return <Tag color="green">{t('Success')}</Tag>;
          case 'pending':
            return <Tag color="warning">{t('Pending')}</Tag>;
          case 'canceled':
            return <Tag color="default">{t('Canceled')}</Tag>;
          default:
            return <Tag color="default">{t('Canceled')}</Tag>;
        }
      }
    },
    {
      title: t('Created At'),
      dataIndex: 'createdAt',
      sorter: true,
      key: 'createdAt',
      render(date: Date) {
        return <span>{formatDate(date)}</span>;
      }
    }
  ];
  return (
    <Table
      columns={columns}
      rowKey={rowKey}
      dataSource={transactions}
      pagination={{ total, pageSize }}
      onChange={onChange.bind(this)}
    />
  );
};
