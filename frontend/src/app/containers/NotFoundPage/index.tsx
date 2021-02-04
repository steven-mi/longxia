/**
 *
 * NotFoundPage
 *
 */

import React from 'react';
import { Result, Button } from 'antd';
import { useTranslation } from 'react-i18next';

export const NotFoundPage = () => {
  const { t, i18n } = useTranslation();

  return (
    <>
      <Result
        status="404"
        title="404"
        subTitle={'404'}
        extra={<Button type="primary">Back Home</Button>}
      />
    </>
  );
};
