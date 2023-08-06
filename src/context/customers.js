import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: JSON.parse(localStorage.getItem("customers")) || [],
};

export const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    addCustomer: (state, action) => {
      state.value = [action.payload, ...state.value];
      localStorage.setItem("customers", JSON.stringify(state.value));
    },
    removeCustomer: (state, action) => {
      state.value = state.value.filter((user) => user.id !== action.payload.id);
      localStorage.setItem("customers", JSON.stringify(state.value));
    },
    updateCustomer: (state, action) => {
      state.value = state.value.map((user) => 
        user.id === action.payload.id ? { ...action.payload } : user
        );
      localStorage.setItem("customers", JSON.stringify(state.value));
    },
  },
});

// Action creators are generated for each case reducer function
export const { addCustomer, removeCustomer, updateCustomer } =
  customerSlice.actions;

export default customerSlice.reducer;
