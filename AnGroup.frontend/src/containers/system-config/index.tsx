import FastConfigHeader from './components/header'
import FastConfigList from './components/list'

export const DMSConnectionConfigContainer: React.FC<any> = () => {
  return (
    <div className="bg-white">
      <FastConfigHeader />
      <FastConfigList />
    </div>
  )
}
