import { BiSearch } from 'react-icons/bi'
import { AiOutlineMessage } from 'react-icons/ai'
import { IoNotificationsOutline } from 'react-icons/io5'

export default function Header() {
  return (
    <div className=' flex w-full items-center justify-between px-10 py-8 text-gray-900'>
      <h1 className='text-3xl font-bold'>Dashboard</h1>
      <div className='flex items-center'>
        <div className='flex h-10 w-[600px] items-center rounded-md bg-white px-4 shadow-sm'>
          <input className='w-full outline-none' placeholder='Tìm kiếm ngay' />
          <div className='text-xl text-primaryColor'>
            <BiSearch />
          </div>
        </div>
        <div className='mx-8 flex items-center gap-3'>
          <div className='flex h-10 w-10 items-center justify-center rounded-md bg-white text-xl text-primaryColor shadow-sm'>
            <AiOutlineMessage />
          </div>
          <div className='flex h-10 w-10 items-center justify-center rounded-md bg-white text-xl text-primaryColor shadow-sm'>
            <IoNotificationsOutline />
          </div>
        </div>
        <div className='mr-8 h-[40px] w-[1px] bg-gray-300'></div>
        <div className='flex items-center gap-3'>
          <img
            className='w-10 rounded-full'
            src='https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-6/241374247_1010640519506092_5157613463210442022_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=174925&_nc_ohc=puE1YQefB1oAX_PpeFW&_nc_ht=scontent.fhan2-5.fna&oh=00_AfCOk8BmHMYpVML3OxBz6pHBXU-T-H32y0saSVv1uir2Nw&oe=646CD954'
            alt=''
          />
          <div className='text-base font-bold text-gray-900'>CaoNam</div>
        </div>
      </div>
    </div>
  )
}
