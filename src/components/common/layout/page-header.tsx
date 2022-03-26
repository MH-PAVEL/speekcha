import { PageHeader, Divider } from 'antd';
import { useTranslation } from '../../../../i18n';

interface P {
  title: any;
  // eslint-disable-next-line react/require-default-props
  extra?: any;
}

export default ({ title, extra }: P) => {
  const { t } = useTranslation('components');
  return (
    <>
      <PageHeader title={t(title)} extra={extra} />
      <Divider />
    </>
  );
};
