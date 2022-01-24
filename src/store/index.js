import { configureStore } from "@reduxjs/toolkit";
import operationSliceReducer from "./operationSlice";
let store = configureStore({
  reducer: operationSliceReducer,
});
export default store;
