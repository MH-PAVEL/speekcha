import * as React from 'react';
import { Form, Checkbox, TimePicker, Button, Space } from 'antd';
import { ISchedule } from 'src/interfaces';
import moment from 'moment';
import { formatDate } from 'src/lib';
import Router from 'next/router';

import { useTranslation } from '../../../i18n';

interface IProps {
  schedule: ISchedule;
  onFinish: Function;
  updating: boolean;
}

const { Item } = Form;
const { RangePicker } = TimePicker;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 4
    }
  },
  wrapperCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 16
    }
  }
};

const checkboxLayout = {
  wrapperCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 16,
      offset: 4
    }
  }
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 16,
      offset: 0
    }
  }
};

const PerformerScheduleForm = ({ schedule, onFinish, updating }: IProps) => {
  const { t } = useTranslation('components');
  const [formInput, setFormInput] = React.useState(schedule);
  const [form] = Form.useForm();
  const submit = () => {
    onFinish({ schedule: formInput });
  };
  return (
    <Form
      onFinish={submit}
      className="performerEditForm"
      form={form}
      {...formItemLayout}
    >
      {Object.keys(schedule).map((key) => (
        <div key={key}>
          <Item
            label={t(formatDate(moment().day(key).toDate(), 'dddd'))}
            name={key}
            initialValue={[
              moment(schedule[key].start || '00:00', 'HH:mm'),
              moment(schedule[key].end || '00:00', 'HH:mm')
            ]}
          >
            <RangePicker
              format="HH:mm"
              onChange={(values) =>
                setFormInput({
                  ...formInput,
                  [key]: {
                    ...formInput[key],
                    start: values[0].format('HH:mm'),
                    end: values[1].format('HH:mm')
                  }
                })
              }
            />
          </Item>
          <Item
            {...checkboxLayout}
            name={`${key}closed`}
            valuePropName="checked"
            initialValue={!schedule[key].closed}
          >
            <Checkbox
              value
              onChange={(event) =>
                setFormInput({
                  ...formInput,
                  [key]: {
                    ...formInput[key],
                    closed: !event.target.checked
                  }
                })
              }
            >
              {t('Available')}
            </Checkbox>
          </Item>
        </div>
      ))}
      <Item {...tailFormItemLayout}>
        <Space>
          <Button
            type="primary"
            htmlType="submit"
            disabled={updating}
            loading={updating}
          >
            {t('Save Changes')}
          </Button>
          <Button type="primary" onClick={() => Router.back()}>
            {t('Back')}
          </Button>
        </Space>
      </Item>
    </Form>
  );
};

export default PerformerScheduleForm;
