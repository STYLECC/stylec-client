import { createSlice } from '@reduxjs/toolkit';
import { AppState } from './store';

export interface CountState {
  count: number;
}

const initialState: CountState = {
  count: 0,
};

export const countSlice = createSlice({
  name: 'count',
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
  },
});

export const { increment } = countSlice.actions;

export const selectCountState = (state: AppState) => state?.count;

export default countSlice.reducer;
