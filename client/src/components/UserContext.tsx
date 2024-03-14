/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import { createContext, useEffect, useState } from 'react'

export const userContext = createContext({})
const UserContext = ({ children }: { children: any }) => {
  const [user, setUser] = useState<object>()
  const [cartLength, setCartLength] = useState<number>(0)
  const [allProducts, setAllProducts] = useState()
  const [cart, setCart] = useState<[]>([])
  const [userAvatar, setUserAvatar] = useState<string>('')

  const getUserProfile = async () => {
    try {
      const response = await axios.get('/user/account')
      const data = await response.data

      if (data.username) {
        setUser({
          usernameContext: data.username,
          emailContext: data.email,
          gender: data.gender,
        })
        setUserAvatar(data.avatar)
        setAllProducts(data.allProducts)
      } else {
        setAllProducts(data.allProducts)
      }
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
        allProducts: allProducts,
        setAllProducts: setAllProducts,
        cart: cart,
        setCart: setCart,
        userImage: userAvatar,
        setUserImage: setUserAvatar,
      }}
    >
      {children}
    </userContext.Provider>
  )
}

export default UserContext
