import { configureStore } from '@reduxjs/toolkit'
import customers from "./customers"

export const store = configureStore({
  reducer: {
    customers
  },
})