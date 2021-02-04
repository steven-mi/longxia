import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Route, Switch, useHistory } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { Helmet } from 'react-helmet-async';
import { ProjectsPage } from '../ProjectsPage/Loadable';
import { ProjectPage } from '../ProjectPage/Loadable';
import { DatasetsPage } from '../DatasetsPage/Loadable';
import { Typography } from 'antd';
import { NotFoundPage } from '../NotFoundPage/Loadable';
import { DatasetPage } from '../DatasetPage/Loadable';
import {
  useInjectReducer,
  useInjectSaga,
} from '../../../utils/redux-injectors';
import { homePageActions, reducer, sliceKey } from '../HomePage/slice';
import { homePageSaga } from '../HomePage/saga';
import { useDispatch } from 'react-redux';

export const LandingPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: homePageSaga });
  const dispatch = useDispatch();

  let history = useHistory();

  function toProjects() {
    history.push('/projects');
    setCurrentItem('1');
  }

  function toDatasets() {
    history.push('/datasets');
    setCurrentItem('2');
  }

  function toHome() {
    history.push('/');
    setCurrentItem('1');
  }

  function toSignOut() {
    dispatch(homePageActions.resetToken());
    window.location.reload();
  }

  const { Header, Content, Footer } = Layout;
  const { Title } = Typography;

  const [currentItem, setCurrentItem] = React.useState('1');

  return (
    <>
      <Helmet
        defaultTitle={t('title')}
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content={t('description')} />
      </Helmet>

      <Layout>
        <Header>
          <div className={'logo'} onClick={() => toHome()}>
            <Title level={2}>longxia</Title>
          </div>
          <Menu selectedKeys={[currentItem]} mode="horizontal">
            <Menu.Item key="1" onClick={() => toProjects()}>
              Projects
            </Menu.Item>
            <Menu.Item key="2" onClick={() => toDatasets()}>
              Datasets
            </Menu.Item>
            <Menu.Item
              key="3"
              style={{ float: 'right' }}
              onClick={() => toSignOut()}
            >
              Sign out
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: 45, paddingTop: 50, minHeight: '100%' }}>
          <Switch>
            <Route exact path={['/', '/projects']} component={ProjectsPage} />
            <Route exact path="/datasets" component={DatasetsPage} />
            <Route path="/datasets/:datasetId" component={DatasetPage} />
            <Route path="/projects/:projectId" component={ProjectPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          <Title level={5}>
            © longxia 2020 <br /> Made in Germany <br />
            <button onClick={() => i18n.changeLanguage('de')}>de</button>
            <button onClick={() => i18n.changeLanguage('en')}>en</button>
          </Title>
        </Footer>
      </Layout>
    </>
  );
};
