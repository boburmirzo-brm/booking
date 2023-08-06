import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: JSON.parse(localStorage.getItem("admins")) || [],
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    addAdmin: (state, action) => {
      state.value = [action.payload, ...state.value];
      localStorage.setItem("admins", JSON.stringify(state.value));
    },
    removeAdmin: (state, action) => {
      state.value = state.value.filter((user) => user.id !== action.payload.id);
      localStorage.setItem("admins", JSON.stringify(state.value));
    },
    updateAdmin: (state, action) => {
      state.value = state.value.map((user) => 
        user.id === action.payload.id ? { ...action.payload } : user
        );
      localStorage.setItem("admins", JSON.stringify(state.value));
    },
  },
});

export const { addAdmin, removeAdmin, updateAdmin } = adminSlice.actions;

export default adminSlice.reducer;
