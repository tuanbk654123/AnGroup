import { HelpsHeaderForList } from './components/header/for-list'
import { HelpsLists } from './components/list'

export const HelpsContainer: React.FC<any> = () => {
  return (
    <div className="bg-white">
      <HelpsHeaderForList />
      <HelpsLists />
    </div>
  )
}
