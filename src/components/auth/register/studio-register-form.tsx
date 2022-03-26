import * as React from 'react';
import { Form, Input, Button, Select, Alert, Upload } from 'antd';
import { ICountries } from 'src/interfaces';
import { connect } from 'react-redux';
import { updateUIValue } from 'src/redux/ui/actions';
import { getResponseError } from '@lib/utils';
import { UploadOutlined } from '@ant-design/icons';
// import Link from 'next/link';
import { useTranslation, Link } from '../../../../i18n';

interface IProps {
  onFinish(value: any): Function;
  submiting?: boolean;
  countries: ICountries[];
  error: boolean;
  errorMessage: any;
  singularTextModel?: string;
}

const StudioRegisterForm = ({
  onFinish,
  submiting,
  countries,
  error,
  errorMessage,
  singularTextModel
}: IProps) => {
  const { t } = useTranslation('components');
  const [documentVerification, setDocumentVerification] = React.useState('');
  const [form] = Form.useForm();
  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={onFinish}
      name="studioRegisterForm"
      initialValues={{ country: undefined, gender: 'male' }}
    >
      <h1>{t('Studio register')}</h1>
      <Form.Item
        name="firstName"
        rules={[
          {
            pattern: new RegExp('^[a-zA-Z0-9 ]*$'),
            message: t('Alphanumeric')
          },
          {
            whitespace: true,
            message: t('Please input your first name')
          }
        ]}
      >
        <Input placeholder={t('First Name')} />
      </Form.Item>
      <Form.Item
        name="lastName"
        rules={[
          {
            pattern: new RegExp('^[a-zA-Z0-9 ]*$'),
            message: t('Alphanumeric')
          },
          {
            whitespace: true,
            message: t('Please input your last name')
          }
        ]}
      >
        <Input placeholder={t('Last Name')} />
      </Form.Item>
      <Form.Item
        name="name"
        rules={[
          {
            required: true,
            message: t('Please input your studio name')
          },
          {
            pattern: new RegExp('^[a-zA-Z0-9 ]*$'),
            message: t('Alphanumeric')
          },
          {
            whitespace: true,
            message: t('Please input your studio name')
          }
        ]}
      >
        <Input placeholder={t('Studio Name')} />
      </Form.Item>
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: t('Username is required')
          },
          {
            pattern: new RegExp('^[a-zA-Z0-9]*$'),
            message: t('Dont allow special chars or space')
          }
        ]}
      >
        <Input placeholder={t('Username')} />
      </Form.Item>
      <Form.Item
        name="email"
        rules={[
          {
            type: 'email',
            message: t('The input is not valid E-mail')
          },
          {
            required: true,
            message: t('Please input your E-mail')
          }
        ]}
      >
        <Input placeholder={t('E-mail')} />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: t('Please input your password')
          },
          {
            min: 6,
            max: 14,
            message: t('Passoword should be 6-14 characters')
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
      <Form.Item
        name="country"
        rules={[{ required: true, message: t('Please input your country') }]}
      >
        <Select showSearch placeholder={t('Country')}>
          {countries.length > 0 &&
            countries.map((country) => (
              <Select.Option value={country.name} key={country.code}>
                {country.name}
              </Select.Option>
            ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="documentVerification"
        rules={[
          {
            required: true,
            message: t('Verification document is required')
          }
        ]}
      >
        <Upload
          showUploadList={false}
          customRequest={() => true}
          fileList={[]}
          onChange={(files) => setDocumentVerification(files.file.name)}
        >
          <Button>
            <UploadOutlined /> {t('Upload Document For Verification')}
          </Button>
          {documentVerification && (
            <span className="file-name">{documentVerification}</span>
          )}
        </Upload>
      </Form.Item>
      {error && (
        <Form.Item>
          <Alert
            description={getResponseError(errorMessage)}
            type="error"
            message={t('Error')}
          />
        </Form.Item>
      )}
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={submiting}
          disabled={submiting}
          className="btn-submit"
        >
          {t('Register new account')}
        </Button>
      </Form.Item>
      <Form.Item>
        {t('Want to be a Member')}?{' '}
        <Link href="/auth/register/user">
          <a>{t('Signup here')}</a>
        </Link>
      </Form.Item>
      <Form.Item>
        {t('Are you a')} {singularTextModel || t('Performer')}?{' '}
        <Link href="/auth/login/performer">
          <a>{t('Login here')}</a>
        </Link>
      </Form.Item>
      <Form.Item>
        {t('Are you a studio')}?{' '}
        <Link href="/studio/login">
          <a>{t('Login here')}</a>
        </Link>
      </Form.Item>
    </Form>
  );
};
StudioRegisterForm.defaultProps = {
  submiting: false,
  singularTextModel: ''
};
const mapStateToProps = (state) => ({
  ...state.ui
});
const mapDispatchs = { updateUIValue };
export default connect(mapStateToProps, mapDispatchs)(StudioRegisterForm);
