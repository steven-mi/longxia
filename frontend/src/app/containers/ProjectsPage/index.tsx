import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { projectsPageActions, reducer, sliceKey } from './slice';
import { selectProjectsPage } from './selectors';
import { projectsPageSaga } from './saga';
import { Projects } from '../../components/Projects';
import { useHistory } from 'react-router-dom';

import { CreateProjectButton } from '../../components/CreateProjectButton/Loadable';
import { Button, Modal } from 'antd';

export const ProjectsPage = () => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: projectsPageSaga });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const projectsPage = useSelector(selectProjectsPage);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  useEffect(() => {
    dispatch(projectsPageActions.getProjects());
  }, [dispatch]);

  let history = useHistory();

  function toProjectPage(projectId: string) {
    history.push(`/projects/${projectId}`);
  }

  const [modalVisible, setModalVisible] = React.useState(false);
  useEffect(() => {
    if (!modalVisible) {
      dispatch(projectsPageActions.getProjects());
    }
  }, [dispatch, modalVisible]);
  return (
    <>
      <Helmet>
        <title>{t('projects')}</title>
        <meta name="description" content="My projects" />
      </Helmet>
      <Button type="primary" onClick={() => setModalVisible(true)}>
        Create project
      </Button>
      <Modal
        title={undefined}
        centered
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={1000}
      >
        <CreateProjectButton />
      </Modal>

      <Projects projects={projectsPage.projects} onClick={toProjectPage} />
    </>
  );
};
