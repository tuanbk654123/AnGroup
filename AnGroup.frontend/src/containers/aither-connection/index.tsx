import AitherConfigHeader from './components/header'
import AitherConfigList from './components/list'

export const AitherConnectionConfigContainer: React.FC<any> = () => {
  return (
    <div className="bg-white">
      <AitherConfigHeader />
      <AitherConfigList />
    </div>
  )
}
