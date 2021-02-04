import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState } from './types';
import { TokenInterface } from '../../../types/RootState';

// The initial state of the ProjectsPage container
export const initialState: ContainerState = {
  token: { auth_token: '' },
  isLoading: false,
  error: '',
};

const homePageSlice = createSlice({
  name: 'homePage',
  initialState,
  reducers: {
    resetToken(state) {
      state.isLoading = true;
    },
    getToken(state, action: PayloadAction<string>) {
      state.isLoading = true;
    },
    getTokenSuccess(state, action: PayloadAction<TokenInterface>) {
      state.token = action.payload;
      state.isLoading = false;
    },
    getTokenFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const {
  actions: homePageActions,
  reducer,
  name: sliceKey,
} = homePageSlice;
