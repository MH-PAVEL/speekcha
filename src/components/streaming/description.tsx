import { useState, useEffect } from 'react';
import { List, Row, Col } from 'antd';
import NumberFormat from '@components/common/layout/numberformat';
import { useTranslation } from '../../../i18n';

interface P {
  roomJoined: boolean;
  receivedToken: number;
}

const ListItem = ({ description, title, t }: any) => (
  <List.Item>
    <Row style={{ width: '100%' }}>
      <Col className="light-text" sm={{ span: 6 }} xs={{ span: 12 }}>
        {t(title)}
      </Col>
      <Col style={{ fontWeight: 'bold' }} sm={{ span: 18 }} xs={{ span: 12 }}>
        {description}
      </Col>
    </Row>
  </List.Item>
);
let interval: NodeJS.Timeout;
export const Description = ({ roomJoined, receivedToken }: P) => {
  const { t } = useTranslation('components');
  const [callTime, setCallTime] = useState(0);
  useEffect(() => {
    if (roomJoined) {
      interval = setInterval(() => {
        setCallTime(callTime + 1);
      }, 60 * 1000);
    } else {
      setCallTime(0);
      interval && clearInterval(interval);
    }
  }, [roomJoined]);
  const dataSource = [
    {
      title: t('Call time'),
      description: `${callTime} minute(s)`
    },
    {
      title: t('Status'),
      description: roomJoined ? 'Live' : ''
    },
    {
      title: t('Received Token'),
      description: <NumberFormat value={receivedToken} suffix={t('token(s)')} />
    }
  ];
  return (
    <List
      dataSource={dataSource}
      renderItem={(item) => (
        <ListItem description={item.description} title={item.title} t={t} />
      )}
    />
  );
};
