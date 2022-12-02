import HelpEditManagement from './components/edit'
import { HelpHeaderForDetails } from './components/header/for-details'

export const HelpEditContainer = () => {
  return (
    <div className="bg-white">
      <HelpHeaderForDetails />
      <div className="p-4">
        <HelpEditManagement />
      </div>
    </div>
  )
}
