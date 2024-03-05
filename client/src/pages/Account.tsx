import { useState } from 'react'
import { FaEyeSlash } from 'react-icons/fa'
import { FaEye } from 'react-icons/fa'
import { MdOutlineAlternateEmail } from 'react-icons/md'
import { IoMdLock } from 'react-icons/io'
import { Link } from 'react-router-dom'

const Register = () => {
  const [passVisible, setPassVisible] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  return (
    <main className='h-screen w-full flex items-center justify-center bg-gray-200'>
      <div className='w-[350px] px-5 bg-white rounded-xl py-10'>
        <h1 className='w-full text-2xl mb-4 text-center tracking-wider'>
          Login
        </h1>
        <form className='flex flex-col justify-center items-center relative gap-3'>
          <div className='flex items-center justify-center gap-2'>
            <label htmlFor='email'>
              <MdOutlineAlternateEmail className='text-gray-900 text-xl cursor-pointer' />
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type='email'
              id='email'
              placeholder='email'
              required
              className='outline-none bg-transparent border px-4 py-1 rounded-lg text-gray-500'
            />
          </div>
          <div className='flex items-center justify-center gap-2'>
            <label htmlFor='password'>
              <IoMdLock className='text-gray-900 text-[22px] cursor-pointer' />
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={`${passVisible ? 'password' : 'text'}`}
              id='password'
              placeholder='Enter you password'
              required
              className='outline-none bg-transparent border px-4 py-1 rounded-lg text-gray-500'
            />
          </div>
          <button
            type='button'
            className='absolute bottom-[93px] right-[32px]'
            onClick={() => setPassVisible(!passVisible)}
          >
            {!passVisible ? <FaEye /> : <FaEyeSlash />}
          </button>
          <button
            type='submit'
            className='bg-gray-600 text-gray-200 px-12 py-[6px] rounded-full'
          >
            Login
          </button>
          <p className='flex items-center justify-center gap-1'>
            Don't have an account ?
            <Link to='/account/register' className='font-[600]'>
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </main>
  )
}

export default Register
