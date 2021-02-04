import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState } from './types';
import { DatasetInterface } from '../../../types/RootState';

// The initial state of the ProjectsPage container
export const initialState: ContainerState = {
  datasets: [],
  isLoading: false,
  error: '',
};

const datasetsPageSlice = createSlice({
  name: 'datasetsPage',
  initialState,
  reducers: {
    getDatasets(state) {
      state.isLoading = true;
    },
    getDatasetsSuccess(state, action: PayloadAction<DatasetInterface[]>) {
      state.datasets = action.payload;
      state.isLoading = false;
    },
    getDatasetsFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const {
  actions: datasetsPageActions,
  reducer,
  name: sliceKey,
} = datasetsPageSlice;
