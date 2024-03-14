/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const BecomeAdmin = () => {
  const [secret, setSecret] = useState<string>('')
  const navigate = useNavigate()

  const becomeAdmin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await axios.post('/user/become-admin', {
        admin_key: secret,
      })
      navigate('/')
      navigate(0)
      toast.success('you are now admin')
    } catch (error) {
      toast.error('Invalid key')
    }
  }

  return (
    <main className='w-screen h-screen bg-gray-400 flex justify-center items-center'>
      <form className='text-center w-full' onSubmit={becomeAdmin}>
        <h2 className='mb-[10px] text-xl text-white'>Become admin</h2>
        <div className='flex flex-col items-center justify-center gap-2'>
          <input
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            type='text'
            placeholder='secret key'
            className='w-[50%] px-4 py-1 rounded-xl outline-none'
          />
          <button className='bg-gray-200 px-5 py-1 rounded-full hover:bg-gray-300 transition-all duration-300'>
            Submit key
          </button>
        </div>
      </form>
    </main>
  )
}

export default BecomeAdmin
