import { Spin } from 'antd'
import { useAppSelector } from '~/redux/hooks'

export const AppLoading = () => {
  const isLoading = useAppSelector((state) => state.app.isLoading)

  return (
    isLoading && (
      <div className="app-loading">
        <div className="flex items-center">
          <Spin tip="Loading..."></Spin>
        </div>
      </div>
    )
  )
}
