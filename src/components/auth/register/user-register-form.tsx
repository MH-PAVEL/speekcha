import * as React from 'react';
import { Form, Input, Button, DatePicker, Select, Alert } from 'antd';
import moment from 'moment';
import { ICountries } from 'src/interfaces';
import { getResponseError } from '@lib/utils';
// import Link from 'next/link';
import { connect } from 'react-redux';
import { updateUIValue } from 'src/redux/ui/actions';

import { useTranslation, Link } from '../../../../i18n';

interface IProps {
  onFinish(value: any): Function;
  submiting: boolean;
  countries: ICountries[];
  error: boolean;
  singularTextModel: string;
}

const RegisterFrom = ({
  onFinish,
  submiting,
  countries,
  error,
  singularTextModel
}: IProps) => {
  const { t } = useTranslation('components');
  const [form] = Form.useForm();
  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={onFinish}
      name="performerRegisterForm"
      initialValues={{ country: undefined }}
    >
      <h1>{t('Member register')}</h1>
      <Form.Item
        name="dateOfBirth"
        rules={[
          {
            required: true,
            message: t('Please input your date of birth')
          },
          {
            validator: (rule, value) => {
              if (!value) return Promise.resolve();
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
            required: true,
            message: t('Please input your E-mail')
          },
          {
            type: 'email',
            message: t('The input is not valid E-mail')
          }
        ]}
      >
        <Input placeholder={t('E-mail')} />
      </Form.Item>
      <Form.Item
        name="phone"
        rules={[
          { min: 9 },
          { max: 14 },
          {
            pattern: new RegExp(/^[0-9\b\\+ ]+$/),
            message: t('The phone number is not in the correct format')
          }
        ]}
      >
        <Input placeholder={t('Phone Number')} />
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
      {error && (
        <Alert
          description={getResponseError(error)}
          type="error"
          message={t('Error')}
        />
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
        {t('Are you member')}?{' '}
        <Link href="/auth/login/user">
          <a>{t('Login')}</a>
        </Link>
      </Form.Item>
      <Form.Item>
        {t('Are you a')} {singularTextModel || t('Performer')}?{' '}
        <Link href="/auth/register/model">
          <a>{t('Signup now')}</a>
        </Link>
      </Form.Item>
    </Form>
  );
};

const mapStateToProps = (state) => ({
  ...state.ui
});
const mapDispatchs = { updateUIValue };
export default connect(mapStateToProps, mapDispatchs)(RegisterFrom);
