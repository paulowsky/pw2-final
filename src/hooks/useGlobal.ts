import { useContext } from 'react'

import { GlobalContext } from 'src/contexts/GlobalContext'

const useAuth = () => {
  const auth = useContext(GlobalContext)
  return auth
}

export default useAuth
