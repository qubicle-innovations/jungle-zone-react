import { configureStore } from "@reduxjs/toolkit"
import createSagaMiddleware from "redux-saga"
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

import rootReducer from "./reducers"
import rootSaga from "./sagas"

const persistConfig = {
    key: 'root',
    storage,
  }

const sagaMiddleware = createSagaMiddleware()
const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({ reducer: persistedReducer,middleware:[sagaMiddleware] })
sagaMiddleware.run(rootSaga)

// export default store
export const persistor = persistStore(store)
