/* eslint-disable no-nested-ternary */
import { useEffect } from 'react';
import { Form, Input, Col, Row, Select, Button } from 'antd';
import FormItem from 'antd/lib/form/FormItem';

import { useTranslation } from '../../../i18n';

const PAYMENT_INFO_CURRENCY = {
  eurEuro: 'EUR (Euro)',
  usdUnitedStatesDollars: 'USD (U.S Dollar)'
};
const { Item } = Form;
const { Option } = Select;
const initFormValue = {
  type: 'wireTransfer',
  withdrawCurrency: 'eurEuro',
  taxPayer: ''
};
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
      span: 20
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

interface IProps {
  onFinish(data): Function;
  loading: boolean;
  paymentInformation: any;
}

export const WireTransferSettingForm = ({
  onFinish,
  loading,
  paymentInformation
}: IProps) => {
  const { t } = useTranslation('components');
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue(paymentInformation);
  }, [paymentInformation]);
  return (
    <Form
      {...formItemLayout}
      form={form}
      layout="vertical"
      onFinish={onFinish}
      name="paymentInfoSettingForm"
      className="performerEditForm"
      validateMessages={{ required: t('This field is required') }}
      initialValues={{ ...initFormValue }}
    >
      <Row>
        <Col xs={24} sm={12}>
          <Item
            name="withdrawCurrency"
            key="withdrawCurrency"
            rules={[{ required: true }]}
            label={t('Withdraw Currency')}
          >
            <Select>
              {Object.keys(PAYMENT_INFO_CURRENCY).map((key) => (
                <Option value={key} key={key}>
                  {PAYMENT_INFO_CURRENCY[key]}
                </Option>
              ))}
            </Select>
          </Item>
          <Item name="taxPayer" key="taxPayer" label={t('Taxpayer ID/SSN')}>
            <Input />
          </Item>
          <Item
            name="bankName"
            key="bankName"
            label={t('Bank Name')}
            dependencies={['type']}
            rules={[{ required: true }]}
          >
            <Input />
          </Item>
          <Item
            name="bankAddress"
            key="bankAddress"
            label={t('Bank Address')}
            dependencies={['type']}
            rules={[{ required: true }]}
          >
            <Input />
          </Item>
          <Item
            name="bankSWIFTBICABA"
            key="bankSWIFTBICABA"
            label={t('Bank SWIFT-BIC/ABA')}
            dependencies={['type']}
            rules={[{ required: true }]}
          >
            <Input />
          </Item>
          <Item
            name="additionalInformation"
            key="additionalInformation"
            label={t('Additional Information')}
          >
            <Input.TextArea />
          </Item>
        </Col>
        <Col xs={24} sm={12}>
          <Item
            name="bankCity"
            key="bankCity"
            label={t('Bank City')}
            dependencies={['type']}
            rules={[{ required: true }]}
          >
            <Input />
          </Item>
          <Item
            name="bankState"
            key="bankState"
            label={t('Bank State')}
            dependencies={['type']}
            rules={[{ required: true }]}
          >
            <Input />
          </Item>
          <Item
            name="bankZip"
            key="bankZip"
            label={t('Bank Zip')}
            dependencies={['type']}
            rules={[{ required: true }]}
          >
            <Input />
          </Item>
          <Item
            name="bankCountry"
            key="bankCountry"
            label={t('Bank Country')}
            dependencies={['type']}
            rules={[{ required: true }]}
          >
            <Input />
          </Item>
          <Item
            name="bankAcountNumber"
            key="bankAcountNumber"
            label={t('Bank Account Number')}
            dependencies={['type']}
            rules={[{ required: true }]}
          >
            <Input />
          </Item>
          <Item
            name="holderOfBankAccount"
            key="holderOfBankAccount"
            label={t('Primary Account Holder')}
            dependencies={['type']}
            rules={[{ required: true }]}
          >
            <Input />
          </Item>
        </Col>
      </Row>
      <FormItem {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit" loading={loading}>
          {t('Save Changes')}
        </Button>
      </FormItem>
    </Form>
  );
};
