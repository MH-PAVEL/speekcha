/* eslint-disable no-return-assign */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import { IRefundRequest, IPerformer, IOrder } from 'src/interfaces';
import {
  Form,
  Input,
  Button,
  Space,
  Select,
  Row,
  Col,
  InputNumber
} from 'antd';
import Router from 'next/router';
import { formItemLayout, tailFormItemLayout } from 'src/lib';
import FormInputItem from '@components/common/base/input-item-list';
import { FormItemProps } from 'antd/lib/form/FormItem';
import { useTranslation } from '../../../i18n';

interface IProps {
  onFinish(data: any): Function;
  loading: boolean;
  performers?: IPerformer[];
  products?: IOrder[];
  onChangePerformer: Function;
}

const initialValues: Partial<IRefundRequest> = {
  description: '',
  sourceId: '',
  sourceType: 'order',
  performerId: '',
  token: 0
};

const RefundRequestForm = ({
  onFinish,
  loading,
  performers,
  products,
  onChangePerformer
}: IProps) => {
  const { t } = useTranslation('components');
  let selectPerformerRef;
  let selectProductRef;
  const [form] = Form.useForm();
  const performerSelectOptions =
    performers &&
    performers.map((per) => ({
      label: per.username,
      value: per._id
    }));
  const productSelectOptions =
    products &&
    products.map((prod) => ({
      label: `${
        prod.productsInfo && prod.productsInfo[0]
          ? prod.productsInfo[0].name
          : 'N/A'
      } - ${prod.orderNumber}`,
      value: prod._id
    }));

  const leftFormItem: FormItemProps[] = [
    {
      name: 'performerId',
      label: t('Performer'),
      rules: [
        {
          required: true,
          message: t('Please Select Performer')
        }
      ],
      children: (
        <Select
          showSearch
          optionFilterProp="label"
          ref={(ref) => (selectPerformerRef = ref)}
          placeholder={t('Please Select Performer')}
          options={performerSelectOptions}
          onChange={(value) => {
            form.setFieldsValue({ sourceId: '' });
            onChangePerformer(value);
          }}
          dropdownRender={(menu) => <>{menu}</>}
        />
      )
    },
    {
      name: 'description',
      label: t('Description'),
      children: <Input.TextArea placeholder={t('Enter Description')} />
    }
  ];
  const rightInputFrom: FormItemProps[] = [
    {
      name: 'sourceId',
      label: t('Product'),
      rules: [
        {
          required: true,
          message: t('Please Select Product')
        }
      ],
      children: (
        <Select
          showSearch
          optionFilterProp="label"
          ref={(ref) => (selectProductRef = ref)}
          placeholder={t('Please Select Product')}
          options={productSelectOptions}
          onChange={(value) => {
            const prod = products.find((p) => p._id === value);
            prod && form.setFieldsValue({ token: prod.totalPrice });
          }}
          dropdownRender={(menu) => <>{menu}</>}
        />
      )
    },
    {
      name: 'token',
      label: t('Token'),
      rules: [
        {
          required: true,
          message: t('Please input product token')
        }
      ],
      children: <InputNumber min={1} disabled />
    }
  ];

  return (
    <Form
      {...formItemLayout}
      form={form}
      onFinish={onFinish}
      name="productsForm"
      className="product-form"
      initialValues={{ ...initialValues }}
      layout="vertical"
    >
      <Row gutter={25}>
        <Col sm={12} xs={24} md={12} lg={12}>
          <FormInputItem fields={leftFormItem} />
        </Col>
        <Col sm={12} xs={24} md={12} lg={12}>
          <FormInputItem fields={rightInputFrom} />
        </Col>
      </Row>
      <Form.Item {...tailFormItemLayout}>
        <Space>
          <Button
            type="primary"
            htmlType="submit"
            disabled={loading}
            loading={loading}
          >
            {t('Save Changes')}
          </Button>
          <Button
            type="primary"
            onClick={() => Router.push('/account/user/refund-request')}
          >
            {t('Back')}
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};
RefundRequestForm.defaultProps = {
  performers: [],
  products: []
};
export default RefundRequestForm;
