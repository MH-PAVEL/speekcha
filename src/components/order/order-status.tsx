import React, { PureComponent } from 'react';
import { Tag } from 'antd';
import { withTranslation } from '../../../i18n';

interface IProps {
  status: string;
  t: any;
}

class OrderStatus extends PureComponent<IProps> {
  renderStatus(status: string) {
    switch (status) {
      case 'processing':
        return <Tag color="processing">{this.props.t('Processing')}</Tag>;
      case 'shipping':
        return <Tag color="warning">{this.props.t('Shipping')}</Tag>;
      case 'delivered':
        return <Tag color="success">{this.props.t('Delivered')}</Tag>;
      case 'refunded':
        return <Tag color="error">{this.props.t('Refunded')}</Tag>;
      case 'created':
        return <Tag color="default">{this.props.t('Created')}</Tag>;
      default:
        return <Tag color="default">{this.props.t('Pending')}</Tag>;
    }
  }

  render() {
    const { status } = this.props;
    return this.renderStatus(status);
  }
}

// export default withTranslation('components')(OrderStatus);
const TranslatedCopmonent = withTranslation('components')(OrderStatus);
export { TranslatedCopmonent as OrderStatus };
