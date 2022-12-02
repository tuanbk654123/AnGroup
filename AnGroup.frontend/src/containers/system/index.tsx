import SystemConfigHeader from './components/header'
import SystemConfigList from './components/list'

export const SystemConfigContainer: React.FC<any> = () => {
  return (
    <div className="bg-white">
      <SystemConfigHeader />
      <SystemConfigList />
    </div>
  )
}
