import React from 'react';
// import Link from 'next/link';
import { Form, Row, Col } from 'antd';
import { useTranslation, Link } from '../../../../i18n';
// const { t } = useTranslation('components');

const { Item: FormItem } = Form;

interface P {
  account: 'user' | 'performer' | 'studio';
  singularTextModel?: string;
}

const FormFooterLogin = ({ account, singularTextModel }: P) => {
  const { t } = useTranslation('components');
  return (
    <Row>
      <Col span={24}>
        {account !== 'studio' && account === 'user' ? (
          <FormItem>
            {t('Want to be a Member')}?{' '}
            <Link href="/auth/register/user">
              <a>{t('Signup here')}</a>
            </Link>
          </FormItem>
        ) : (
          account === 'performer' && (
            <FormItem>
              {t('Want to be a')} {t(singularTextModel) || t('Performer')}?{' '}
              <Link href="/auth/register/model">
                <a>{t('Signup here')}</a>
              </Link>
            </FormItem>
          )
        )}
        {account === 'studio' && (
          <FormItem>
            {`${t("Don't have account yet")}?`}
            <Link href="/studio/register">
              <a>{t('Signup now')}</a>
            </Link>
          </FormItem>
        )}
      </Col>
      <Col span={24}>
        {account === 'user' && (
          <FormItem>
            {t('Are you a')} {singularTextModel || t('Performer')}?{' '}
            <Link href="/auth/login/performer">
              <a>{t('Login here')}</a>
            </Link>
          </FormItem>
        )}
        {account === 'performer' && (
          <FormItem>
            {t('Are you a Member')}?{' '}
            <Link href="/auth/login/user">
              <a>{t('Login here')}</a>
            </Link>
          </FormItem>
        )}
      </Col>
    </Row>
  );
};
FormFooterLogin.defaultProps = {
  singularTextModel: 'Performer'
};
export default FormFooterLogin;
