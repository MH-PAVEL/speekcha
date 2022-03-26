/* eslint-disable no-return-assign */
import React from 'react';
import { Form, Input, InputNumber, message } from 'antd';
import Popup from '@components/common/base/popup';
import { FormInstance } from 'antd/lib/form';
import './modal-buy-assets.less';
import {
  capitalizeFirstLetter,
  getResponseError,
  isPhysicalProduct
} from 'src/lib';
import { purchaseItemService } from 'src/services';
import NumberFormat from '@components/common/layout/numberformat';

// import { withTranslation } from '../../../../i18n';

const initialValues = {
  postalCode: '',
  deliveryAddress: '',
  quantity: 1
};

interface IProps {
  onSucess?: Function;
  onError?: Function;
  loggedIn?: boolean;
  updateCurrentUserBalance?: Function;
  t: any;
}

interface IStates {
  purchasing: boolean;
  type?: 'product' | 'video' | 'gallery';
  deliveryAddress?: string;
  postalCode?: string;
  item: any;
  quantity: number;
}

class ModalBuyAssets extends React.PureComponent<IProps, IStates> {
  form: FormInstance;

  popup: any;

  constructor(props: IProps) {
    super(props);
    this.state = {
      ...initialValues,
      type: 'product',
      purchasing: false,
      item: undefined
    };
  }

  async onOk() {
    const { loggedIn } = this.props;
    const { item } = this.state;
    if (!loggedIn) {
      message.error(this.props.t('Please login to buy this item'));
      return;
    }

    this.setState({ purchasing: true });
    isPhysicalProduct(item) ? this.form.submit() : this.submit();
  }

  async submit() {
    const formError = this.form.getFieldsError().find((f) => f.errors.length);
    const { onSucess, onError, updateCurrentUserBalance } = this.props;
    if (formError) return;

    const { quantity } = this.form.getFieldsValue();
    try {
      const { type, item } = this.state;
      await purchaseItemService.purchaseItem(
        item._id,
        type,
        this.form.getFieldsValue()
      );
      if (type === 'product' && item.type === 'digital') {
        message.success(
          this.props.t('Please check your email to view the digital product')
        );
      } else {
        message.success(this.props.t('Purchased Success'));
      }
      updateCurrentUserBalance &&
        updateCurrentUserBalance(parseInt(item.token, 10) * quantity * -1);
      onSucess && onSucess(type, item._id, { isBought: true });
    } catch (e) {
      const error = await Promise.resolve(e);
      message.error(getResponseError(error));
      onError && onError(error);
    } finally {
      this.popup && this.popup.setVisible(false);
      this.setState({ purchasing: false });
    }
  }

  showModalBuyAssets(item, type) {
    this.setState({ item, type });
    this.popup && this.popup.setVisible(true);
  }

  render() {
    const { type, item, quantity, purchasing } = this.state;
    const { t } = this.props;
    const footer = [];
    // if (type === 'gallery') {
    //   footer.push();
    // }

    return (
      <Popup
        footer={footer}
        title={`${t('Buy')} ${capitalizeFirstLetter(type)}`}
        t={t}
        okText={t('Purchase')}
        ref={(ref) => (this.popup = ref)}
        onOk={this.onOk.bind(this)}
        loading={purchasing}
        content={
          item && (
            <>
              <Form
                initialValues={initialValues}
                layout="vertical"
                ref={(ref) => (this.form = ref)}
                onValuesChange={(_, values: IStates) => this.setState(values)}
                hidden={!isPhysicalProduct(item)}
                onFinish={this.submit.bind(this)}
                onFinishFailed={() => this.setState({ purchasing: false })}
              >
                <Form.Item
                  name="deliveryAddress"
                  rules={[
                    {
                      required: true,
                      message: t('Please provide delivery address')
                    }
                  ]}
                  label={t('Delivery Address')}
                >
                  <Input placeholder={t('Enter your address')} />
                </Form.Item>
                <Form.Item name="postalCode" label={t('Postal Code')}>
                  <Input placeholder={t('Enter your postal code')} />
                </Form.Item>
                <Form.Item
                  name="quantity"
                  label={t('Quantity')}
                  rules={[
                    {
                      validator(_, value) {
                        if (parseInt(value, 10) < 1) {
                          return Promise.reject(
                            new Error(t('Quantity must be positive'))
                          );
                        }
                        return Promise.resolve();
                      }
                    }
                  ]}
                >
                  <InputNumber
                    placeholder={t('Enter quantity')}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
                <Form.Item>
                  <div>
                    {type === 'video' && (
                      <strong>{t('Available high-res Video')}</strong>
                    )}
                    {type === 'gallery' && (
                      <strong>{t('Available high-res Image')}</strong>
                    )}
                    {quantity === 1 && (
                      <h3>
                        {/* <NumberFormat value={item.token} prefix={`Buy this ${item.name || item.title} For `} suffix=" Tokens" /> */}
                        {t('Buy this')}
                        <span className="color">
                          {' '}
                          {item.name || item.title}{' '}
                        </span>
                        {t('For')}
                        <span className="color">
                          {' '}
                          <NumberFormat value={item.token} />{' '}
                        </span>
                        {t('Tokens')}
                      </h3>
                    )}
                    {quantity > 1 && (
                      <h3>
                        <NumberFormat
                          value={parseInt(item.token, 10) * quantity}
                          prefix={`Buy x${quantity} ${
                            item.name || item.title
                          } For `}
                          suffix={t('Tokens')}
                        />
                      </h3>
                    )}
                  </div>
                </Form.Item>
              </Form>
              <NumberFormat
                hidden={isPhysicalProduct(item)}
                value={parseInt(item.token, 10) * quantity}
                prefix={`Buy ${item.name || item.title} For `}
                suffix={t('Tokens')}
              />
            </>
          )
        }
      />
    );
  }
}

export default ModalBuyAssets;
