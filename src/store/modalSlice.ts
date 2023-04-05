import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type ModalType = "confirmation" | "edit";
export type ModalState = {
  isOpen: boolean;
  modalType?: ModalType;
};

const initialState: ModalState = {
  isOpen: false,
  modalType: undefined,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<ModalType>) => {
      state.isOpen = true;
      state.modalType = action.payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.modalType = undefined;
    },
  },
});
export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
