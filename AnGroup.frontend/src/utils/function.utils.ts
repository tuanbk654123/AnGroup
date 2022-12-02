interface RetryFunctionResult {
  status: 'resolve' | 'reject'
  data: any
  isDone?: boolean
}

function resolveDataWithTimeout<T>(data: any, timeout: number) {
  return new Promise<T>((res) => {
    setTimeout(async () => {
      const result = (await data) as T
      res(result)
    }, timeout)
  })
}

export function withRetryFunction<T>({
  callback,
  numberOfRetries,
  retryTimeout,
  needRetry,
}: {
  callback: (...args: any[]) => Promise<T>
  numberOfRetries: number
  retryTimeout: number
  needRetry?: (res: T) => boolean
}) {
  let remainRetries = numberOfRetries

  const executeCb = async (cbArgs): Promise<RetryFunctionResult> => {
    const handleRetry = async () => {
      remainRetries--
      if (remainRetries === 0) {
        return Promise.resolve<RetryFunctionResult>({ status: 'resolve', data: null, isDone: true })
      }
      return await resolveDataWithTimeout<RetryFunctionResult>(executeCb.apply(this, [cbArgs]), retryTimeout)
    }

    try {
      const data = await callback.apply(this, cbArgs)
      if (data.isDone) {
        return { status: 'resolve', data }
      }
      if (needRetry?.(data)) {
        return await handleRetry()
      } else {
        return { status: 'resolve', data }
      }
    } catch (e) {
      return { status: 'resolve', data: null }
    }
  }

  return function (...args) {
    return new Promise<T>(async (res, rej) => {
      const { data, status } = await executeCb(args)
      if (status === 'resolve') {
        res(data)
      } else {
        rej(data)
      }
    })
  }
}
