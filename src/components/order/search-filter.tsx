import React, { PureComponent } from 'react';
import { Row, Col, Button, Select } from 'antd';
import { withTranslation } from '../../../i18n';

interface IProps {
  onSubmit?: Function;
  t: any;
  statuses?: {
    key: string;
    text?: string;
  }[];
}

class OrderSearchFilter extends PureComponent<IProps> {
  performerRef: any;

  state = {
    deliveryStatus: ''
  };

  render() {
    const { statuses = [], onSubmit, t } = this.props;
    return (
      <Row gutter={24}>
        {statuses.length ? (
          <Col xl={{ span: 4 }} md={{ span: 8 }} xs={{ span: 10 }}>
            <span>{t('Status')}</span>
            <Select
              onChange={(val) => this.setState({ deliveryStatus: val })}
              style={{ width: '100%' }}
              placeholder={t('Select delivery status')}
              defaultValue=""
            >
              {statuses.map((s) => (
                <Select.Option key={s.key} value={s.key}>
                  {s.text || s.key}
                </Select.Option>
              ))}
            </Select>
          </Col>
        ) : null}
        <Col xl={{ span: 4 }} md={{ span: 8 }}>
          <Button
            style={{ marginTop: '22px' }}
            type="primary"
            onClick={() => onSubmit(this.state)}
          >
            {t('Search')}
          </Button>
        </Col>
      </Row>
    );
  }
}

export const TranslatedCopmonent =
  withTranslation('components')(OrderSearchFilter);
export { TranslatedCopmonent as OrderSearchFilter };
