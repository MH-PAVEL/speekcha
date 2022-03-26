import { useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { FormItemProps } from 'antd/lib/form/FormItem';
import { IPerformerBitpay } from 'src/interfaces';
import FormInputItem from '@components/common/base/input-item-list';
import { formItemLayout, tailFormItemLayout } from 'src/lib';

import { useTranslation } from '../../../i18n';

const leftFormItem: FormItemProps[] = [
  {
    name: 'bitpayName',
    rules: [{ required: true, message: 'Name is requried' }],
    label: 'Name',
    children: <Input />
  },
  {
    name: 'bitpayEmail',
    rules: [
      { required: true, message: 'Account email is requried' },
      { type: 'email', message: 'Account email must be email' }
    ],
    label: 'Email',
    children: <Input type="email" />
  },
  {
    name: 'bitpayAdditionalInformation',
    rules: [{ required: true, message: 'Name is requried' }],
    label: 'Additional Information',
    children: <Input />
  }
];

const initFormValue: IPerformerBitpay = {
  bitpayName: '',
  bitpayEmail: '',
  bitpayAdditionalInformation: ''
};

interface IProps {
  onFinish(data): Function;
  loading: boolean;
  paymentInformation: any;
}

export const BitpaySettigForm = ({
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
      name="bitpaySettingForm"
      className="performerEditForm"
      initialValues={{ ...initFormValue }}
    >
      <FormInputItem fields={leftFormItem} />
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit" loading={loading}>
          {t('Save Changes')}
        </Button>
      </Form.Item>
    </Form>
  );
};