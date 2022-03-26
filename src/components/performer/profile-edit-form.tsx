/* eslint-disable no-shadow */
/* eslint-disable no-return-assign */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable prefer-const */
/* eslint-disable react/require-default-props */
import * as React from 'react';
import { IPerformer, ICountries, IPerformerCategogies } from 'src/interfaces';
import { Form, Input, Button, Select, DatePicker } from 'antd';
import moment from 'moment';
import './index.less';
import { OptionProfile } from '@components/common/base/select/profile';
import { formatDataWeight, formatDataHeight } from 'src/lib/utils';

import { useTranslation } from '../../../i18n';

const { TextArea } = Input;

// const hairDataSource: { label: string; value: any }[] = [
//   { label: 'Brown', value: 'brown' },
//   { label: 'Blonde', value: 'blonde' },
//   { label: 'Black', value: 'black' },
//   { label: 'Red', value: 'red' },
//   { label: 'Unknown', value: 'unknown' }
// ];
// const pubicHairDataSource: { label: string; value: any }[] = [
//   { label: 'Trimmed', value: 'trimmed' },
//   { label: 'Shaved', value: 'shaved' },
//   { label: 'Hairy', value: 'hairy' },
//   { label: 'Unknown', value: 'unknown' }
// ];
// const bustDataSource: { label: string; value: any }[] = [
//   { label: 'Large', value: 'large' },
//   { label: 'Medium', value: 'medium' },
//   { label: 'Small', value: 'small' },
//   { label: 'Unknown', value: 'unknown' }
// ];
// const weightDataSource: { label: string; value: any }[] = formatDataWeight();
// const heightDatasource: { label: string; value: any }[] = formatDataHeight();

interface IProps extends IPerformer {
  countries?: ICountries[];
  categoriesData?: IPerformerCategogies[];
  onFinish(data: any): Function;
  loading?: boolean;
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
  onFinish,
  firstName,
  lastName,
  countries,
  country,
  city,
  loading,
  address,
  state,
  aboutMe,
  dateOfBirth,
  gender,
  sexualReference,
  ethnicity,
  eyes,
  hair,
  height,
  weight,
  categoryIds,
  tags,
  pubicHair,
  bust,
  categoriesData,
  socials
}: IProps) => {
  const { t } = useTranslation('components');
  const [form] = Form.useForm();
  let [facebook, setFb] = React.useState(socials?.facebook || '');
  let [twitter, setTw] = React.useState(socials?.twitter || '');
  let [instagram, setIta] = React.useState(socials?.instagram || '');
  return (
    <Form
      {...formItemLayout}
      form={form}
      onFinish={(values) => {
        const data = {
          ...values,
          ...{ socials: { facebook, twitter, instagram } }
        };
        onFinish(data);
      }}
      name="contactSettingForm"
      className="performerEditForm"
      initialValues={{
        firstName,
        lastName,
        city,
        address,
        state,
        aboutMe,
        country,
        dateOfBirth: moment(dateOfBirth),
        gender,
        sexualReference,
        ethnicity,
        eyes,
        hair,
        height,
        weight,
        categoryIds,
        pubicHair,
        bust,
        tags,
        socials
      }}
      layout="horizontal"
    >
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
            message: t('Please input your first name')
          }
        ]}
      >
        <Input placeholder={t('Last name')} />
      </Form.Item>
      <Form.Item name="aboutMe" label={t('About me')}>
        <TextArea
          rows={2}
          placeholder={t('Tell your fans something about you')}
        />
      </Form.Item>
      <Form.Item name="gender" label={t('Gender')}>
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
      <Form.Item name="sexualReference" label={t('Preference')}>
        <Input placeholder={t('Preference')} />
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
              return Promise.reject(t('Minimum of 18 years'));
            }
          }
        ]}
      >
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>
      {/* <Form.Item name="ethnicity" label="Ethnicity">
        <Select>
          <Select.Option value="White" key="white">
            White
          </Select.Option>
          <Select.Option value="Asian" key="asian">
            Asian
          </Select.Option>
          <Select.Option value="Black" key="black">
            Black
          </Select.Option>
          <Select.Option value="India" key="india">
            India
          </Select.Option>
          <Select.Option value="Latin" key="latin">
            Latin
          </Select.Option>
          <Select.Option value="Unknown" key="unknown">
            Unknown
          </Select.Option>
        </Select>
      </Form.Item> */}
      {/* <Form.Item name="eyes" label="Eyes">
        <Select>
          <Select.Option value="Blue" key="blue">
            Blue
          </Select.Option>
          <Select.Option value="Brown" key="brown">
            Brown
          </Select.Option>
          <Select.Option value="Green" key="green">
            Green
          </Select.Option>
          <Select.Option value="Unknown" key="unknown">
            Unknown
          </Select.Option>
        </Select>
      </Form.Item> */}
      {/* <OptionProfile label="Hair" dataSource={hairDataSource} name="hair" /> */}
      {/* <OptionProfile
        label="Weight"
        dataSource={weightDataSource}
        name="weight"
      />
      <OptionProfile
        label="Height"
        dataSource={heightDatasource}
        name="height"
      />
      <OptionProfile
        label="Pubic Hair"
        dataSource={pubicHairDataSource}
        name="pubicHair"
      />
      <OptionProfile label="Bust" dataSource={bustDataSource} name="bust" /> */}
      <Form.Item name="categoryIds" label={t('Categories')}>
        <Select mode="multiple">
          {categoriesData.map((c) => (
            <Select.Option value={c._id} key={c._id}>
              {t(c.name)}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="tags" label={t('Tags')}>
        <Select mode="tags" />
      </Form.Item>
      <Form.Item
        name="country"
        label={t('Country')}
        rules={[{ required: true, message: t('Please input your country') }]}
      >
        <Select showSearch>
          {countries.length > 0 &&
            countries.map((country) => (
              <Select.Option value={country.name} key={country.code}>
                {t(country.name)}
              </Select.Option>
            ))}
        </Select>
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
      <Form.Item label={'Facebook'}>
        <Input
          placeholder="https://www.facebook.com"
          value={facebook}
          onChange={(e) => setFb((facebook = e.target.value))}
        />
      </Form.Item>
      <Form.Item label={'Twitter'}>
        <Input
          placeholder="https://www.twitter.com"
          value={twitter}
          onChange={(e) => setTw((twitter = e.target.value))}
        />
      </Form.Item>
      <Form.Item label={'Instagram'}>
        <Input
          placeholder="https://www.instagram.com"
          value={instagram}
          onChange={(e) => setIta((instagram = e.target.value))}
        />
      </Form.Item>
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
