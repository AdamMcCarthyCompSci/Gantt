import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import tableReducer from '../features/table/TableSlice';

export default configureStore({
  reducer: {
    table: tableReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: {
      // Ignore these action types
      ignoredActions: ['your/action/type'],
      // Ignore these field paths in all actions
      ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
      // Ignore these paths in the state
      ignoredPaths: ['items.dates'],
    },
  }),
});