/* eslint-disable @typescript-eslint/no-explicit-any */
import Account from './pages/Account.js'
import AdminPage from './pages/AdminPage.js'
import LandPage from './pages/LandPage.js'
import { Route, Routes } from 'react-router-dom'
import Register from './pages/Register.js'
import { useContext } from 'react'
import { userContext } from './components/UserContext.js'
import UserSigned from './pages/UserSigned.js'
import Cart from './pages/Cart.js'
import BecomeAdmin from './pages/BecomeAdmin.js'
import NotFound from './pages/NotFound.js'
import UrNotAdmin from './pages/UrNotAdmin.js'
import SingleProduct from './pages/SingleProduct.js'
import AllProducts from './pages/AllProducts.js'
import UserOrders from './pages/UserOrders.js'

const App = () => {
  const { user, isAdmin } = useContext<any>(userContext)

  return (
    <main>
      <Routes>
        <Route path='/' element={<LandPage />} />
        <Route
          path='/admin'
          element={isAdmin ? <AdminPage /> : <UrNotAdmin />}
        />
        {!user ? (
          <>
            <Route path='/account' element={<Account />} />
            <Route path='/account/register' element={<Register />} />
          </>
        ) : (
          <>
            <Route path='/account' element={<UserSigned />} />
          </>
        )}
        <Route path='/cart' element={<Cart />} />
        <Route
          path='/become-admin'
          element={!isAdmin && user ? <BecomeAdmin /> : <NotFound />}
        />

        <Route path='/user/orders' element={<UserOrders />} />
        <Route path='/product/:id' element={<SingleProduct />} />
        <Route path='all-products' element={<AllProducts />} />

        <Route path='*' element={<NotFound />} />
      </Routes>
    </main>
  )
}

export default App
