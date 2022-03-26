import React from 'react';
import { Button, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useTranslation } from '../../../../i18n';

interface P {
  confirm: (e?: React.MouseEvent<HTMLElement>) => void;
}

const PopupConfirm = ({ confirm }: P) => {
  const { t } = useTranslation('components');
  return (
    <Popconfirm
      title={`${t('Are you sure want to delete this item')}?`}
      okText={t('Yes I want to delete')}
      cancelText={t("I dont'want to delete")}
      placement="right"
      onConfirm={confirm}
    >
      <Button type="link">
        <DeleteOutlined />
      </Button>
    </Popconfirm>
  );
};
PopupConfirm.defaultProps = {};

export default PopupConfirm;
