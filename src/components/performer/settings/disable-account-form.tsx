import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
// import { FormItemProps } from 'antd/lib/form/FormItem';
// import FormInputItem from '@components/common/base/input-item-list';
import { formItemLayout, tailFormItemLayout } from 'src/lib';

import { useTranslation } from '../../../../i18n';

// const leftFormItem: FormItemProps[] = [
//   // {
//   //   name: 'suspendReason',
//   //   rules: [
//   //     { required: true, message: 'The suspension reason is requried' },
//   //     { max: 250, message: 'Max 250 words' }
//   //   ],
//   //   label: 'Suspension Reason',
//   //   children: <Input.TextArea />
//   // },
//   {
//     name: 'password',
//     rules: [{ required: true, message: 'Password is requried' }],
//     label: 'Enter your password',
//     children: <Input.Password placeholder="Password" />
//   },
//   {
//     name: 'confirmation',
//     valuePropName: 'checked',
//     rules: [{ required: true, message: 'The confirmation is requried' }],
//     children: <Checkbox>I am sure that i want to suspend my account</Checkbox>
//   }
// ];

interface IProps {
  onFinish(data): Function;
  loading: boolean;
}

export default ({ loading, onFinish }: IProps) => {
  const { t } = useTranslation('components');
  const [form] = Form.useForm();

  return (
    <Form
      {...formItemLayout}
      form={form}
      layout="vertical"
      onFinish={onFinish.bind(this)}
      name="disableAccountForm"
      className="performerEditForm"
    >
      {/* <FormInputItem fields={leftFormItem} /> */}
      <Form.Item
        name="suspendReason"
        label={t('Suspension Reason')}
        rules={[
          { required: true, message: t('The suspension reason is requried') },
          { max: 250, message: t('Max 250 words') }
        ]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item
        name="password"
        label={t('Enter your password')}
        rules={[{ required: true, message: t('Password is requried') }]}
      >
        <Input.Password placeholder={t('Password')} />
      </Form.Item>
      <Form.Item
        name="confirmation"
        valuePropName="checked"
        label={t('Enter your password')}
        rules={[{ required: true, message: t('The confirmation is requried') }]}
      >
        <Checkbox>{t('I am sure that i want to suspend my account')}</Checkbox>
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit" loading={loading}>
          {t('Save Changes')}
        </Button>
      </Form.Item>
    </Form>
  );
};
