import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
// Si tienes slices/reducers personalizados, impórtalos aquí.
// import authReducer from './features/auth/authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    // otros reducers...
  }
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;