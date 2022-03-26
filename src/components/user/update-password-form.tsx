import React from 'react';
import { Form, Button, Input } from 'antd';
import { useTranslation } from '../../../i18n';

export const UpdatePaswordForm = ({ onFinish, updating = false }: any) => {
  const { t } = useTranslation('components');
  return (
    <Form name="nest-messages" onFinish={onFinish.bind(this)}>
      <Form.Item
        name="password"
        label={t('Password')}
        rules={[
          { required: true, message: t('Please input your password'), min: 6 }
        ]}
      >
        <Input.Password
          placeholder={t('Enter password. At least 6 characters')}
        />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 4 }}>
        <Button
          type="primary"
          htmlType="submit"
          disabled={updating}
          loading={updating}
        >
          {t('Update')}
        </Button>
      </Form.Item>
    </Form>
  );
};
