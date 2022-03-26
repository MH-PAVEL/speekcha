import * as React from 'react';
// import Link from 'next/link';
import { ILogin } from 'src/interfaces';
import {
  Form, Input, Button, Checkbox, Alert, Space
} from 'antd';
import { connect } from 'react-redux';
import { updateUIValue } from 'src/redux/ui/actions';
import { getResponseError } from '@lib/utils';
import FormFooterLogin from '@components/auth/login/footer-login-form';

import { useTranslation, Link } from '../../../i18n';

interface IProps {
  requesting?: boolean;
  submit(data: ILogin): Function;
  error?: string;
  success?: boolean;
  onRemember: Function;
  singularTextModel?: string;
}

const FormItem = Form.Item;

const StudioFormLogin = ({
  requesting, submit, error, success, onRemember, singularTextModel
}: IProps) => {
  const { t } = useTranslation('components');
  const [form] = Form.useForm();
  const onPressEnter = () => {
    form.submit();
  };
  return (
    <Form layout="vertical" onFinish={submit}>
      <h1>{t('Studio Sign in')}</h1>
      <FormItem
        hasFeedback
        label={t('Email')}
        name="email"
        rules={[
          { type: 'email', message: t('The input is not valid E-mail') },
          { required: true, message: t('Please input your email') }
        ]}
      >
        <Input
          onPressEnter={onPressEnter}
          placeholder="youremail@example.com"
        />
      </FormItem>
      <FormItem
        hasFeedback
        label={
          <Space>
            <span>{t('Password')}</span>
          </Space>
        }
        className="input-password"
        name="password"
        rules={[
          { required: true, message: t('Please input your password') },
          {
            min: 6,
            max: 14,
            message: `6-14 ${t('characters')}`
          }
        ]}
      >
        <Input.Password
          onPressEnter={onPressEnter}
          placeholder={t('Password')}
        />
      </FormItem>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          margin: '15px 0'
        }}
      >
        <Checkbox onChange={(e) => onRemember(e.target.checked)}>
          {t('Remember me')}
        </Checkbox>
        <Link href="/auth/forgot-password">
          <a>{t('Forgot password')}?</a>
        </Link>
      </div>
      {(error || success) && (
        <FormItem>
          {error && (
            <Alert
              message={t('Error')}
              description={getResponseError(error)}
              type="error"
              showIcon
            />
          )}
          {success && (
            <Alert
              message={t('Login success')}
              type="success"
              description={`${t('Redirecting')}...`}
            />
          )}
        </FormItem>
      )}
      <FormItem className="row-button-auth">
        <Button
          type="primary"
          htmlType="submit"
          disabled={requesting}
          loading={requesting}
        >
          {t('Sign in')}
        </Button>
      </FormItem>
      <FormFooterLogin account="studio" singularTextModel={singularTextModel} />
    </Form>
  );
};
StudioFormLogin.defaultProps = {
  requesting: false,
  error: '',
  success: false,
  singularTextModel: ''
};
const mapStateToProps = (state) => ({
  ...state.ui
});
const mapDispatchs = { updateUIValue };
export default connect(mapStateToProps, mapDispatchs)(StudioFormLogin);
