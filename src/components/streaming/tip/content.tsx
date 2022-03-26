import { PureComponent, createRef } from 'react';
import { Alert, InputNumber, Radio, Space } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
// import { withTranslation } from '../../../../i18n';

import './content.less';

const tokens = [20, 50, 100, 200];

interface IProps {
  setDisableOk: Function;
  t: any;
}

interface IStates {
  radioValue: string | number;
  errorMessage: string;
  token: number;
}

class SendTipContent extends PureComponent<IProps, IStates> {
  private inputNumberRef;

  constructor(props: IProps) {
    super(props);
    this.state = {
      radioValue: 20,
      errorMessage: '',
      token: 1
    };
  }

  componentDidMount() {
    this.inputNumberRef = createRef();
  }

  onRadioChange(e: RadioChangeEvent) {
    const { setDisableOk } = this.props;
    setDisableOk(false);
    this.setState({ radioValue: e.target.value });
    if (e.target.value > 0) this.setState({ token: e.target.value });
  }

  onInputChange(value: number) {
    const { setDisableOk } = this.props;
    setDisableOk(false);
    if (typeof value !== 'number') {
      return;
    }
    if (value <= 0 || value % 1 !== 0) {
      setDisableOk(true);
      this.setState({
        errorMessage: this.props.t('Token must be positive interger number')
      });
      return;
    }
    this.setState({ token: value, errorMessage: '' });
  }

  getValueToken() {
    const { token } = this.state;
    return token;
  }

  render() {
    const { radioValue, token, errorMessage } = this.state;
    const { t } = this.props;
    return (
      <div>
        <strong>{t('Tipping A Model Is Simple')}!</strong>
        <h3>{t('How Many Tokens Would You Like To Tip')}?</h3>
        {errorMessage && <Alert type="error" message={errorMessage} />}
        <Radio.Group
          value={radioValue}
          defaultValue={radioValue}
          onChange={this.onRadioChange.bind(this)}
          size="large"
        >
          {tokens.map((v) => (
            <Radio value={v} key={v}>
              <Space className="token-radio" align="start">
                <span>{`${v} ${t('Tokens')}`}</span>
                <span className="tip-description">{`${t(
                  'Tip The Model'
                )} ${v} ${t('Tokens')}!`}</span>
              </Space>
            </Radio>
          ))}
          <Radio value={-1}>
            <Space className="token-radio">
              <span>{t('Custom Amount')}</span>
              <InputNumber
                className="amount"
                ref={this.inputNumberRef}
                onFocus={() => this.setState({ radioValue: -1 })}
                type="number"
                min={1}
                max={1000}
                step={10}
                placeholder={t('Enter Amount')}
                onChange={this.onInputChange.bind(this)}
                value={token}
              />
            </Space>
          </Radio>
        </Radio.Group>
      </div>
    );
  }
}

export default SendTipContent;