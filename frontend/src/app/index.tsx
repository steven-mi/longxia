/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import { HomePage } from './containers/HomePage/Loadable';
import { NotFoundPage } from './containers/NotFoundPage/Loadable';
import { useTranslation } from 'react-i18next';
import { Layout } from 'antd';
import { LandingPage } from './containers/LandingPage/Loadable';
import './index.less';
import { setAuthHeader } from '../utils/axiosConfig';
import { useEffect } from 'react';

export function App() {
  const { t, i18n } = useTranslation();

  const token = localStorage.getItem('token');
  useEffect(() => {
    setAuthHeader(token);
  }, [token]);

  return (
    <BrowserRouter>
      <Helmet
        defaultTitle={t('title')}
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content={t('description')} />
      </Helmet>

      <Layout>
        <Switch>
          <Route path="/" component={token ? LandingPage : HomePage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}
