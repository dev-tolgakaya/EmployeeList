import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  toast: {
    open: false,
    severity: "success",
    message: "",
  },
};

const slice = createSlice({
  name: "runtime",
  initialState,
  reducers: {
    setTost: (state, action) => {
      state.toast = action.payload;
    },
    resetToast: (state, _action) => {
      state.toast = initialState.toast;
    },
    openLoading: (state, _action) => {
      state.loading = true;
    },
    closeLoading: (state, _action) => {
      state.loading = false;
    },
  },
});

export default slice.reducer;
export const { setTost, resetToast, openLoading, closeLoading } = slice.actions;
