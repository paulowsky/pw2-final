import { createContext, useCallback, useState } from 'react'

import { useHistory } from 'react-router-dom'

import api from 'src/services/api'

type UserProps = {
  email: string
  password: string
  token?: string
}

type GlobalContextType = {
  user: UserProps
  login(credentials: UserProps): Promise<any>
  logout(): Promise<void>
  isAuthenticated: boolean
}

export const GlobalContext = createContext({} as GlobalContextType)

export function GlobalProvider({ children }: any) {
  const history = useHistory()

  const [user, setUser] = useState<UserProps>(() => {
    const userLocalStorage = localStorage.getItem('@crud:user')

    if (userLocalStorage) {
      const userData = JSON.parse(userLocalStorage)
      api.defaults.headers.authorization = `Bearer ${userData.token}`

      return userData
    }

    return {} as UserProps
  })

  const isAuthenticated = !!user

  const login = useCallback(async ({ email, password }: UserProps) => {
    try {
      const response = await api.post<UserProps>('/login', {
        email,
        password
      })

      const {
        data: { token }
      } = response

      if (token) {
        api.defaults.headers.authorization = `Bearer ${token}`

        const userData = {
          email,
          password,
          token
        }

        localStorage.setItem('@crud:user', JSON.stringify(userData))

        setUser(userData)

        return userData
      }
    } catch (err: any) {
      const {
        response: { data }
      } = err

      if (data) return data
      return {}
    }
  }, [])

  const logout = useCallback(async () => {
    try {
      localStorage.removeItem('@athenaz:user')
      history.replace('/')
      setUser({} as UserProps)
    } catch (err) {
      console.error(err)
    }
  }, [setUser, history])

  return (
    <GlobalContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
