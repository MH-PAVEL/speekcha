import * as React from 'react';
import { Form, Input, Button, DatePicker, Select, Upload, Alert } from 'antd';
import moment from 'moment';
import { connect } from 'react-redux';
import { updateUIValue } from 'src/redux/ui/actions';
import { ICountries } from 'src/interfaces';
import { getResponseError } from '@lib/utils';
import { UploadOutlined } from '@ant-design/icons';
// import Link from 'next/link';
import { usernamePatternRule } from '@lib/rules';

import { useTranslation, Link } from '../../../../i18n';

interface IProps {
  onFinish(value: any): Function;
  submiting: boolean;
  countries: ICountries[];
  error: boolean;
  singularTextModel?: string;
}

const RegisterFrom = ({
  onFinish,
  submiting,
  countries,
  error,
  singularTextModel
}: IProps) => {
  const { t } = useTranslation('components');
  const [idVerification, setIdVerification] = React.useState('');
  const [documentVerification, setDocumentVerification] = React.useState('');
  const [form] = Form.useForm();

  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={onFinish}
      name="performerRegisterForm"
      initialValues={{ country: undefined, gender: 'female' }}
    >
      <h1>
        {singularTextModel || t('Performer')} {t('register')}
      </h1>
      <Form.Item
        name="dateOfBirth"
        rules={[
          {
            required: true,
            message: t('Please input your date of birth')
          },
          {
            validator: (rule, value) => {
              const years = moment().diff(value, 'years');
              if (years >= 18) {
                return Promise.resolve();
              }
              return Promise.reject(new Error(t('Minimum of 18 years')));
            }
          }
        ]}
      >
        <DatePicker placeholder={t('Date of Birth')} />
      </Form.Item>
      <Form.Item
        name="firstName"
        rules={[
          {
            required: true,
            message: t('Please input your first name')
          },
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
            required: true,
            message: t('Please input your last name')
          },
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
        name="username"
        rules={[
          {
            required: true,
            message: t('Username is required')
          },
          usernamePatternRule
        ]}
      >
        <Input placeholder={t('Username')} />
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
      <Form.Item name="gender">
        <Select placeholder={t('Gender')}>
          <Select.Option value="male" key="male">
            {t('Male')}
          </Select.Option>
          <Select.Option value="female" key="female">
            {t('Female')}
          </Select.Option>
          {/* <Select.Option value="transgender" key="transgender">
            Transgender
          </Select.Option> */}
        </Select>
      </Form.Item>
      <Form.Item
        name="documentVerification"
        rules={[
          {
            required: false,
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
      <Form.Item
        name="idVerification"
        rules={[
          {
            required: false,
            message: t('Id Verifycation is required')
          }
        ]}
      >
        <Upload
          showUploadList={false}
          customRequest={() => true}
          fileList={[]}
          onChange={(files) => setIdVerification(files.file.name)}
        >
          <Button>
            <UploadOutlined />
            {t('Upload ID For Verification')}
          </Button>
          {idVerification && (
            <span className="file-name">{idVerification}</span>
          )}
        </Upload>
      </Form.Item>
      {/* {!idVerification && !documentVerification && (
        <div style={{ color: 'red', paddingBottom: '10px' }}>Please upload at least ID or document!</div>
      )} */}
      {error && (
        <Form.Item>
          <Alert
            description={getResponseError(error)}
            type="error"
            message={t('Error')}
          />
        </Form.Item>
      )}

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          disabled={submiting}
          loading={submiting}
          className="btn-submit"
        >
          {t('Register new account')}
        </Button>
      </Form.Item>
      <Form.Item>
        {t('Are you a')} {singularTextModel || t('Performer')}?{' '}
        <Link href="/auth/login/performer">
          <a>{t('Login')}</a>
        </Link>
      </Form.Item>
      <Form.Item>
        {t('Want to be a member')}?{' '}
        <Link href="/auth/register/user">
          <a>{t('Signup now')}</a>
        </Link>
      </Form.Item>
    </Form>
  );
};

const mapStateToProps = (state) => ({
  ...state.ui
});
RegisterFrom.defaultProps = {
  singularTextModel: ''
};
const mapDispatchs = { updateUIValue };
export default connect(mapStateToProps, mapDispatchs)(RegisterFrom);
