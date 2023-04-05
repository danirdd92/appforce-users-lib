import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./usersSlice";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import modalSlice from "./modalSlice";

export const store = configureStore({
  reducer: {
    usersSlice,
    modalSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
