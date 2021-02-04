import { put, takeLatest } from 'redux-saga/effects';
import { projectPageActions } from './slice';
import axiosInstance from '../../../utils/axiosConfig';
import { IMAGE_URI, PROJECT_URI } from '../../../constants';
import { ImageInterface, ProjectInterface } from '../../../types/RootState';
import { PayloadAction } from '@reduxjs/toolkit';
import { datasetPageActions } from '../DatasetPage/slice';

function* getProjectRequest(action: PayloadAction<string>) {
  try {
    const projectResponse = yield axiosInstance.get(
      `${PROJECT_URI}/${action.payload}`,
    );
    const project: ProjectInterface = projectResponse.data;

    const datasetImageResponses = yield Promise.all(
      project.imageIds.map(datasetId => {
        return axiosInstance.get(`${IMAGE_URI}/${datasetId}`);
      }),
    );
    const datasetImages: ImageInterface[] = datasetImageResponses.map(
      response => response.data,
    );
    yield put(
      projectPageActions.getProjectSuccess({
        project: project,
        datasetImages: datasetImages,
        isLoading: false,
        error: '',
      }),
    );
  } catch (error) {
    yield put(datasetPageActions.getDatasetFailure(error.toLocaleString()));
  }
}

export function* projectPageSaga() {
  yield takeLatest(projectPageActions.getProject.type, getProjectRequest);
}
