import { getAge } from 'src/lib';
import { Table, Tag } from 'antd';
import { IPerformer } from 'src/interfaces';
import React from 'react';
import Button from './button-update-status-member';

import { useTranslation } from '../../../../i18n';

interface IProps {
  placeholderAvatarUrl?: string;
  data: IPerformer[];
  searching: boolean;
  // pagination?: any;
  pageSize: number;
  total: number;
  updateMemberStatus: Function;
  onChange(pagination, filters, sorter, extra): Function;
}

const StudioModelsTable = ({
  data,
  searching,
  total,
  pageSize,
  updateMemberStatus,
  onChange,
  placeholderAvatarUrl
}: IProps) => {
  const { t } = useTranslation('components');
  const columns = [
    {
      title: t('Avatar'),
      key: 'avatar',
      dataIndex: 'avatar',
      render(avatar: string) {
        return (
          <img
            src={avatar || placeholderAvatarUrl || '/no-avatar.png'}
            style={{ width: '100px ' }}
            alt=""
          />
        );
      }
    },
    {
      title: t('Email'),
      key: 'email',
      dataIndex: 'email'
    },
    {
      title: t('Username'),
      key: 'username',
      dataIndex: 'username'
    },
    {
      title: t('Age'),
      key: 'age',
      dataIndex: 'dateOfBirth',
      render: (dateOfBirth) => getAge(dateOfBirth)
    },
    {
      title: t('Gender'),
      key: 'gender',
      dataIndex: 'gender'
    },
    {
      title: t('Country'),
      key: 'country',
      dataIndex: 'country'
    },
    // {
    //   title: 'Total Stream Time',
    //   key: 'totalStreamTime',
    //   render(record) {
    //     return <span>{converDuration(record.stats.totalStreamTime)}</span>;
    //   }
    // },
    // {
    //   title: 'Earned',
    //   key: 'totalTokenEarned',
    //   render(record) {
    //     return <span>${record.stats.totalTokenEarned}</span>;
    //   }
    // },
    {
      title: t('Status'),
      key: 'status',
      dataIndex: 'status',
      render(status: string) {
        switch (status) {
          case 'active':
            return <Tag color="green">{t('Active')}</Tag>;
          case 'inactive':
            return <Tag color="Red">{t('Inactive')}</Tag>;
          case 'pending':
            return <Tag color="orange">{t('Pending')}</Tag>;
          default:
            return <Tag color="orange">{t('Pending')}</Tag>;
        }
      }
    },
    {
      title: t('Actions'),
      key: 'actions',
      render: (member) => (
        <Button member={member} updateMemberStatus={updateMemberStatus} />
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
StudioModelsTable.defaultProps = { placeholderAvatarUrl: '' };
export default StudioModelsTable;
