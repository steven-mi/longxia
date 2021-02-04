import { put, takeEvery } from 'redux-saga/effects';
import { homePageActions } from './slice';
import { PayloadAction } from '@reduxjs/toolkit';

function* getTokenRequest(action: PayloadAction<string>) {
  // TODO: validate token
  const token = action.payload;
  localStorage.setItem('token', token);
  yield put(homePageActions.getTokenSuccess({ auth_token: token }));
}

function* resetTokenRequest() {
  const token = '';
  localStorage.setItem('token', token);
  yield put(homePageActions.getTokenSuccess({ auth_token: token }));
}

export function* homePageSaga() {
  yield takeEvery(homePageActions.getToken.type, getTokenRequest);
  yield takeEvery(homePageActions.resetToken.type, resetTokenRequest);
}
