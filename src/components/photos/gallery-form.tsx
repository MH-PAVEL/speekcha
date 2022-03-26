/* eslint-disable no-return-assign */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {
  IPerformerGallery,
  IPerformer,
  IPerformerPhotoPayload,
  IPhoto
} from 'src/interfaces';
import {
  Form,
  Input,
  Button,
  Space,
  Radio,
  Row,
  Col,
  Upload,
  Modal,
  message,
  Divider,
  Select,
  Checkbox
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Router from 'next/router';
import {
  formItemLayout,
  tailFormItemLayout,
  getBase64,
  getResponseError,
  unitPrices
} from 'src/lib';
import FormInputItem from '@components/common/base/input-item-list';
import { FormItemProps } from 'antd/lib/form/FormItem';
import { photoService } from 'src/services';
import './index.less';
import { IResponse } from '@services/api-request';
import NumberFormat from '@components/common/layout/numberformat';
import { NamePath } from 'antd/lib/form/interface';
import { useTranslation } from '../../../i18n';

interface IProps {
  gallery?: Partial<IPerformerGallery>;
  performer?: IPerformer;
  onFinish(data: any): Function;
  remove?(id: string): Function;
  loading: boolean;
}

interface IFile {
  uid?: string;
  name?: string;
  status?: 'uploading' | 'done' | 'error' | 'removed';
  url?: string;
  thumbUrl?: string;
  originFileObj?: any;
}

// const imageStyle: React.CSSProperties = {
//   height: 225,
//   width: 225,
//   objectFit: 'cover',
//   marginTop: 10
// };

const initialValues: Partial<IPerformerGallery> = {
  description: '',
  isSale: false,
  status: 'draft'
};

const PERFORMER_GALLERY_STATUS = [
  { key: 'draft', name: 'Draft' },
  { key: 'active', name: 'Active' },
  { key: 'inactive', name: 'Inactive' }
];

const FormGallery = ({ onFinish, loading, gallery, performer }: IProps) => {
  const { t } = useTranslation('components');
  let inputRef;
  const [form] = Form.useForm();
  const [uploading, setUploading] = React.useState(false);
  const [fileList, setFileList] = React.useState([]);
  if (gallery?.token && !unitPrices.find((p) => p.value === gallery.token)) {
    unitPrices.push({
      value: gallery.token,
      text: <NumberFormat value={gallery.token} suffix={t('Tokens')} />
    });
    unitPrices.sort((a, b) => a.value - b.value);
  }
  const [tokens, setTokenPrice] = React.useState(unitPrices);
  const priceSelectOptions = (tokens || []).map((price) => ({
    label: price.text,
    value: price.value
  }));

  const dependencies: NamePath = ['isSale', 'token'];
  const formInput: FormItemProps[] = [
    {
      name: 'name',
      label: t('Name'),
      rules: [
        {
          required: true,
          message: t('Please input gallery name')
        }
      ],
      children: <Input placeholder={t('Title Gallery')} />
    },
    {
      name: 'description',
      label: t('Description'),
      children: <Input.TextArea placeholder={t('Title Description')} />
    },
    {
      name: 'isSale',
      valuePropName: 'checked',
      children: <Checkbox>{t('Is sale Gallery')}?</Checkbox>
    },
    {
      fieldKey: 'tokenPrice',
      label: t('Token'),
      dependencies,
      children: () => (
        <Form.Item
          name="token"
          dependencies={dependencies}
          rules={[
            ({ getFieldValue }) => ({
              validator: (_, value) =>
                new Promise((resolve, reject) => {
                  const isValid = getFieldValue('isSale');
                  if (!isValid || (isValid && parseInt(value, 10) > 0)) {
                    return resolve(null);
                  }

                  return reject(
                    new Error(t('Price must be positive integer number'))
                  );
                })
            })
          ]}
        >
          <Select
            disabled={!form.getFieldValue('isSale')}
            placeholder={t('Please Select Number of Token')}
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                return e.preventDefault();
              }
              return {};
            }}
            options={priceSelectOptions}
            dropdownRender={(menu) => (
              <div>
                {menu}
                <Divider dashed />
                <Space>
                  <Input
                    placeholder={t('Input number of token')}
                    type="number"
                    min={1}
                    ref={(ref) => (inputRef = ref)}
                  />
                  <Button
                    onClick={() => {
                      let token = parseInt(inputRef.state.value, 10);
                      if (token < 1) token = 1;

                      if (tokens.find((t) => t.value === token)) return;

                      setTokenPrice(
                        [
                          ...tokens,
                          {
                            text: (
                              <NumberFormat
                                value={token}
                                suffix={t('Tokens')}
                              />
                            ),
                            value: token
                          }
                        ].sort((a, b) => a.value - b.value)
                      );
                    }}
                  >
                    {t('Add')}
                  </Button>
                </Space>
              </div>
            )}
          />
        </Form.Item>
      )
    },
    {
      name: 'status',
      label: t('Status'),
      children: (
        <Radio.Group>
          {PERFORMER_GALLERY_STATUS.map((status) => (
            <Radio value={status.key} key={status.key}>
              {t(status.name)}
            </Radio>
          ))}
        </Radio.Group>
      )
    }
  ];

  const searchGalleryPhoto = async () => {
    try {
      if (gallery._id) {
        const resp = await photoService.search({
          galleryId: gallery._id,
          performerId: performer._id
        });
        if (resp.data.total > 0) {
          setFileList(
            resp.data?.data?.map((p) => ({
              ...p,
              uid: p._id,
              name: p.title,
              status: 'done',
              uploadStatus: p.status,
              url: p.photo.url
            }))
          );
        }
      }
    } catch (err) {
      const error = await Promise.resolve(err);
      message.error(getResponseError(error));
    }
  };

  const onUploading = (file) => {
    // console.log(file);
  };

  const handleUploadPhotos = async () => {
    if (!gallery && !gallery._id) return;
    if (!fileList || !fileList.length) {
      message.error(t('Please select photo'));
      return;
    }

    const data: IPerformerPhotoPayload = {
      galleryId: gallery._id,
      token: 0,
      performerId: performer._id,
      status: 'active'
    };

    const uploadFiles: IFile[] = [...fileList].filter(
      (f) => f.status === 'uploading' && f.originFileObj
    );
    if (!uploadFiles.length) {
      message.error(t('Please select new file'));
      return;
    }
    setUploading(true);

    /**
     * Upload photos
     */
    try {
      const resp = (await Promise.all(
        uploadFiles.map((file) =>
          photoService.uploadImages(file.originFileObj, data, onUploading)
        )
      )) as IResponse<IPhoto>[];

      const uploadedFiles = fileList.filter((f) => f.status === 'done');
      const uploadingFiles = fileList.filter((f) => f.status === 'uploading');

      setFileList([
        ...uploadedFiles,
        ...resp.map(
          ({ data: d }, index) =>
            d._id && {
              ...uploadingFiles[index],
              ...d,
              uid: d._id,
              status: 'done',
              uploadStatus: d.status,
              name: d.title
            }
        )
      ]);
    } catch (err) {
      const error = await Promise.resolve(err);
      message.error(getResponseError(error));
    }
    setUploading(false);
  };

  const handleBeforeUpload = () => false;

  const handleChange = async ({ fileList: fl }) => {
    const files = await Promise.all(
      fl
        .filter((file) => file.status !== 'done')
        .map((file) => getBase64(file.originFileObj, 'uploading', file))
    );
    const uploadedFiles = fl.filter((file) => file.status === 'done');
    setFileList([
      ...uploadedFiles,
      ...files.map((file: FileList) => ({ ...file }))
    ]);
  };

  const onPreview = (f) => {
    const file = f;
    file.status = file.uploadStatus;
    Router.push(
      {
        pathname: '/account/performer/photos/update',
        query: { data: JSON.stringify(file) }
      },
      `/account/performer/photos/${file.uid}/update`
    );
  };

  const onRemove = async (file) => {
    try {
      setUploading(true);
      await photoService.remove(file.uid);
      message.success(t('Removed'));
    } catch (e) {
      const err = await Promise.resolve(e);
      message.error(getResponseError(err));
      setTimeout(() => setFileList(fileList), 1000);
    } finally {
      setUploading(false);
    }
  };

  React.useEffect(() => {
    if (!uploading && fileList?.length) {
      const uploadingFiles = fileList.filter((f) => f.status === 'uploading');
      uploadingFiles.length > 0 && handleUploadPhotos();
    }
  }, [fileList, uploading]);

  React.useEffect(() => {
    searchGalleryPhoto();
  }, []);

  return (
    <Form
      {...formItemLayout}
      form={form}
      onFinish={onFinish}
      name="galleryCreatingForm"
      initialValues={{
        ...initialValues,
        ...gallery
      }}
      layout="vertical"
    >
      <Row>
        <Col sm={24} xs={24}>
          <FormInputItem fields={formInput} />
          {gallery._id && (
            <Upload
              accept="image/*"
              multiple
              showUploadList
              onPreview={onPreview}
              onRemove={onRemove}
              listType="picture-card"
              disabled={uploading}
              fileList={fileList}
              onChange={handleChange}
              beforeUpload={handleBeforeUpload}
            >
              <PlusOutlined />
              <div className="ant-upload-text">{t('Upload')}</div>
            </Upload>
          )}
        </Col>
      </Row>
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
FormGallery.defaultProps = {
  gallery: null,
  performer: null,
  remove: null
};
export default FormGallery;
