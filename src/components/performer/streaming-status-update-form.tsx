import React from 'react';
import { Button, Input, Row, Col } from 'antd';
import { useTranslation } from '../../../i18n';

interface IProps {
  submit: Function;
  status: string;
  updating: boolean;
}

export default ({ status, updating, submit }: IProps) => {
  const { t } = useTranslation('components');
  const [statusInput, setStatusInput] = React.useState(status);
  const handleClick = () => {
    submit(statusInput);
  };

  return (
    <Row gutter={{ sm: 10, xs: 0 }}>
      <Col lg={20} md={18} sm={24} xs={24}>
        <Input
          placeholder={t('Update your status')}
          value={statusInput}
          onChange={(event) => setStatusInput(event.target.value)}
        />
      </Col>
      <Col lg={4} md={6} sm={24} xs={24}>
        <Button
          type="primary"
          onClick={handleClick}
          loading={updating}
          className="mb-10"
          block
          disabled={updating}
        >
          {t('Update')}
        </Button>
      </Col>
    </Row>
  );
};
