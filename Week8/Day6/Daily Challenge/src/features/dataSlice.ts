import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchData } from "../api/api";

interface DataState {
  data: unknown;
  loading: boolean;
  error: string | null;
}

const initialState: DataState = {
  data: null,
  loading: false,
  error: null,
};

export const loadData = createAsyncThunk<unknown, string>(
  "data/load",
  async (url) => {
    return fetchData<unknown>(url);
  }
);

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(loadData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error";
      });
  },
});

export default dataSlice.reducer;
