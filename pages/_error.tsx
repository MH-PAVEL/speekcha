/* eslint-disable no-nested-ternary */
import React from 'react';

import { withTranslation } from '../i18n';

function Error({ statusCode, message = '', t }: any) {
  return (
    <p style={{ textAlign: 'center' }}>
      {message
        ? `${statusCode} - ${message}`
        : statusCode
        ? `${statusCode} - ${t('An error')} ${statusCode} ${t(
            'occurred on server'
          )}`
        : t('An error occurred on client')}
    </p>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode, namespacesRequired: ['common'] };
};

export default withTranslation()(Error);
