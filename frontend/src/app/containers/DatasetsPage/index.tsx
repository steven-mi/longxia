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
import { reducer, sliceKey, datasetsPageActions } from './slice';
import { selectDatasetsPage } from './selectors';
import { datasetsPageSaga } from './saga';
import { useHistory } from 'react-router-dom';

import { Datasets } from '../../components/Datasets';
import { CreateDataset } from '../../components/CreateDataset/Loadable';
import { Button, Modal } from 'antd';

export const DatasetsPage = () => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: datasetsPageSaga });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const datasetsPage = useSelector(selectDatasetsPage);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  let history = useHistory();

  function toDatasetPage(datasetId: string) {
    history.push(`/datasets/${datasetId}`);
  }

  const [modalVisible, setModalVisible] = React.useState(false);
  useEffect(() => {
    if (!modalVisible) {
      dispatch(datasetsPageActions.getDatasets());
    }
  }, [dispatch, modalVisible]);
  return (
    <>
      <Helmet>
        <title>{t('projects')}</title>
        <meta name="description" content="My projects" />
      </Helmet>

      <Button type="primary" onClick={() => setModalVisible(true)}>
        Create dataset
      </Button>
      <Modal
        title={undefined}
        centered
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={1000}
      >
        <CreateDataset />
      </Modal>

      <Datasets datasets={datasetsPage.datasets} onClick={toDatasetPage} />
    </>
  );
};
