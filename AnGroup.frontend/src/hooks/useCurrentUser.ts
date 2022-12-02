import { useAppSelector } from '~/redux/hooks'

export const useCurrentUser = () => {
  const currentUser = useAppSelector((state) => state.auth.currentUser)
  return currentUser
}
