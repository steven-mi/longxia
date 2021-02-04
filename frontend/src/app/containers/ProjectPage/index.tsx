/**
 *
 * ProjectsPage
 *
 */

import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { reducer, sliceKey, projectPageActions } from './slice';
import { selectProjectPage } from './selectors';
import { projectPageSaga } from './saga';
import { useParams } from 'react-router-dom';
import { ImageList } from '../../components/ImageList/Loadable';

export const ProjectPage = () => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: projectPageSaga });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const projectPage = useSelector(selectProjectPage);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  const { projectId } = useParams<Record<string, string>>();
  useEffect(() => {
    dispatch(projectPageActions.getProject(projectId));
  }, [dispatch, projectId]);

  console.log(projectPage);
  return (
    <>
      <Helmet>
        <title>{t('projects')}</title>
        <meta name="description" content="My projects" />
      </Helmet>

      <p>{projectPage.project?.name}</p>
      <ImageList images={projectPage.datasetImages} />
    </>
  );
};
