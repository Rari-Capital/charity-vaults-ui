import { configureStore, combineReducers } from '@reduxjs/toolkit'
import testReducer from './reducers/test'

export const rootReducer = combineReducers({
    test: testReducer,
});

const store = configureStore({
    reducer: rootReducer,
});

export default store;
