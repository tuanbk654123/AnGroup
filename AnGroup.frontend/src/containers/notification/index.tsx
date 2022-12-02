import { NotificationHeaderForList } from './components/header/for-list'
import { NotificationLists } from './components/list'

export const NotificationContainer: React.FC<any> = () => {
  return (
    <div className="bg-white">
      <NotificationHeaderForList />
      <NotificationLists />
    </div>
  )
}
