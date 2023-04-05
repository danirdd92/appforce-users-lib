import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User } from "../utils";

export type UsersState = {
  users: User[];
  filteredUsers: User[];
  selectedUser?: User;
};

const initialState: UsersState = {
  users: [],
  filteredUsers: [],
  selectedUser: undefined,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    populateUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
      state.filteredUsers = action.payload;
    },
    toggleSelectUser: (state, action: PayloadAction<User | undefined>) => {
      state.selectedUser = action.payload;
    },
    upsertUser: (state, action: PayloadAction<User>) => {
      if (state.selectedUser) {
        const indx = state.users.findIndex(
          (u) => u.id === state.selectedUser?.id
        );
        if (indx !== -1) {
          state.users[indx] = action.payload;
        } else {
          state.users.push(action.payload);
        }
      }
    },
    removeUser: (state, action: PayloadAction<{ id: string }>) => {
      const users = state.users.filter((u) => u.id !== action.payload.id);
      state.users = users;
      state.selectedUser = undefined;
    },

    filterUsers: (
      state,
      action: PayloadAction<{ filter: keyof User; query: string }>
    ) => {
      const { filter, query } = action.payload;
      const filteredUsers = state.users.filter((user) =>
        user[filter].includes(query)
      );
      state.filteredUsers = filteredUsers;
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(removeUser, (state, _) => {
  //     state.selectedUser = undefined;
  //   });
  // },
});

export const {
  populateUsers,
  toggleSelectUser,
  upsertUser,
  removeUser,
  filterUsers,
} = usersSlice.actions;

export default usersSlice.reducer;
