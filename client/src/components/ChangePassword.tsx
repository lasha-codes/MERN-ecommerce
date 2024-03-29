/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { IoIosClose } from 'react-icons/io'

interface changePasswordTypes {
  setPasswordToggle: React.SetStateAction<any>
  className: string
}

const ChangePassword: React.FC<changePasswordTypes> = ({
  setPasswordToggle,
  className,
}) => {
  const [curPassword, setCurPassword] = useState<string>('')
  const [newPassword, setNewPassword] = useState<string>('')

  const updatePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await axios.put('/user/update-password', {
        currentPassword: curPassword,
        newPassword,
      })
      toast.success('U have changed ur password.')
    } catch (err) {
      toast.error('Incorrect password')
    }
  }

  return (
    <div
      className={` ${className} transition absolute duration-300 flex p-10 items-center justify-center rounded-lg bg-gray-200`}
    >
      <IoIosClose
        onClick={() => setPasswordToggle(false)}
        className='absolute top-3 right-3 text-2xl text-red-400 cursor-pointer hover:opacity-70 transition'
      />
      <form className='flex flex-col gap-4' onSubmit={updatePassword}>
        <div className='flex flex-col justify-center gap-1'>
          <label
            htmlFor='current-password'
            className='w-fit cursor-pointer text-slate-500'
          >
            Current password
          </label>
          <input
            value={curPassword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCurPassword(e.target.value)
            }
            required
            type='text'
            id='current-password'
            className='bg-transparent outline-gray-100 rounded-md border px-4 py-1 text-gray-500 border-gray-100'
          />
        </div>
        <div className='flex flex-col justify-center gap-1'>
          <label
            htmlFor='new-password'
            className='w-fit cursor-pointer text-slate-500'
          >
            New password
          </label>
          <input
            value={newPassword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewPassword(e.target.value)
            }
            required
            type='text'
            id='new-password'
            className='bg-transparent outline-gray-100 rounded-md border px-4 py-1 text-gray-500 border-gray-100'
          />
        </div>
        <button className='bg-purple-500 text-gray-100 py-2 rounded-md hover:opacity-70 transition duration-300'>
          Change password
        </button>
      </form>
    </div>
  )
}

export default ChangePassword
