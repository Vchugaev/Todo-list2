import { createSlice } from '@reduxjs/toolkit';



const searchSlice = createSlice({
    name: 'search',
    initialState: '',
    reducers: {
        addSearch(state, action) {
            console.log(state);
            return action.payload;

        },
    },
});

export const { addSearch, activeToggle, removeTodo } = searchSlice.actions;

export default searchSlice.reducer;