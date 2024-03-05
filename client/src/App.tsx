/* eslint-disable @typescript-eslint/no-explicit-any */
import Account from './pages/Account'
import AdminPage from './pages/AdminPage'
import LandPage from './pages/LandPage'
import { Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import { useContext } from 'react'
import { userContext } from './components/UserContext.jsx'
import UserSigned from './pages/UserSigned.js'

const App = () => {
  const { user } = useContext<any>(userContext)
  return (
    <Routes>
      <Route path='/' element={<LandPage />} />
      <Route path='/admin' element={<AdminPage />} />
      {!user ? (
        <>
          <Route path='/account' element={<Account />} />
          <Route path='/account/register' element={<Register />} />
        </>
      ) : (
        <Route path='/account' element={<UserSigned />} />
      )}
    </Routes>
  )
}

export default App
