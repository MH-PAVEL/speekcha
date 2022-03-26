import * as React from 'react';
import { Row, Col, List } from 'antd';
import { useTranslation } from '../../../../i18n';

interface IProps {
  title: string;
  description: string;
  titleLayout: any;
  descriptionLayout: any;
}

const ListItem = ({
  title,
  description,
  titleLayout,
  descriptionLayout
}: IProps) => {
  const { t } = useTranslation('components');
  return (
    <List.Item>
      <Row style={{ width: '100%' }}>
        <Col className="light-text" {...titleLayout}>
          {t(title)}
        </Col>
        <Col style={{ fontWeight: 'bold' }} {...descriptionLayout}>
          {t(description)}
        </Col>
      </Row>
    </List.Item>
  );
};

export default ListItem;
