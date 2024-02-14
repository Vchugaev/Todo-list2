import { configureStore } from '@reduxjs/toolkit';
import tasks from './taskReducer';
import search from './searchReducer';

export default configureStore({
  reducer: {
    tasksReducer: tasks,
    searchReducer: search,
  },
});
