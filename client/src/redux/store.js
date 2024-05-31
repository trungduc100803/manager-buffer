import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import persistStore from 'redux-persist/es/persistStore'

import userReducer from './authSlice'
import chairReducer from './chairSlice'
import notifyProductReducer from './notifyProductSlice'

const rootReducer = combineReducers({
    user: userReducer,
    chair: chairReducer,
    notifyP: notifyProductReducer,
})

const persistConfig = {
    key: 'root',
    storage,
    version: 1
}

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDafaultMiddleware) => {
        return getDafaultMiddleware({ serializableCheck: false })
    }
})


export const persistor = persistStore(store)
