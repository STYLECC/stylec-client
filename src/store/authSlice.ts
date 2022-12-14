import { createSlice } from '@reduxjs/toolkit';
import { AppState } from './store';
import { HYDRATE } from 'next-redux-wrapper';

export interface AuthState {
  isLogin: boolean;
  userName: string;
  userId: string;
  imageUrl: string;
}

const initialState: AuthState = {
  isLogin: false,
  userName: '',
  userId: '',
  imageUrl: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthState(state, action) {
      state.isLogin = action.payload.isLogin;
      state.userName = action.payload.userName;
      state.userId = action.payload.userId;
      state.imageUrl = action.payload.imageUrl;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action: any) => {
      console.log('HYDRATE', state, action.payload);
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
