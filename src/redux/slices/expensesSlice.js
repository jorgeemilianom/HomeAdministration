import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { API } from '../../hooks/Api';
import { config } from '../../config'

const initialState = {
  data: [],
  reload: false
};

export const getDataExpenses = createAsyncThunk("stats/getDataExpenses", async () => {
  let response = await API._get(`${config.apiHost}/expenses/getall/jorgeemilianom@gmail.com`);
  let json = await response.data;
  return json;
});

export const expensesSlice = createSlice({
  name: '@expenses',
  initialState,
  reducers: {
    reloadData: (state, actions) => {
      
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getDataExpenses.fulfilled, (state, action) => {
      let updatedStats = action.payload;
      state.data = updatedStats;
    }),
    builder.addCase(getDataExpenses.pending, (state) => {
      state.data = [];
    }),
    builder.addCase(getDataExpenses.rejected, (state) => {
      state.data = [];
    })
  },
});

export const { reloadData } = expensesSlice.actions;
export default expensesSlice.reducer;
