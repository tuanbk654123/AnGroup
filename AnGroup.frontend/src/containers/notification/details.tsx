import NotificationEditManagement from './components/edit'
import { NotificationHeaderForDetails } from './components/header/for-details'

export const NotificationEditContainer = () => {
  return (
    <div className="bg-white">
      <NotificationHeaderForDetails />
      <div className="p-4">
        <NotificationEditManagement />
      </div>
    </div>
  )
}
