import {configureStore} from '@reduxjs/toolkit'
import { rootReducer } from "./root-reducer";
import { persistStore,persistReducer,
    REHYDRATE,
    PERSIST } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfirg = {
    key:'root',
    storage,
    blacklist:[]
}

const persistedReducer = persistReducer(persistConfirg,rootReducer)

export const store = configureStore({
    reducer:persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [ REHYDRATE, PERSIST],
        },
      }),
})

export const persistor = persistStore(store);