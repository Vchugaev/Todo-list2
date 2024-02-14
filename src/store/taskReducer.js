import { createSlice } from '@reduxjs/toolkit';


const initialState = []



const todoSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTodo(state, action) {
            return [...state, action.payload];

        },
    },
});

export const { addTodo, activeToggle, removeTodo } = todoSlice.actions;

export default todoSlice.reducer;