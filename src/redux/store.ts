import { configureStore } from "@reduxjs/toolkit";

import propertyReducer from "./features/property/propertySlice";
import chatReducer from "./features/chat/chatSlice";
import authReducer from "./features/auth/authSlice";   
import bookingReducer from "./features/bookings/bookingsSlice"

export const store = configureStore({
  reducer: {
    property: propertyReducer,
    chat: chatReducer,
    auth: authReducer,
    booking: bookingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Allow tokens in state
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;