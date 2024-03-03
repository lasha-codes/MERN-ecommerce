import AdminPage from './pages/AdminPage'
import LandPage from './pages/LandPage'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<LandPage />} />
      <Route path='/admin' element={<AdminPage />} />
    </Routes>
  )
}

export default App
