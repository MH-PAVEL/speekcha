import React from 'react';
import { IPerformerPhoto } from 'src/interfaces';
import {
  Form,
  Input,
  Button,
  Space,
  Radio,
  Upload,
  Tooltip,
  Modal
} from 'antd';
import Router from 'next/router';
import { UploadOutlined, CloseCircleOutlined } from '@ant-design/icons';
import GalleiresSelect from '@components/common/base/select/galleries';
import { formItemLayout, tailFormItemLayout } from 'src/lib';
import FormInputItem from '@components/common/base/input-item-list';
import { FormItemProps } from 'antd/lib/form/FormItem';

import './index.less';
import { useTranslation } from '../../../i18n';

interface IProps {
  photo?: Partial<IPerformerPhoto>;
  onFinish(data: any): Function;
  loading: boolean;
}

const imageStyle: React.CSSProperties = {
  height: 225,
  width: 225,
  objectFit: 'cover',
  marginTop: 10,
  display: 'block'
};

const initialValues: Partial<IPerformerPhoto> = {
  description: '',
  status: 'draft'
};

const PERFORMER_PHOTO_STATUS = [
  { key: 'draft', name: 'Draft' },
  { key: 'active', name: 'Active' },
  { key: 'inactive', name: 'Inactive' }
];

const FormPhoto = ({ onFinish, loading, photo }: IProps) => {
  const { t } = useTranslation('components');
  const [form] = Form.useForm();
  const formInput: FormItemProps[] = [
    {
      name: 'title',
      label: t('Title'),
      rules: [
        {
          required: true,
          message: t('Please input photo title')
        }
      ],
      children: <Input placeholder={t('Title Photo')} />
    },
    {
      name: 'galleryId',
      label: t('Gallery'),
      rules: [{ required: true, message: t('please select photo gallery') }],

      children: (
        <GalleiresSelect form={form} defaultGalleryId={photo.galleryId} />
      )
    },
    {
      name: 'description',
      label: t('Description'),
      children: <Input.TextArea placeholder={t('Title Description')} />
    },
    {
      name: 'status',
      label: t('Status'),
      children: (
        <Radio.Group>
          {PERFORMER_PHOTO_STATUS.map((status) => (
            <Radio value={status.key} key={status.key}>
              {t(status.name)}
            </Radio>
          ))}
        </Radio.Group>
      )
    }
  ];
  const [file, setFile] = React.useState(photo.photo ? photo.photo.url : null);

  const [statePreview, setPreview] = React.useState(false);
  const onPreview = () => {
    setPreview(!statePreview);
  };
  const onFileChange = (info) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setFile(e.target.result as string);
    };
    reader.readAsDataURL(info.fileList[0].originFileObj);
    return false;
  };
  return (
    <Form
      {...formItemLayout}
      form={form}
      onFinish={onFinish}
      name="photoCreatingForm"
      initialValues={{
        ...initialValues,
        ...photo
      }}
      layout="vertical"
    >
      <FormInputItem fields={formInput} />
      <Form.Item name="photo" label={t('Photo File')}>
        <Upload
          showUploadList={false}
          accept="image/*"
          customRequest={() => true}
          onChange={onFileChange}
        >
          <Button>
            <UploadOutlined /> {t('Upload File')}
          </Button>
        </Upload>
      </Form.Item>
      {file && (
        <Button onClick={onPreview} type="link" className="click-to-preview">
          <img src={file} style={imageStyle} alt="" />

          <Tooltip title="Preview image">
            <span className="hide-icon-eyes">
              <img
                src="/icons/eye.svg"
                alt=""
                style={{ width: '30px', height: '30px' }}
              />
            </span>
          </Tooltip>
        </Button>
      )}
      {statePreview === true && (
        <Modal
          width={650}
          visible={statePreview}
          footer={false}
          onCancel={() => onPreview()}
          closeIcon={
            <CloseCircleOutlined
              style={{ backgroundColor: '#fff', padding: '3px' }}
            />
          }
        >
          <img src={file} style={{ width: '600px', height: '800px' }} alt="" />
        </Modal>
      )}
      <Form.Item {...tailFormItemLayout}>
        <Space>
          <Button
            type="primary"
            htmlType="submit"
            disabled={loading}
            loading={loading}
          >
            {t('Save Changes')}
          </Button>
          <Button type="primary" onClick={() => Router.back()}>
            {t('Back')}
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};
FormPhoto.defaultProps = {
  photo: null
};
export default FormPhoto;
