/* eslint-disable react/react-in-jsx-scope */
import { PureComponent } from 'react';
import { Select, Form } from 'antd';
import { withTranslation } from '../../../../../i18n';

interface Props {
  label: string;
  name: string;
  dataSource: { label: string; value: any }[];
  t: any;
}

class OptionProfile extends PureComponent<Props> {
  render() {
    const { label, dataSource, name, t } = this.props;
    return (
      <Form.Item label={label} name={name}>
        <Select>
          {dataSource.map((d) => (
            <Select.Option value={d.value} key={d.value}>
              {t(d.label)}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    );
  }
}

export const TranslatedCopmonent = withTranslation('components')(OptionProfile);
export { TranslatedCopmonent as OptionProfile };
