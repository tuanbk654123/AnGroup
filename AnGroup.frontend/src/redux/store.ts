import { Action, AnyAction, combineReducers, configureStore, Reducer, ThunkAction } from '@reduxjs/toolkit'
import { loadingMiddleware } from './middlewares'
import {
  authReducer,
  productReducer,
  submissionReducer,
  userReducer,
  roleReducer,
  positionReducer,
  departmentReducer,
  productgroupReducer,
  programReducer,
  menuReducer,
  helpsReducer,
  logworkReducer,
  pageActiveReducer,
  notificationReducer,
  reviewReducer,
  reportReducer,
  folderReducer,
  appReducer,
  categoryReducer,
  creativePostReducer,
  categoryCrawlReducer,
  configCategoryHomeCrawlReducer,
  configPageCategoryCrawReducer,
  configDetailPageCrawReducer

} from './slices'
import { aitherConfigReducer } from './slices/aither-config'
import { loadingContainerReducer } from './slices/loading-container'

const rootReducer = combineReducers({
  auth: authReducer,
  submission: submissionReducer,
  role: roleReducer,
  product: productReducer,
  productgroup: productgroupReducer,
  program: programReducer,
  user: userReducer,
  position: positionReducer,
  department: departmentReducer,
  menu: menuReducer,
  helps: helpsReducer,
  logwork: logworkReducer,
  pageActive: pageActiveReducer,
  loadingContainer: loadingContainerReducer,
  notification: notificationReducer,
  review: reviewReducer,
  report: reportReducer,
  folder: folderReducer,
  aitherConfig: aitherConfigReducer,
  app: appReducer,
  category: categoryReducer,
  creativePost: creativePostReducer,
  categoryCrawl: categoryCrawlReducer,
  configCategoryHomeCrawl:configCategoryHomeCrawlReducer,
  configPageCategoryCrawl:configPageCategoryCrawReducer,
  configDetailPageCrawl:configDetailPageCrawReducer
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(loadingMiddleware.middleware),
})

const appRootReducer: Reducer = (state: RootState, action: AnyAction) => {
  state = {} as RootState
  return rootReducer(state, action)
}

export default appRootReducer

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
