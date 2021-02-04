import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) => state.projectsPage || initialState;

export const selectProjectsPage = createSelector(
  [selectDomain],
  projectsPageState => projectsPageState,
);
