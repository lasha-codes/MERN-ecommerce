import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <>
      <main className='w-full h-screen flex items-center p-10 flex-col gap-[200px] bg-gray-100'>
        <Link to='/' className='border-b border-black hover:text-slate-800 '>
          Return to homepage
        </Link>
        <div className='flex flex-col  justify-center gap-4'>
          <h1 className='text-2xl'>Page you are looking for doesn't exist!</h1>
          <p className='text-red-400'>404 error!</p>
          <a
            href='https://www.web.com/blog/what-is-a-404-error/'
            target='_blank'
            className='border-b border-black text-lg w-fit'
          >
            Learn more
          </a>
        </div>
      </main>
    </>
  )
}

export default NotFound
