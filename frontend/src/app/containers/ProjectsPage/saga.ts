import { put, takeLatest } from 'redux-saga/effects';
import { projectsPageActions } from './slice';
import axiosInstance from '../../../utils/axiosConfig';
import { PROJECT_URI } from '../../../constants';
import { ProjectInterface } from '../../../types/RootState';

function* getProjectsRequest() {
  try {
    const response = yield axiosInstance.get(PROJECT_URI);
    const data: ProjectInterface[] = response.data;
    yield put(projectsPageActions.getProjectsSuccess(data));
  } catch (error) {
    yield put(projectsPageActions.getProjectsFailure(error));
  }
}

export function* projectsPageSaga() {
  yield takeLatest(projectsPageActions.getProjects.type, getProjectsRequest);
}
