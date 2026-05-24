import { configureStore } from "@reduxjs/toolkit";

import propertyReducer from "./features/property/propertySlice";
import chatReducer from "./features/chat/chatSlice";

export const store = configureStore({
  reducer: {
    property: propertyReducer,
    chat: chatReducer,
  },
});

export type RootState = ReturnType<
  typeof store.getState
>;

export type AppDispatch =
  typeof store.dispatch;