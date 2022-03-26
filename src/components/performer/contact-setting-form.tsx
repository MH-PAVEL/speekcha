import * as React from 'react';
import { ICountries, IPerformer } from 'src/interfaces';
import { Form, Input, Button, Row, Col } from 'antd';
import Countries from '@components/common/base/select/countries';

import './index.less';
import { useTranslation } from '../../../i18n';

interface IProps extends IPerformer {
  onFinish(data: any): Function;
  countries: ICountries[];
  loading: boolean;
}

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 4
    }
  },
  wrapperCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 16
    }
  }
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 16,
      offset: 0
    }
  }
};

const UserProfile = ({
  firstName,
  lastName,
  onFinish,
  email,
  country,
  phone,
  city,
  loading,
  address,
  zipcode,
  state,
  countries
}: IProps) => {
  const [form] = Form.useForm();
  const { t } = useTranslation('components');

  return (
    <Form
      {...formItemLayout}
      form={form}
      onFinish={onFinish}
      name="contactSettingForm"
      className="performerEditForm"
      initialValues={{
        country,
        firstName,
        lastName,
        email,
        phone,
        city,
        address,
        zipcode,
        state
      }}
      layout="vertical"
    >
      <Row gutter={25}>
        <Col sm={12} xs={24}>
          <Form.Item
            name="firstName"
            label={t('First Name')}
            rules={[
              {
                pattern: new RegExp('^[a-zA-Z0-9 ]*$'),
                message: t('Alphanumeric')
              },
              {
                whitespace: true,
                message: t('Please input your first name')
              },
              {
                required: true,
                message: t('Please input your first name')
              }
            ]}
          >
            <Input placeholder={t('First name')} />
          </Form.Item>
          <Form.Item
            name="lastName"
            label={t('Last Name')}
            rules={[
              {
                pattern: new RegExp('^[a-zA-Z0-9 ]*$'),
                message: t('Alphanumeric')
              },
              {
                whitespace: true,
                message: t('Please input your last name')
              },
              {
                required: true,
                message: t('Please input your last name')
              }
            ]}
          >
            <Input placeholder={t('Last name')} />
          </Form.Item>
          <Form.Item
            name="country"
            label={t('Country')}
            rules={[
              { required: true, message: t('Please input your country') }
            ]}
          >
            <Countries defaultValue={country} countries={countries} />
          </Form.Item>
          <Form.Item name="state" label={t('State Name')}>
            <Input placeholder={t('samplestate')} />
          </Form.Item>
          <Form.Item name="city" label={t('City')}>
            <Input placeholder={t('samplecity')} />
          </Form.Item>
        </Col>
        <Col sm={12} xs={24}>
          <Form.Item name="zipcode" label={t('Zip')}>
            <Input placeholder="012345-678" />
          </Form.Item>
          <Form.Item name="address" label={t('Address')}>
            <Input placeholder={t('Address')} />
          </Form.Item>
          <Form.Item
            name="email"
            label={t('E-mail')}
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
            <Input placeholder="test@example.com" />
          </Form.Item>
          <Form.Item
            name="phone"
            label={t('Mobile Phone')}
            rules={[
              {
                min: 8,
                max: 14,
                message: t('8-14 digits')
              }
            ]}
          >
            <Input placeholder="+18000 0000" />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item {...tailFormItemLayout}>
        <Button
          type="primary"
          htmlType="submit"
          disabled={loading}
          loading={loading}
        >
          {t('Save Changes')}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserProfile;
