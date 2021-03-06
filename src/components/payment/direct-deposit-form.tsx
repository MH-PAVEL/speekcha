import { useEffect } from 'react';
import { Form, Input, Col, Row, Radio, Button } from 'antd';
import { FormItemProps } from 'antd/lib/form/FormItem';
import { IPerformerDirectDeposit } from 'src/interfaces';
import FormInputItem from '@components/common/base/input-item-list';
import { formItemLayout, tailFormItemLayout } from 'src/lib';

import { useTranslation } from '../../../i18n';

const { Group } = Radio;
const DIRECT_DEPOSIT_TYPE = [
  { key: 'credit', name: 'Credit' },
  { key: 'savings', name: 'Savings' }
];
const radioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px'
};
const leftFormItem: FormItemProps[] = [
  {
    name: 'depositFirstName',
    rules: [{ required: true, message: 'First name is requried' }],
    label: 'First Name',
    children: <Input />
  },
  {
    name: 'depositLastName',
    rules: [{ required: true, message: 'Last name is requried' }],
    label: 'Last Name',
    children: <Input />
  },
  {
    name: 'accountingEmail',
    rules: [
      { required: true, message: 'Account email is requried' },
      { type: 'email', message: 'Account email must be email' }
    ],
    label: 'Account Email',
    children: <Input type="email" />
  },
  {
    name: 'directBankName',
    rules: [{ required: true, message: 'Bank name is requried' }],
    label: 'Bank Name',
    children: <Input />
  }
  // {
  //   name: 'accountType',
  //   rules: [{ required: true, message: 'Account type is requried' }],
  //   label: 'Account Type',
  //   children: (
  //     <Group>
  //       {DIRECT_DEPOSIT_TYPE.map((type) => (
  //         <Radio style={radioStyle} value={type.key} key={type.key}>
  //           {type.name}
  //         </Radio>
  //       ))}
  //     </Group>
  //   )
  // }
];

const rightInputFrom: FormItemProps[] = [
  {
    name: 'accountNumber',
    rules: [{ required: true, message: 'Account number is requried' }],
    label: 'Account number',
    children: <Input />
  },
  {
    name: 'routingNumber',
    rules: [{ required: true, message: 'Routing number is requried' }],
    label: 'Routing number',
    children: <Input />
  }
];

const initFormValue: IPerformerDirectDeposit = {
  depositFirstName: '',
  depositLastName: '',
  accountingEmail: '',
  directBankName: '',
  accountType: 'credit',
  accountNumber: '',
  routingNumber: ''
};

interface IProps {
  onFinish(data): Function;
  loading: boolean;
  paymentInformation: any;
}

export const DirectDepositSettingForm = ({
  onFinish,
  paymentInformation,
  loading
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
      name="directDepositSettingForm"
      className="performerEditForm"
      initialValues={{ ...initFormValue }}
    >
      <Row>
        <Col xs={24} sm={12}>
          <FormInputItem fields={leftFormItem} />
          <Form.Item
            name="accountType"
            label={t('Account Type')}
            rules={[{ required: true, message: t('Account type is requried') }]}
          >
            <Group>
              {DIRECT_DEPOSIT_TYPE.map((type) => (
                <Radio style={radioStyle} value={type.key} key={type.key}>
                  {t(type.name)}
                </Radio>
              ))}
            </Group>
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <FormInputItem fields={rightInputFrom} />
        </Col>
      </Row>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit" loading={loading}>
          {t('Save Changes')}
        </Button>
      </Form.Item>
    </Form>
  );
};
