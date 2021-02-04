import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState } from './types';
import { ProjectInterface } from '../../../types/RootState';

// The initial state of the ProjectsPage container
export const initialState: ContainerState = {
  projects: [],
  isLoading: false,
  error: '',
};

const projectsPageSlice = createSlice({
  name: 'projectsPage',
  initialState,
  reducers: {
    getProjects(state) {
      state.isLoading = true;
    },
    getProjectsSuccess(state, action: PayloadAction<ProjectInterface[]>) {
      state.projects = action.payload;
      state.isLoading = false;
    },
    getProjectsFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const {
  actions: projectsPageActions,
  reducer,
  name: sliceKey,
} = projectsPageSlice;
