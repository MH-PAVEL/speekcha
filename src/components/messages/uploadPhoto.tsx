import { Upload, message } from 'antd';
import React, { PureComponent } from 'react';

import { withTranslation } from '../../../i18n';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isLt5M = file.size / 1024 / 1024 < 5;
  if (!isLt5M) {
    message.error('Image must smaller than 5MB!');
  }
  return isLt5M;
}

interface IState {
  loading: boolean;
  imageUrl: string;
}

interface IProps {
  imageUrl?: string;
  uploadUrl?: string;
  headers?: any;
  onUploaded?: Function;
  onFileReaded?: Function;
  options?: any;
  messageData?: any;
  t: any;
}

class ImageMessageUpload extends PureComponent<IProps, IState> {
  // state = {
  //   loading: false,
  //   imageUrl: this.props.imageUrl
  // };

  handleChange = (info: any) => {
    // if (info.file.status === 'uploading') {
    //   this.setState({ loading: true });
    //   return;
    // }
    const { onFileReaded, onUploaded } = this.props;
    if (info.file.status === 'done') {
      onFileReaded && onFileReaded(info.file.originFileObj);
      // Get this url from response in real world.
      getBase64(info.fileList[0].originFileObj, (imageUrl) => {
        onUploaded &&
          onUploaded({
            response: info.file.response,
            base64: imageUrl
          });
      });
    }
  };

  render() {
    const { options = {}, t } = this.props;
    const { headers, uploadUrl, messageData } = this.props;
    return (
      <Upload
        accept={'image/*'}
        name={options.fieldName || 'file'}
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action={uploadUrl}
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
        headers={headers}
        data={messageData}
      >
        <div className="ant-upload-text">{t('Upload')}</div>
      </Upload>
    );
  }
}

export const TranslatedCopmonent =
  withTranslation('components')(ImageMessageUpload);
export { TranslatedCopmonent as ImageMessageUpload };
