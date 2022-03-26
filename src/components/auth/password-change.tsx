import * as React from 'react';
import { Form, Button, Input } from 'antd';
import { useTranslation, Link } from '../../../i18n';

interface P {
  onFinish: (v) => void;
  submiting?: boolean;
}

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 12
    }
  },
  wrapperCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 12
    }
  }
};

const PasswordChange = ({ onFinish, submiting }: P) => {
  const { t } = useTranslation('components');
  return (
    <Form layout="vertical" onFinish={onFinish} {...formItemLayout}>
      <Form.Item
        name="prePassword"
        label={t('Old Password')}
        rules={[
          {
            required: true,
            message: t('Please input your old password')
          },
          {
            min: 6,
            max: 14,
            message: `6-14 ${t('characters')}`
          }
        ]}
        hasFeedback
      >
        <Input.Password placeholder={t('Old Password')} />
      </Form.Item>
      <Form.Item
        name="password"
        label={t('New Password')}
        rules={[
          {
            required: true,
            message: t('Please input your password')
          },
          {
            min: 6,
            max: 14,
            message: `6-14 ${t('characters')}`
          }
        ]}
        hasFeedback
      >
        <Input.Password placeholder={t('Password')} />
      </Form.Item>
      <Form.Item
        name="confirm"
        dependencies={['password']}
        hasFeedback
        label={t('Retype password')}
        rules={[
          {
            required: true,
            message: t('Please confirm your password')
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject(
                new Error(t('The two passwords that you entered do not match'))
              );
            }
          })
        ]}
      >
        <Input.Password placeholder={t('Confirm Password')} />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={submiting}
          disabled={submiting}
          className="btn-submit"
        >
          {t('Save Changes')}
        </Button>
      </Form.Item>
    </Form>
  );
};

PasswordChange.defaultProps = {
  submiting: false
};
export default PasswordChange;
