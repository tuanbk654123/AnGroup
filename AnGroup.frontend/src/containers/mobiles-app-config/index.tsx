import MobilesAppConfigList from './components/list'
import MobileAppConfigHeader from './components/header'

export const ConfigurationMobilesAppConfigContainer: React.FC<any> = () => {
  return (
    <div className="bg-white">
      <MobileAppConfigHeader />
      <MobilesAppConfigList />
    </div>
  )
}
