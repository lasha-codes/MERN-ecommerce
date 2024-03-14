/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from 'react'
import { userContext } from './UserContext'
import defaultAvatarMale from '../assets/defaultAvatarMale.jpg'
import defaultAvatarWomen from '../assets/defaultAvatarWomen.jpg'

const UserImage = () => {
  const { user, userImage } = useContext<any>(userContext)
  if (userImage) {
    return (
      <img
        src={userImage}
        className='w-full h-full object-cover cursor-pointer'
      />
    )
  } else {
    return (
      <img
        src={user.gender === 'male' ? defaultAvatarMale : defaultAvatarWomen}
        className='w-full h-full object-contain cursor-pointer'
      />
    )
  }
}

export default UserImage
