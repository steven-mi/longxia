import { put, takeLatest } from 'redux-saga/effects';
import { datasetPageActions } from './slice';
import axiosInstance from '../../../utils/axiosConfig';
import { DATASET_URI, IMAGE_URI } from '../../../constants';
import { DatasetInterface, ImageInterface } from '../../../types/RootState';
import { PayloadAction } from '@reduxjs/toolkit';

function* getDatasetRequest(action: PayloadAction<string>) {
  try {
    const datasetResponse = yield axiosInstance.get(
      `${DATASET_URI}/${action.payload}`,
    );
    const dataset: DatasetInterface = datasetResponse.data;

    const datasetImageResponses = yield Promise.all(
      dataset.imageIds.map(datasetId => {
        return axiosInstance.get(`${IMAGE_URI}/${datasetId}`);
      }),
    );
    const datasetImages: ImageInterface[] = datasetImageResponses.map(
      response => response.data,
    );
    yield put(
      datasetPageActions.getDatasetSuccess({
        dataset: dataset,
        datasetImages: datasetImages,
        isLoading: false,
        error: '',
      }),
    );
  } catch (error) {
    yield put(datasetPageActions.getDatasetFailure(error.toLocaleString()));
  }
}

export function* datasetPageSaga() {
  yield takeLatest(datasetPageActions.getDataset.type, getDatasetRequest);
}
