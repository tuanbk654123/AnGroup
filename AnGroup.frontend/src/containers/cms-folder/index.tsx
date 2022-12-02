import { CmsFolderHeaderForList } from './components/header/for-list'
import { CmsFolderList } from './components/list'

export const CmsFolderContainer = () => {
  return (
    <div>
      <CmsFolderHeaderForList />
      <CmsFolderList />
    </div>
  )
}
