import { createAsyncThunk } from "@reduxjs/toolkit";
import { userApi } from "@/src/lib/api/userApi";
import type { User } from "@/src/types/userTypes";

export const fetchUsers = createAsyncThunk<
  User[],
  void,
  { rejectValue: string }
>("user/fetchAll", async (_, { rejectWithValue }) => {
  try {
    return await userApi.getAllUsers();
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Failed to load users",
    );
  }
});

export const deleteUserThunk = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>("user/delete", async (id, { rejectWithValue }) => {
  try {
    return await userApi.deleteUser(id);
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Failed to delete user",
    );
  }
});
