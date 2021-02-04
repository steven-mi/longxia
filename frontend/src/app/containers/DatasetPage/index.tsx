/**
 *
 * ProjectsPage
 *
 */

import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { datasetPageActions, reducer, sliceKey } from './slice';
import { selectDatasetPage } from './selectors';
import { datasetPageSaga } from './saga';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useParams } from 'react-router-dom';
import { ImageList } from '../../components/ImageList';

export const DatasetPage = () => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: datasetPageSaga });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const datasetPage = useSelector(selectDatasetPage);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  const { datasetId } = useParams<Record<string, string>>();
  useEffect(() => {
    dispatch(datasetPageActions.getDataset(datasetId));
  }, [dispatch, datasetId]);

  return (
    <>
      <Helmet>
        <title>{t('projects')}</title>
        <meta name="description" content="My projects" />
      </Helmet>

      {datasetPage.dataset?.name}
      <ImageList images={datasetPage.datasetImages || []} />
    </>
  );
};
