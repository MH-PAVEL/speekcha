import React from 'react';
import Head from 'next/head';
import PayoutRequestForm from '@components/payout-request/form';
import { message } from 'antd';
import PageHeader from '@components/common/layout/page-header';
import { payoutRequestService } from 'src/services';
import { Moment } from 'moment';
import { PayoutRequestInterface } from 'src/interfaces';
import nextCookie from 'next-cookies';
import Error from 'pages/_error';

import './index.less';
import { withTranslation } from '../../../i18n';

interface Props {
  payout: PayoutRequestInterface;
  t: any;
}

interface States {
  submitting: boolean;
  success: boolean;
}

class PayoutRequestCreatePage extends React.PureComponent<Props, States> {
  static layout = 'primary';

  static authenticate = true;

  static async getInitialProps({ ctx }) {
    try {
      const {
        query: { data, id }
      } = ctx;
      if (process.browser && data) {
        return {
          payout: JSON.parse(data)
        };
      }

      const { token } = nextCookie(ctx);
      const resp = await payoutRequestService.detail(
        id,
        {
          Authorization: token
        },
        'studio'
      );
      return {
        payout: resp.data
      };
    } catch {
      return {};
    }
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      submitting: false,
      success: false
    };
  }

  async submit(data: {
    date: Moment[];
    paymentAccountType: string;
    requestNote: string;
  }) {
    if (!data.date[0] || !data.date[1]) return;
    const { payout } = this.props;

    try {
      this.setState({ submitting: true });
      const body = {
        paymentAccountType: data.paymentAccountType,
        requestNote: data.requestNote,
        fromDate: data.date[0],
        toDate: data.date[1]
      };
      await payoutRequestService.update(payout._id, body, 'studio');
      message.success(this.props.t('Success'));
    } catch (e) {
      const error = await Promise.resolve(e);
      message.error(error);
    } finally {
      this.setState({ submitting: false });
    }
  }

  render() {
    const { payout, t } = this.props;
    const { submitting, success } = this.state;
    if (!payout) return <Error statusCode={404} />;

    return (
      <>
        <Head>
          <title>{t('Payout Request')}</title>
        </Head>
        {success && (
          <div className="payout-request-page">
            <PageHeader title={t('Update a Payout Request')} />
            <PayoutRequestForm
              payout={payout}
              submit={this.submit.bind(this)}
              submitting={submitting}
            />
          </div>
        )}
      </>
    );
  }
}

export default withTranslation('common')(PayoutRequestCreatePage);
