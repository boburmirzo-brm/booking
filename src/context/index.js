import { configureStore } from '@reduxjs/toolkit'
import customers from "./customers"
import admins from "./admins"

export const store = configureStore({
  reducer: {
    customers,
    admins
  },
})