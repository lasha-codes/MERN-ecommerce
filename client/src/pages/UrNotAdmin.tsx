import { Link } from 'react-router-dom'
import Header from '../components/Header'

const UrNotAdmin = () => {
  return (
    <main className='w-full h-screen flex justify-center items-center bg-gray-300'>
      <Header />
      <div className='flex flex-col items-center justify-center gap-4'>
        <h1 className='text-xl text-slate-700'>
          U don't have access to this page !
        </h1>
        <Link
          to='/become-admin'
          className='bg-gray-900 text-slate-200 px-5 py-2 rounded-full hover:bg-gray-800 transition-all duration-300'
        >
          Become admin
        </Link>
      </div>
    </main>
  )
}

export default UrNotAdmin
