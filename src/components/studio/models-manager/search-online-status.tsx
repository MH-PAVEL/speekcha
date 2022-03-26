import { Form, Button, Input, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import React from 'react';

import { useTranslation } from '../../../../i18n';

interface IProps {
  onSearch?: () => void;
  searching: boolean;
}

const StudioModelsSearch = ({ onSearch, searching }: IProps) => {
  const { t } = useTranslation('components');
  return (
    <div>
      <Form
        onFinish={onSearch}
        name="studioSearchModels"
        // className="performerEditForm"
        layout="vertical"
        initialValues={{
          q: '',
          status: ''
        }}
      >
        <Form.Item name="q" key="name">
          <Input
            type="text"
            prefix={<SearchOutlined className="site-form-item-icon" />}
            placeholder={`${t('Search')}....`}
          />
        </Form.Item>
        <Form.Item name="status" key="onlineStatus">
          <Select>
            <Select.Option value="" key="">
              {t('All Status')}
            </Select.Option>
            <Select.Option value="active" key="active">
              {t('Active')}
            </Select.Option>
            <Select.Option value="inactive" key="inactive">
              {t('Inactive')}
            </Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            disabled={searching}
            loading={searching}
          >
            {t('Search')}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
StudioModelsSearch.defaultProps = {
  onSearch: null
};

export default StudioModelsSearch;
