import { createSlice } from '@reduxjs/toolkit';
import { AppState } from './store';
import { HYDRATE } from 'next-redux-wrapper';

export interface AuthState {
  isLogin: boolean;
  userName: string | null;
  userId: string | null;
  imageUrl: string | null;
}

const initialState: AuthState = {
  isLogin: false,
  userName: null,
  userId: null,
  imageUrl: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthState(state, action) {
      const { isLogin, userName, userId, imageUrl } = action.payload;
      state.isLogin = isLogin;
      state.userName = userName;
      state.userId = userId;
      state.imageUrl = imageUrl;
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
