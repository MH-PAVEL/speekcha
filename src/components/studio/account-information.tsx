import * as React from 'react';
import { ICountries, IStudio } from 'src/interfaces';
import { UploadOutlined } from '@ant-design/icons';
import { Form, Input, Button, Row, Col, Upload } from 'antd';
import Countries from '@components/common/base/select/countries';
import './index.less';
import { TOKEN } from '@services/api-request';
import { studioService } from 'src/services';
import cookie from 'js-cookie';

import { useTranslation } from '../../../i18n';

interface IProps extends IStudio {
  countries: ICountries[];
  onFinish(data: any): Function;
  loading: boolean;
}

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 24
    }
  },
  wrapperCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 24
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

const StudioInformation = ({
  onFinish,
  loading,
  name,
  firstName,
  lastName,
  username,
  email,
  country,
  state,
  // minPayment,
  phone,
  address,
  city,
  zipcode,
  documentVerificationId,
  documentVerification,
  countries
}: IProps) => {
  const { t } = useTranslation('components');
  const [certificateId, setCertificateId] = React.useState(
    documentVerificationId
  );
  const [certificate, setCertificate] = React.useState([]);
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (documentVerification) {
      setCertificate([
        {
          uid: documentVerification._id,
          name: documentVerification.name,
          status: 'done',
          url: documentVerification.url
        }
      ]);
    }
  }, []);

  const onCertificateChange = ({ file, fileList }) => {
    if (file.status === 'done' && file.response) {
      const { data } = file.response;
      setCertificateId(data.file._id);
      setCertificate([
        {
          uid: data.file._id,
          name: data.file.name,
          status: 'done',
          url: data.url
        }
      ]);
    } else {
      setCertificate(fileList);
    }
  };

  const submit = (values) => {
    onFinish({ ...values, documentVerificationId: certificateId });
  };
  return (
    <Form
      {...formItemLayout}
      form={form}
      onFinish={submit}
      name="contactSettingForm"
      className="performerEditForm"
      initialValues={{
        firstName,
        lastName,
        name,
        username,
        email,
        country,
        city,
        state,
        phone,
        address,
        zipcode
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
              }
            ]}
          >
            <Input placeholder={t('Last name')} />
          </Form.Item>
          <Form.Item
            name="name"
            label={t('Studio Name')}
            rules={[
              {
                pattern: new RegExp('^[a-zA-Z0-9 ]*$'),
                message: t(
                  'Studio name must be according to Alphanumeric formating'
                )
              },
              {
                whitespace: true,
                message: t('Please input your Studio name')
              },
              {
                required: true,
                message: t('Please input your Studio name')
              }
            ]}
          >
            <Input placeholder={t('Studio Name')} />
          </Form.Item>
          <Form.Item
            name="username"
            label={t('Username')}
            rules={[
              {
                pattern: new RegExp('^[a-zA-Z0-9 ]*$'),
                message: t('Username must according to Alphanumeric formating')
              },
              {
                whitespace: true,
                message: t('Please input your username')
              },
              {
                required: true,
                message: t('Please input your username')
              }
            ]}
          >
            <Input placeholder={t('Last Name')} />
          </Form.Item>
          <Form.Item
            name="email"
            label={t('Email Address')}
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
            <Input placeholder="studi@example.com" />
          </Form.Item>
          <Form.Item>
            <Upload
              showUploadList={{
                showPreviewIcon: true,
                showRemoveIcon: false,
                showDownloadIcon: true
              }}
              name="documentVerification"
              headers={{
                Authorization: process.browser ? cookie.get(TOKEN) : ''
              }}
              fileList={certificate}
              listType="text"
              action={studioService.getDocumentsUploadUrl()}
              onChange={onCertificateChange}
            >
              <Button type="primary">
                <UploadOutlined />{' '}
                {t('Upload Company registration certificate')}
              </Button>
            </Upload>
          </Form.Item>
        </Col>
        <Col sm={12} xs={24}>
          <Form.Item
            name="country"
            label="Country"
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
          <Form.Item name="zipcode" label={t('Zip')}>
            <Input placeholder="012345-678" />
          </Form.Item>
          <Form.Item name="address" label={t('Address')}>
            <Input placeholder={t('Address')} />
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

export default StudioInformation;
