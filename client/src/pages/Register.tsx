import { useState } from 'react'
import { FaEyeSlash } from 'react-icons/fa'
import { FaEye } from 'react-icons/fa'
import { MdOutlineAlternateEmail } from 'react-icons/md'
import { FaMale } from 'react-icons/fa'
import { FaFemale } from 'react-icons/fa'
import { IoMdLock } from 'react-icons/io'
import { FaUser } from 'react-icons/fa'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

const Register = () => {
  const [passVisible, setPassVisible] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [gender, setGender] = useState<string>('male')
  const [redirect, setRedirect] = useState<boolean>(false)

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await axios.post('/user/register', {
        email: email,
        username: username,
        password: password,
        gender: gender,
      })
      const data = await response.data
      toast.success(data.message)
      setRedirect(true)
    } catch (error) {
      toast.error('This account already exists')
    } finally {
      setUsername('')
      setEmail('')
      setPassword('')
    }
  }

  if (redirect) {
    return <Navigate to='/' />
  }

  return (
    <main className='h-screen w-full flex items-center justify-center bg-gray-200'>
      <div className='w-[350px] px-5 bg-white rounded-xl py-10'>
        <h1 className='w-full text-2xl mb-4 text-center tracking-wider'>
          Create an account
        </h1>
        <form
          className='flex flex-col justify-center items-center relative gap-3'
          onSubmit={handleSignUp}
        >
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
            <label htmlFor='user'>
              <FaUser className='text-gray-900 text-lg cursor-pointer' />
            </label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type='text'
              id='user'
              placeholder='username'
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
              type={`${!passVisible ? 'password' : 'text'}`}
              id='password'
              placeholder='Enter you password'
              required
              className='outline-none bg-transparent border px-4 py-1 rounded-lg text-gray-500'
            />
          </div>

          <div className='flex items-center justify-center gap-2'>
            <label htmlFor='gender' className='text-[20px]'>
              {gender === 'male' ? (
                <FaMale className='text-blue-600' />
              ) : (
                <FaFemale className='text-pink-800' />
              )}
            </label>
            <select
              id='gender'
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className='outline-none'
            >
              <option value='male'>Male</option>
              <option value='woman'>Woman</option>
            </select>
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
            Sign Up
          </button>
          <p className='flex items-center justify-center gap-1'>
            Already an account ?
            <Link to='/account' className='font-[600]'>
              Login
            </Link>
          </p>
        </form>
      </div>
    </main>
  )
}

export default Register
