/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { adminListItems, listItems } from '../data'
import { IoIosSearch } from 'react-icons/io'
import { CiMenuFries } from 'react-icons/ci'
import { IoMdClose } from 'react-icons/io'
import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'

const Header = () => {
  const [toggle, setToggle] = useState<boolean>(true)
  const [isAdmin, setIsAdmin] = useState<boolean>(true)
  const [cartCount, setCartCount] = useState<number>(0)
  const location: any = useLocation().pathname
  // animation variants
  const navVariants: any = {
    hidden: {
      y: 50,
      opacity: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
        when: 'afterChildren',
        duration: 0.5,
      },
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        staggerDirection: -1,
        duration: 0.5,
      },
    },
  }

  const listVariants: any = {
    visible: {
      x: 0,
      opacity: 1,
    },
    hidden: {
      x: 40,
      opacity: 0,
    },
  }

  return (
    <header
      className={`flex items-center px-10 justify-between py-6 top-0 w-full fixed  left-0 transition-all duration-300 bg-main`}
    >
      <div
        className='hidden max-lg:block cursor-pointer text-lg text-gray-200'
        onClick={() => setToggle(!toggle)}
      >
        {toggle ? <CiMenuFries /> : <IoMdClose />}
      </div>
      <Link to='/'>
        <h1 className='text-[21px] text-gray-200'>Ecommerce</h1>
      </Link>
      <motion.nav
        className={`flex justify-center items-center gap-4 max-lg:flex-col max-lg:absolute max-lg:bg-main text-gray-200 max-lg:py-6 max-lg:px-12 max-lg:rounded-xl max-lg:top-20 lg:!opacity-100 !z-[999] lg:!translate-y-0 ${
          !toggle ? 'pointer-events-auto' : 'pointer-events-none'
        } lg:!pointer-events-auto`}
        variants={navVariants}
        animate={toggle ? 'hidden' : 'visible'}
      >
        {isAdmin ? (
          <>
            {adminListItems.map((item) => (
              <motion.span
                variants={listVariants}
                key={item.link}
                className='lg:!opacity-100 lg:!translate-x-0'
              >
                <Link to={item.to} className='text-lg'>
                  {item.link === 'Cart'
                    ? `Cart(${Number(cartCount)})`
                    : item.link}
                </Link>
              </motion.span>
            ))}
          </>
        ) : (
          <>
            {listItems.map((item) => (
              <motion.span
                variants={listVariants}
                key={item.link}
                className='lg:!opacity-100 lg:!translate-x-0'
              >
                <a href={item.to} className='text-lg'>
                  {item.link === 'Cart'
                    ? `Cart(${Number(cartCount)})`
                    : item.link}
                </a>
              </motion.span>
            ))}
          </>
        )}
      </motion.nav>
      {location === '/' ? (
        <IoIosSearch className='text-lg cursor-pointer text-gray-200' />
      ) : (
        <span></span>
      )}
    </header>
  )
}

export default Header
