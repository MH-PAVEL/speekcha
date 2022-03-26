import { Form, Input, Select, Button, Tag, Space } from 'antd';
import React, { PureComponent } from 'react';
import { DownloadOutlined } from '@ant-design/icons';
import { IOrder } from 'src/interfaces';
import Page from '@components/common/layout/page';
import './detail.less';
import { OrderStatus } from 'src/components/order';
import { PerformerUsername } from '@components/performer';
import NumberFormat from '@components/common/layout/numberformat';
import Router from 'next/router';

import { withTranslation } from '../../../i18n';

interface IProps {
  order: IOrder;
  loading: boolean;
  isUpdating: boolean;
  onFinish: any;
  disableUpdate: boolean;
  isUser?: boolean;
  onDownloadClick?: any;
  t: any;
}

class FormOrder extends PureComponent<IProps> {
  render() {
    const {
      order,
      loading,
      isUpdating,
      disableUpdate,
      onFinish,
      isUser,
      onDownloadClick,
      t
    } = this.props;
    return (
      <Page>
        {order && (
          <div className="main-container">
            <Form
              onFinish={onFinish}
              wrapperCol={{ sm: { span: 18 } }}
              labelCol={{ sm: { span: 6 } }}
              initialValues={order}
              id="form-update-order"
            >
              <Form.Item wrapperCol={{ sm: { span: 12 } }}>
                <Tag color="magenta">#{order.orderNumber}</Tag>
              </Form.Item>
              <Form.Item label={t('Buyer')}>
                {order.buyerInfo?.username || 'N/A'}
              </Form.Item>
              <Form.Item label={t('Seller')}>
                {order.sellerSource === 'system' ? (
                  'System'
                ) : order?.sellerInfo ? (
                  <PerformerUsername performer={order.sellerInfo} />
                ) : (
                  'N/A'
                )}
              </Form.Item>
              <Form.Item label={t('Product')}>{order.name}</Form.Item>
              <Form.Item label={t('Description')}>
                {order.description}
              </Form.Item>
              {order.productType === 'digital' && isUser ? (
                <Form.Item label={t('Download')}>
                  <DownloadOutlined onClick={onDownloadClick} />
                </Form.Item>
              ) : null}

              <Form.Item label={t('Quantity')}>{order.quantity}</Form.Item>
              <Form.Item label={t('Total Price')}>
                {order.payBy === 'token' ? (
                  <NumberFormat value={order.totalPrice} suffix={t('Tokens')} />
                ) : (
                  <span>
                    $
                    <NumberFormat value={order.totalPrice} />
                  </span>
                )}
              </Form.Item>
              {order.productType === 'physical' ? (
                <>
                  <Form.Item label={t('Delivery Address')}>
                    {order.deliveryAddress || 'N/A'}
                  </Form.Item>
                  <Form.Item label={t('Delivery Postal Code')}>
                    {order.postalCode || 'N/A'}
                  </Form.Item>
                  <Form.Item name="shippingCode" label={t('Shipping Code')}>
                    {!isUser ? (
                      <Input placeholder={t('Enter shipping code here')} />
                    ) : (
                      order.shippingCode
                    )}
                  </Form.Item>
                </>
              ) : null}

              {!disableUpdate && order.productType === 'physical' ? (
                <Form.Item name="deliveryStatus" label={t('Delivery Status')}>
                  <Select>
                    <Select.Option key="processing" value="processing">
                      {t('Processing')}
                    </Select.Option>
                    <Select.Option key="shipping" value="shipping">
                      {t('Shipping')}
                    </Select.Option>
                    <Select.Option key="delivered" value="delivered">
                      {t('Delivered')}
                    </Select.Option>
                    <Select.Option key="refunded" value="refunded">
                      {t('Refunded')}
                    </Select.Option>
                    <Select.Option key="created" value="created">
                      {t('Pending')}
                    </Select.Option>
                  </Select>
                </Form.Item>
              ) : (
                <Form.Item name="deliveryStatus" label="Delivery Status">
                  <OrderStatus status={order.deliveryStatus} />
                </Form.Item>
              )}
              <Form.Item>
                <Space>
                  <Button type="primary" onClick={() => Router.back()}>
                    {t('Back')}
                  </Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={isUpdating}
                    disabled={loading}
                    hidden={disableUpdate}
                  >
                    {t('Update')}
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </div>
        )}
      </Page>
    );
  }
}

// export default withTranslation('components')(FormOrder);
export const TranslatedCopmonent = withTranslation('components')(FormOrder);
export { TranslatedCopmonent as FormOrder };
