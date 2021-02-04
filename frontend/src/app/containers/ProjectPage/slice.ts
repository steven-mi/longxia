import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState, ProjectPageState } from './types';

// The initial state of the ProjectsPage container
export const initialState: ContainerState = {
  isLoading: false,
  error: '',
};

const projectPageSlice = createSlice({
  name: 'projectPage',
  initialState,
  reducers: {
    getProject(state, action: PayloadAction<string>) {
      state.isLoading = true;
    },
    getProjectSuccess(state, action: PayloadAction<ProjectPageState>) {
      state.project = action.payload.project;
      state.datasetImages = action.payload.datasetImages;
      state.isLoading = false;
    },
    getProjectFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const {
  actions: projectPageActions,
  reducer,
  name: sliceKey,
} = projectPageSlice;
