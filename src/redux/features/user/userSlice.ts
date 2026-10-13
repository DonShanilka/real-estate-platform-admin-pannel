import { createSlice } from "@reduxjs/toolkit";
import type { User } from "@/src/types/userTypes";
import { fetchUsers, deleteUserThunk } from "./userThunk";

interface UserState {
  users: User[];
  loading: boolean;
  deleting: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  deleting: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    clearUserError(state) {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || action.error.message || "Failed to load users";
      })
      .addCase(deleteUserThunk.pending, (state) => {
        state.deleting = true;
        state.error = null;
      })
      .addCase(deleteUserThunk.fulfilled, (state, action) => {
        state.deleting = false;

        state.users = state.users.filter((user) => user.id !== action.payload);
      })
      .addCase(deleteUserThunk.rejected, (state, action) => {
        state.deleting = false;

        state.error =
          action.payload || action.error.message || "Failed to delete user";
      });
  },
});

export const { clearUserError } = userSlice.actions;
export default userSlice.reducer;
