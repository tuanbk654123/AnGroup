import { createListenerMiddleware } from '@reduxjs/toolkit'
import { appActions } from '../slices'

export const loadingMiddleware = createListenerMiddleware()

loadingMiddleware.startListening({
  predicate: (action) => action as any,
  effect: (action, listenerApi) => {
    if (!action?.type || !action.meta) return

    // CHECK LOADING FOR SUBMISSION
    if (action.type.startsWith('submission')) {
      const needLoading = action.meta.arg.requestWithLoading ?? true
      if (!needLoading) return

      if (action.meta.requestStatus === 'pending') {
        listenerApi.dispatch(appActions.setIsLoading(true))
      }
      if (['fulfilled', 'rejected'].includes(action.meta.requestStatus)) {
        listenerApi.dispatch(appActions.setIsLoading(false))
      }
    }
  },
})
