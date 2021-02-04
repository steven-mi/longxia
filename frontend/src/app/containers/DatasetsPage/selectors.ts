import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) => state.datasetsPage || initialState;

export const selectDatasetsPage = createSelector(
  [selectDomain],
  datasetsPageState => datasetsPageState,
);
