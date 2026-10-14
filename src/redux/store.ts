import { configureStore } from "@reduxjs/toolkit";

import propertyReducer from "./features/property/propertySlice";
import chatReducer from "./features/chat/chatSlice";
import authReducer from "./features/auth/authSlice";
import bookingReducer from "./features/bookings/bookingsSlice";
import reviewsReducer from "./features/reviews/reviewsSlice";
import userReducer from "./features/user/userSlice";
import dashboardReducer from "./features/dashboard/dashboardSlice";

export const store = configureStore({
  reducer: {
    property: propertyReducer,
    chat: chatReducer,
    auth: authReducer,
    bookings: bookingReducer,
    reviews: reviewsReducer,
    user: userReducer,
    dashboard: dashboardReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
