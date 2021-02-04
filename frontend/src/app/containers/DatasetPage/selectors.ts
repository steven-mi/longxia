import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) => state.datasetPage || initialState;

export const selectDatasetPage = createSelector(
  [selectDomain],
  datasetPageState => datasetPageState,
);
