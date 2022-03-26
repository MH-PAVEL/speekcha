import React from 'react';
import { Form, Button, InputNumber } from 'antd';
import { FormItemProps } from 'antd/lib/form/FormItem';
import { IPerformer } from 'src/interfaces';
import FormInputItem from '@components/common/base/input-item-list';
import { formItemLayout, tailFormItemLayout } from 'src/lib';
import { useTranslation } from '../../../../i18n';

// const leftFormItem: FormItemProps[] = [
//   {
//     name: 'privateCallPrice',
//     rules: [
//       {
//         validator: (_, value) =>
//           new Promise((resolve, reject) => {
//             if (parseInt(value, 10) > 0) return resolve(null);
//             return reject(new Error('The price must be greater than 0!'));
//           })
//       }
//     ],
//     label: 'Private call tokens/minute',
//     children: <InputNumber type="number" />
//   },
//   {
//     name: 'groupCallPrice',
//     rules: [
//       {
//         validator: (_, value) =>
//           new Promise((resolve, reject) => {
//             if (parseInt(value, 10) > 0) return resolve(null);
//             return reject(new Error('The price must be greater than 0!'));
//           })
//       }
//     ],
//     label: 'Group call tokens/minute',
//     children: <InputNumber type="number" />
//   }
// ];

const initFormValue = {
  privateCallPrice: 0,
  groupCallPrice: 0
};

interface IProps extends IPerformer {
  onFinish(data): Function;
  loading: boolean;
}

export default ({
  onFinish,
  privateCallPrice,
  groupCallPrice,
  loading
}: IProps) => {
  const { t } = useTranslation('components');
  const [form] = Form.useForm();
  return (
    <Form
      {...formItemLayout}
      form={form}
      layout="vertical"
      onFinish={onFinish}
      name="defaultPriceForm"
      className="performerEditForm"
      initialValues={{ ...initFormValue, privateCallPrice, groupCallPrice }}
    >
      {/* <FormInputItem fields={leftFormItem} /> */}
      <Form.Item
        name="privateCallPrice"
        label={t('Private call tokens/minute')}
        rules={[
          {
            validator: (_, value) =>
              new Promise((resolve, reject) => {
                if (parseInt(value, 10) > 0) return resolve(null);
                return reject(new Error(t('The price must be greater than 0')));
              })
          }
        ]}
      >
        <InputNumber type="number" />
      </Form.Item>
      <Form.Item
        name="groupCallPrice"
        label={t('Group call tokens/minute')}
        rules={[
          {
            validator: (_, value) =>
              new Promise((resolve, reject) => {
                if (parseInt(value, 10) > 0) return resolve(null);
                return reject(new Error(t('The price must be greater than 0')));
              })
          }
        ]}
      >
        <InputNumber type="number" />
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit" loading={loading}>
          {t('Save Changes')}
        </Button>
      </Form.Item>
    </Form>
  );
};
