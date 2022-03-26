import env from 'src/env';
import { message } from 'antd';
import { RcFile } from 'antd/lib/upload';

import { useTranslation } from '../../i18n';

export function beforeAvatarUpload(file: RcFile): boolean {
  const { t } = useTranslation('components');
  const ext = file.name.split('.').pop().toLowerCase();
  const isImageAccept = env.imageAccept
    .split(',')
    .map((item: string) => item.trim())
    .indexOf(`.${ext}`);
  if (isImageAccept === -1) {
    message.error(`${t('You can only upload')} ${env.imageAccept} file!`);
    return false;
  }

  const isLt2M = file.size / 1024 / 1024 < (env.maximumSizeUploadAvatar || 2);
  if (!isLt2M) {
    message.error(
      `${t('Image must smaller than')} ${env.maximumSizeUploadAvatar || 2}MB!`
    );
    return false;
  }

  return true;
}
