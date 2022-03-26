/* eslint-disable no-return-assign */
import './footer.less';
import { SETTING_KEYS } from 'src/constants';
import React from 'react';
import { Row, Col, Button, message } from 'antd';
import { IPerformer, IUser, StreamSettings } from 'src/interfaces';
import {
  PlusCircleOutlined,
  UserOutlined,
  CrownOutlined
} from '@ant-design/icons';
import { checkUserLogin, getResponseError } from 'src/lib/utils';
import Router from 'next/router';
import Popup from '@components/common/base/popup';
import { transactionService } from 'src/services';
import NumberFormat from '@components/common/layout/numberformat';
import SendTipContent from './tip/content';

import { useTranslation } from '../../../i18n';

const btnStyle = { height: 50, marginBottom: 1 };

interface Interface {
  activeConversation: any;
  updateCurrentUserBalance?: Function;
  loggedIn: boolean;
  performer: IPerformer;
  user: IUser;
  inGroupChat?: boolean;
  inPrivateChat?: boolean;
  settings: StreamSettings;
}

const Footer = ({
  activeConversation,
  performer,
  loggedIn,
  inGroupChat,
  inPrivateChat,
  user,
  updateCurrentUserBalance,
  settings
}: Interface) => {
  const { t } = useTranslation('components');
  const tipPopupRef = React.createRef<Popup>();
  let contentRef;
  const { username, _id } = performer;
  const [tipping, setTipping] = React.useState(false);
  const [disableOk, setDisableOk] = React.useState(false);
  const handleError = async (e) => {
    const error = await Promise.resolve(e);
    message.error(getResponseError(error));
  };
  const goChatRoom = (roomName: 'privatechat' | 'groupchat') => {
    if (!checkUserLogin(loggedIn, user)) {
      if (process.browser) {
        Router.push('/auth/login');
      }
      return;
    }

    const option =
      roomName === 'privatechat'
        ? SETTING_KEYS.OPTION_FOR_PRIVATE
        : SETTING_KEYS.OPTION_FOR_GROUP;
    const path = settings[option] === 'webrtc' ? 'webrtc/' : '';
    Router.push(
      {
        pathname: `/stream/${path}${roomName}`,
        query: { username, performer: JSON.stringify(performer) }
      },
      `/stream/${path}${roomName}/${username}`
    );
  };

  const getMoreTokens = () => {
    if (!checkUserLogin(loggedIn, user)) {
      if (process.browser) {
        Router.push('/auth/login');
      }
      return;
    }

    Router.push('/account/user/funds-tokens');
  };

  const sendTip = () => {
    if (!checkUserLogin(loggedIn, user)) {
      message.error(`${t('Please login to send tip to')} ${username}!`);
      return;
    }

    tipPopupRef.current && tipPopupRef.current.setVisible(true);
  };

  const onOk = async () => {
    if (activeConversation?.data?._id) {
      const ref = tipPopupRef.current;
      try {
        setTipping(true);
        const token = contentRef ? contentRef.getValueToken() : 0;
        if (parseInt(token, 10) <= 0) return;

        await transactionService.sendTipToken(
          _id,
          token,
          activeConversation.data._id
        );
        ref && ref.setVisible(false);
        updateCurrentUserBalance && updateCurrentUserBalance(-token);
        const content = (
          <NumberFormat value={token} prefix="You sent " suffix={t('tokens')} />
        );
        message.success(content);
      } catch (e) {
        handleError(e);
      } finally {
        setTipping(false);
        ref && ref.setVisible(false);
      }
    }
  };

  return (
    <div className="stream-footer">
      <Popup
        title={`${t('Tips to')} ${username}`}
        t={t}
        okButtonProps={{ disabled: disableOk }}
        content={
          <SendTipContent
            ref={(ref) => (contentRef = ref)}
            t={t}
            setDisableOk={setDisableOk}
          />
        }
        ref={tipPopupRef}
        loading={tipping}
        onOk={onOk}
        width={567}
      />
      <Row gutter={[1, 1]} style={{ marginBottom: '15px', marginTop: '1px' }}>
        <Col lg={6} xs={12} md={12}>
          <Button
            disabled={inGroupChat}
            type="primary"
            style={{ ...btnStyle }}
            onClick={() => goChatRoom('groupchat')}
            block
            icon={
              <img
                className="anticon"
                src="/icons/group.svg"
                height={16}
                alt=""
              />
            }
          >
            {t('Group Chat')}
          </Button>
        </Col>
        <Col lg={6} xs={12} md={12}>
          <Button
            disabled={inPrivateChat}
            type="primary"
            style={{ ...btnStyle }}
            onClick={() => goChatRoom('privatechat')}
            block
            icon={<UserOutlined />}
          >
            {t('Private Chat')}
          </Button>
        </Col>
        <Col lg={6} xs={12} md={12}>
          <Button
            type="primary"
            style={{ ...btnStyle }}
            block
            onClick={() => getMoreTokens()}
            icon={<CrownOutlined />}
          >
            {t('Top-up My Tokens')}
          </Button>
        </Col>
        <Col lg={6} xs={12} md={12}>
          <Button
            type="primary"
            style={{ ...btnStyle }}
            onClick={() => sendTip()}
            block
            icon={<PlusCircleOutlined />}
          >
            {t('Send Tip')}
          </Button>
        </Col>
      </Row>
    </div>
  );
};
Footer.defaultProps = {
  updateCurrentUserBalance: null,
  inGroupChat: false,
  inPrivateChat: false
};

export default Footer;
