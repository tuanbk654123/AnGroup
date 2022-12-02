import { useEffect, useCallback } from 'react'
import { useCurrentPath } from '~/hooks'
import { useAppDispatch, useAppSelector } from '~/redux/hooks'
import { selectMenuLoading, selectMenuTrees } from '~/redux/slices'
import { getMenu } from '~/redux/slices/menu/middleware'
import { RouterHelper } from '~/utils'
import MenuConfigHeader from './components/header'
import MenuConfigList from './components/list'
import { MeuConfigModal } from './components/modals'

export const MenuConfigContainer: React.FC<any> = () => {
  const currentPath = useCurrentPath()
  const showModal = currentPath !== RouterHelper.configuration_menu
  const dataMenu = useAppSelector(selectMenuTrees)
  const loading = useAppSelector(selectMenuLoading)
  // const [isLoading, setIsLoading] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const fetchMenuTrees = useCallback(() => {
    dispatch(
      getMenu({
        // onSuccess: () => {
        //   setIsLoading(true)
        // },
      }),
    )
  }, [dispatch])

  useEffect(() => {
    fetchMenuTrees()
  }, [fetchMenuTrees])
  return (
    <div className="bg-white">
      <MenuConfigHeader />
      <MenuConfigList loading={loading} data={dataMenu} />
      {showModal && <MeuConfigModal />}
    </div>
  )
}
