import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from './store';
import { HYDRATE } from 'next-redux-wrapper';

export interface AuthState {
  authState: boolean;
}

const initialState: AuthState = {
  authState: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthState(state, action) {
      state.authState = action.payload;
    },
  },

  // extraReducers: {
  //   [HYDRATE]: (state: AuthState, action: PayloadAction<any>) => {
  //     console.log('HYDRATE', action.payload);
  //     return {
  //       ...state,
  //       ...action.payload.auth,
  //     };
  //   },
  // },

  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action: any) => {
      return {
        ...state,
        ...action.payload.auth,
      };
    });
  },
});

export const { setAuthState } = authSlice.actions;

export const selectAuthState = (state: AppState) => state?.auth;

export default authSlice.reducer;
