import { IProduct } from 'src/interfaces';
import React, { PureComponent } from 'react';
import { Tag } from 'antd';
import './index.less';
import { defaultColor } from 'src/lib';
// import Link from 'next/link';
import NumberFormat from '@components/common/layout/numberformat';

import { withTranslation, Link } from '../../../i18n';

interface IProps {
  product: IProduct;
  onHandlePurchase: Function;
  t: any;
}

class ProductCard extends PureComponent<IProps> {
  render() {
    const { product, onHandlePurchase, t } = this.props;
    const generateToken = (token: number) =>
      token && (
        <Tag color={token > 0 ? defaultColor.primaryColor : '#ccc'}>
          {token > 0 ? (
            <NumberFormat value={token} suffix={t('Tokens')} />
          ) : (
            t('FREE')
          )}
        </Tag>
      );
    return (
      <div className="product-card">
        <Link
          href={{
            pathname: '/products/detail',
            query: { id: product._id, data: JSON.stringify(product) }
          }}
          as={`/products/${product._id}`}
        >
          <div className="product-thumb">
            {product.type === 'physical' && (
              <div className="stock ant-tag ant-tag-has-color">
                {t('Stock')}:{product.stock}
              </div>
            )}
            <span className="value">{generateToken(product.token)}</span>
            {product.type === 'digital' && (
              <span className="type-digital">{t('Digital')}</span>
            )}
            {product.type === 'physical' && (
              <span className="type-digital">{t('Physical')}</span>
            )}
            <div className="hover-pointer">
              <img alt="" src={product?.image || '/no-image.jpg'} />
            </div>
          </div>
        </Link>
        <div
          className="product-name"
          aria-hidden
          onClick={() => onHandlePurchase(product)}
        >
          {product.name}
        </div>
      </div>
    );
  }
}

export default withTranslation('components')(ProductCard);