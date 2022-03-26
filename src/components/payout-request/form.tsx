import React from 'react';
import {
  Form,
  Row,
  Col,
  Button,
  Input,
  DatePicker,
  Space,
  Statistic,
  message,
  Select
} from 'antd';
import { tailFormItemLayout } from 'src/lib';
import {
  PayoutRequestInterface,
  paymentAccountTypes,
  PAYMENT_ACCOUNT
} from 'src/interfaces';
import { payoutRequestService } from 'src/services';
import './index.less';
import moment from 'moment';

import { useTranslation } from '../../../i18n';

interface Props {
  submit(value): Function;
  submitting: boolean;
  payout: Partial<PayoutRequestInterface>;
  role?: string;
}

const PayoutRequestForm = ({ payout, submit, submitting, role }: Props) => {
  const { t } = useTranslation('components');
  const [tokenMustPay, setTokenMustPay] = React.useState(
    payout.tokenMustPay || 0
  );
  const [previousPaidOut, setPreviousPaidOut] = React.useState(
    payout.previousPaidOut || 0
  );
  const [pendingToken, setPendingToken] = React.useState(
    payout.pendingToken || 0
  );

  const handleDateChange = async (_, dateStrings: string[]) => {
    try {
      if (!dateStrings[0] || !dateStrings[1]) return;

      const query = {
        fromDate: dateStrings[0],
        toDate: dateStrings[1]
      };
      const resp = await payoutRequestService.calculate(query, role);
      setTokenMustPay(resp.data.totalPrice);
      setPreviousPaidOut(resp.data.paidPrice);
      setPendingToken(resp.data.remainingPrice);
    } catch {
      message.error(t('Something went wrong. Please try to input date again'));
    }
  };
  const [form] = Form.useForm();
  const { paymentAccountType, requestNote, fromDate, toDate } = payout;
  return (
    <Form
      form={form}
      layout="vertical"
      className="payout-request-form"
      name="payoutRequestForm"
      onFinish={submit}
      initialValues={{
        paymentAccountType: paymentAccountType || PAYMENT_ACCOUNT.WIRE,
        requestNote: requestNote || '',
        date: fromDate && toDate ? [moment(fromDate), moment(toDate)] : []
      }}
    >
      <Row>
        <Col xs={24} sm={8}>
          <Form.Item
            name="date"
            label={t('Date')}
            rules={[{ required: true, message: t('Please input the date') }]}
          >
            <DatePicker.RangePicker
              onChange={handleDateChange}
              disabled={!!payout?._id}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={16}>
          <Space size="large">
            <Statistic
              title={t('Earnings For The Selected Date')}
              value={tokenMustPay}
              precision={2}
            />
            <Statistic
              title={t('Previous Payout')}
              value={previousPaidOut}
              precision={2}
            />
            <Statistic
              title={t('Earnings Pending In Your Account')}
              value={pendingToken}
              precision={2}
            />
          </Space>
        </Col>
      </Row>
      <Form.Item label={t('Payment Account Type')} name="paymentAccountType">
        <Select disabled={!!payout?._id}>
          {paymentAccountTypes.map((te) => (
            <Select.Option value={te.value} key={te.value}>
              {t(te.title)}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label={t('Comment')} name="requestNote">
        <Input.TextArea rows={4} />
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button
          type="primary"
          loading={submitting}
          htmlType="submit"
          disabled={!tokenMustPay}
        >
          {t('Save Changes')}
        </Button>
      </Form.Item>
    </Form>
  );
};

PayoutRequestForm.defaultProps = {
  role: 'performer'
};

export default PayoutRequestForm;
