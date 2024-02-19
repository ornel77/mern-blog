import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    currentUser: null,
    error: null,
    loading: false, 
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true
            state.error = null
        },
        // action is the info we want to get
        signInSuccess: (state, action) => {
            state.currentUser = action.payload
            state.loading = false
            state.error = null
        },
        signInFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        updateStart: (state) => {
            state.loading = true
            state.error = null
        },
        // action is the info we want to get
        updateSuccess: (state, action) => {
            state.currentUser = action.payload
            state.loading = false
            state.error = null
        },
        updateFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
    }
})

export const {signInFailure, signInStart, signInSuccess, updateStart, updateFailure, updateSuccess} = userSlice.actions

export default userSlice.reducer