import * as React from 'react';
import { IUser, ICountries } from 'src/interfaces';
import {
  Form,
  Input,
  Button,
  DatePicker,
  Select,
  Upload,
  Row,
  Col
} from 'antd';
import moment from 'moment';
import { TOKEN } from 'src/services/api-request';
import cookie from 'js-cookie';
import { UploadOutlined, EditOutlined } from '@ant-design/icons';

import { useTranslation } from '../../../i18n';

import './profile.less';
import { beforeAvatarUpload } from '@lib/file';

interface IProps extends IUser {
  countries: ICountries[];
  onFinish(data: any): Function;
  onChangeAvatar(data: any): Function;
  avatarUploading: boolean;
  uploadAvatarUrl: string;
  uploadedAvatar: string;
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
  username,
  firstName,
  lastName,
  gender,
  onFinish,
  countries,
  email,
  country,
  phone,
  city,
  state,
  dateOfBirth,
  onChangeAvatar,
  uploadAvatarUrl,
  uploadedAvatar,
  avatarUploading,
  avatar,
  loading
}: IProps) => {
  const { t } = useTranslation('components');
  const [form] = Form.useForm();
  const uploadButton = (
    <Button
      type="dashed"
      loading={avatarUploading}
      disabled={avatarUploading}
      icon={<UploadOutlined />}
    >
      {t('Upload')}
    </Button>
  );
  return (
    <Form
      {...formItemLayout}
      form={form}
      onFinish={onFinish}
      name="performerRegisterForm"
      className="performerRegisterForm"
      initialValues={{
        dateOfBirth: moment(dateOfBirth),
        country,
        firstName,
        lastName,
        gender,
        email,
        avatar,
        username,
        phone,
        city,
        state
      }}
      layout="vertical"
    >
      <Row gutter={25}>
        <Col sm={12} xs={24}>
          <Form.Item
            name="username"
            label={t('Username')}
            rules={[
              {
                required: true,
                message: t('Please input your username')
              }
            ]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item name="gender" label={t('Sex')}>
            <Select>
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
            <Input placeholder={t('First Name')} />
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
            <Input placeholder={t('Last Name')} />
          </Form.Item>
          <Form.Item
            name="phone"
            label={t('Phone Number')}
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
        </Col>
        <Col sm={12} xs={24}>
          <Form.Item
            name="email"
            label="E-mail"
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
            <Input disabled placeholder="test@example.com" />
          </Form.Item>
          <Form.Item
            name="dateOfBirth"
            label={t('Date of Birth')}
            rules={[
              {
                required: true,
                message: t('Please input date of birth')
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
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="country"
            label={t('Country')}
            rules={[
              { required: true, message: t('Please input your country') }
            ]}
          >
            <Select showSearch>
              {countries.length > 0 &&
                countries.map((c) => (
                  <Select.Option value={c.name} key={c.code}>
                    {t(c.name)}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item name="state" label={t('State')}>
            <Input placeholder={t('State Name')} />
          </Form.Item>
          <Form.Item name="city" label={t('City')}>
            <Input placeholder={t('City Name')} />
          </Form.Item>
          <Form.Item
            label={t('Profile Avatar')}
            // valuePropName="fileList"
          >
            <Upload
              onChange={onChangeAvatar}
              accept="image/*"
              action={uploadAvatarUrl}
              headers={{
                Authorization: process.browser ? cookie.get(TOKEN) : ''
              }}
              name="avatar"
              showUploadList={false}
              beforeUpload={beforeAvatarUpload}
            >
              {avatar || uploadedAvatar ? (
                <div style={{ height: 60, width: 60, position: 'relative' }}>
                  <img
                    src={uploadedAvatar || avatar}
                    style={{ height: 60, width: 60, borderRadius: 30 }}
                    alt=""
                  />
                  <EditOutlined className="edit-icon" />
                </div>
              ) : (
                uploadButton
              )}
            </Upload>
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
