import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import createSagaMiddleware from '@redux-saga/core';
import rootSaga from '../sagas/rootSaga';
import authReducer from '../features/auth/authSlice';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { history } from '../utils/history';
import userReducer from '../features/user/userSlice';
import roleReducer from '../features/role/roleSlice';
import userHistoryReducer  from '../features/history/historySlice';
import importPriceReducer  from '../features/importPrice/importPriceSlice';
import importReportReducer  from '../features/importReport/importReportSlice';
import importProcessReducer  from '../features/importProcess/importProcessSlice';
import customerReducer  from '../features/customer/customerSlice';
import exportPriceReducer  from '../features/exportPrice/exportPriceSlice';
import ExportProcessReducer from '../features/exportProcess/exportProcessSlice';
import exportReportReducer from '../features/exportReport/exportReportSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    role: roleReducer,
    history: userHistoryReducer,
    importPrice: importPriceReducer,
    exportPrice: exportPriceReducer,
    exportProcess: ExportProcessReducer,
    exportReport: exportReportReducer,
    importReport: importReportReducer,
    importProcess: importProcessReducer,
    customer: customerReducer,
    router: connectRouter(history),
})

const sagaMiddleWare = createSagaMiddleware()
export const store = configureStore({
  reducer : rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleWare, routerMiddleware(history  )),
});

sagaMiddleWare.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
