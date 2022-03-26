import { Button } from 'antd';
import NumberFormat from '@components/common/layout/numberformat';
import './token-card.less';
import React from 'react';
import { connect } from 'react-redux';

import { withTranslation } from '../../../../i18n';

interface IProps {
  name: string;
  token: number;
  price: number;
  onBuyToken?: Function;
  buying?: boolean;
  currencySymbol?: string;
  paypalEnabled?: boolean;
  ccbillEnabled?: boolean;
  t: any;
}

const TokenCard = ({
  token,
  price,
  buying,
  currencySymbol,
  paypalEnabled,
  ccbillEnabled,
  t,
  ...props
}: IProps) => (
  <div className="token-card">
    <div className="card-image">
      <div className="coin">
        <div className="current-coin">
          <img src="/crown.png" alt="" />
          <span>x{token}</span>
        </div>
      </div>
    </div>
    {/* <NumberFormat value={}/> */}
    <NumberFormat value={token} suffix={` ${t('Token for')} `} />
    <NumberFormat value={price} prefix={currencySymbol} />
    <br />
    {ccbillEnabled && (
      <Button
        type="primary"
        onClick={() => props.onBuyToken()}
        loading={buying}
        disabled={buying}
      >
        {t('Buy with CCBill')}
      </Button>
    )}
    {paypalEnabled && (
      <>
        <br />
        <br />
        <Button
          type="primary"
          onClick={() => props.onBuyToken('paypal')}
          loading={buying}
          disabled={buying}
        >
          {t('Buy with Paypal')}
        </Button>
      </>
    )}
  </div>
);
TokenCard.defaultProps = {
  onBuyToken: null,
  buying: false,
  currencySymbol: '$',
  paypalEnabled: false,
  ccbillEnabled: true
};

const mapStateToProps = (state: any) => ({
  ...state.ui,
  paypalEnabled: state.settings.paypalEnabled,
  ccbillEnabled: state.settings?.ccbillEnabled
});
export default connect(mapStateToProps)(
  withTranslation('components')(TokenCard)
);
