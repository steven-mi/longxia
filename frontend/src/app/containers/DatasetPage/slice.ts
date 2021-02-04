import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState, DatasetPageState } from './types';
import { DatasetInterface, ImageInterface } from '../../../types/RootState';

// The initial state of the ProjectsPage container
export const initialState: ContainerState = {
  isLoading: false,
  error: '',
};

const datasetPageSlice = createSlice({
  name: 'datasetPage',
  initialState,
  reducers: {
    getDataset(state, action: PayloadAction<string>) {
      state.isLoading = true;
    },
    getDatasetSuccess(state, action: PayloadAction<DatasetPageState>) {
      state.dataset = action.payload.dataset;
      state.datasetImages = action.payload.datasetImages;
      state.isLoading = false;
    },
    getDatasetFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const {
  actions: datasetPageActions,
  reducer,
  name: sliceKey,
} = datasetPageSlice;
