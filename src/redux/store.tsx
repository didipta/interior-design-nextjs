import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "./rootreducer";
import { api } from "./api/apiSlice";

export const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
