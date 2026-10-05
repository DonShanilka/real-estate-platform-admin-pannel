import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  userId: number | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  userId: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

function getUserIdFromToken(token: string): number | null {
  try {
    const payload = token.split(".")[1];
    if (!payload) return null;

    const normalizedPayload = payload.replace(/-/g, "+").replace(/_/g, "/");
    const decoded = JSON.parse(atob(normalizedPayload)) as Record<string, unknown>;
    const claim = decoded.user_id ?? decoded.userId ?? decoded.id ?? decoded.sub;
    const userId = typeof claim === "number" ? claim : Number(claim);

    return Number.isInteger(userId) && userId > 0 ? userId : null;
  } catch {
    return null;
  }
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    loginSuccess: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.userId = getUserIdFromToken(action.payload);
      state.isAuthenticated = true;
      state.error = null;
      state.loading = false;
    },
    authFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    logout: (state) => {
      state.token = null;
      state.userId = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
});

export const { setLoading, loginSuccess, authFailure, logout } = authSlice.actions;
export default authSlice.reducer;