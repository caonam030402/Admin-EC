import Footer from 'src/components/Footer/Footer'
import Header from 'src/components/Header/Header'
import SideMemu from 'src/components/SideMenu/SideMenu'

interface Props {
  children?: React.ReactNode
}

export default function MainLayout({ children }: Props) {
  return (
    <div className='grid grid-cols-12 text-gray-600'>
      <div className='relative col-span-2 h-[100vh]'>
        <SideMemu />
      </div>
      <div className='col-span-10'>
        <Header />
        <div>{children}</div>
        <Footer />
      </div>
    </div>
  )
}
