import NotificationAddManagement from './components/add'
import { NotificationHeaderForAdd } from './components/header/for-add'

export const NotificationAddContainer = () => {
  return (
    <div className="bg-white">
      <NotificationHeaderForAdd />
      <div className="p-4">
        <NotificationAddManagement />
      </div>
    </div>
  )
}
