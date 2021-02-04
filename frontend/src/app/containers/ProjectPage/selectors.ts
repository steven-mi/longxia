import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) => state.projectPage || initialState;

export const selectProjectPage = createSelector(
  [selectDomain],
  projectPageState => projectPageState,
);
