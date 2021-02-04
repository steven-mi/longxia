import { put, takeLatest } from 'redux-saga/effects';
import { datasetsPageActions } from './slice';
import axiosInstance from '../../../utils/axiosConfig';
import { DATASET_URI } from '../../../constants';
import { DatasetInterface } from '../../../types/RootState';

function* getDatasetsRequest() {
  try {
    const response = yield axiosInstance.get(DATASET_URI);
    const data: DatasetInterface[] = response.data;
    yield put(datasetsPageActions.getDatasetsSuccess(data));
  } catch (error) {
    yield put(datasetsPageActions.getDatasetsFailure(error));
  }
}

export function* datasetsPageSaga() {
  yield takeLatest(datasetsPageActions.getDatasets.type, getDatasetsRequest);
}
