import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import * as reducers from '../reducers';

const middleware = [thunk];

if (process.env.NODE_ENV === 'development') {
    const { createLogger } = require('redux-logger');
    middleware.push(createLogger({
        collapsed: true,
    }));
}

export const store = configureStore({
    reducer: { ...reducers },
    middleware,
    devTools: process.env.NODE_ENV !== 'production',
});
