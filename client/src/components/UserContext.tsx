/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import { createContext, useEffect, useState } from 'react'

export const userContext = createContext({})
const UserContext = ({ children }: { children: any }) => {
  const [user, setUser] = useState<object>()
  const [cartLength, setCartLength] = useState<number>(0)

  const getUserProfile = async () => {
    try {
      const response = await axios.get('/user/account')
      const data = await response.data
      setUser({
        usernameContext: data.username,
        emailContext: data.email,
        gender: data.gender,
        avatarContext: data.avatar,
        cartContext: data.cart,
      })
      setCartLength(data.cartLength)
    } catch (error) {
      console.error('unauthorized', error)
    }
  }

  useEffect(() => {
    getUserProfile()
  }, [])

  return (
    <userContext.Provider
      value={{
        user: user,
        setUser: setUser,
        cartLength: cartLength,
        setCartLength: setCartLength,
      }}
    >
      {children}
    </userContext.Provider>
  )
}

export default UserContext
