import HelpAddManagement from './components/add'
import { HelpHeaderForAdd } from './components/header/for-add'

export const HelpAddContainer = () => {
  return (
    <div className="bg-white">
      <HelpHeaderForAdd />
      <div className="p-4">
        <HelpAddManagement />
      </div>
    </div>
  )
}
