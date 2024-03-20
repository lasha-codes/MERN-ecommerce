/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import { createContext, useEffect, useState } from 'react'

export const userContext = createContext({})
const UserContext = ({ children }: { children: any }) => {
  const [user, setUser] = useState<object>()
  const [allProducts, setAllProducts] = useState<any>()
  const [mainProducts, setMainProducts] = useState<any>()
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const [cart, setCart] = useState<[]>([])
  const [activeRoute, setActiveRoute] = useState('/profile')
  const [userAvatar, setUserAvatar] = useState<string>('')

  const getUserProfile = async () => {
    try {
      const { data } = await axios.get('/user/account')
      if (data.username) {
        setUser({
          usernameContext: data.username,
          emailContext: data.email,
          gender: data.gender,
        })
        setIsAdmin(data.isAdmin)
        setUserAvatar(data.avatar)
        setAllProducts(data.allProducts)
        setMainProducts(data.allProducts)
      } else {
        setAllProducts(data.allProducts)
        setMainProducts(data.allProducts)
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
        allProducts: allProducts,
        setAllProducts: setAllProducts,
        cart: cart,
        setCart: setCart,
        userImage: userAvatar,
        setUserImage: setUserAvatar,
        mainProducts: mainProducts,
        setMainProducts: setMainProducts,
        isAdmin: isAdmin,
        setIsAdmin: setIsAdmin,
        activeRoute: activeRoute,
        setActiveRoute: setActiveRoute,
      }}
    >
      {children}
    </userContext.Provider>
  )
}

export default UserContext
