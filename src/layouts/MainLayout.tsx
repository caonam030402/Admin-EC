import SideMemu from 'src/components/SideMemu'

interface Props {
  children?: React.ReactNode
}

export default function MainLayout({ children }: Props) {
  return (
    <div className='grid grid-cols-12'>
      <div className='col-span-2 h-[100vh]'>
        <SideMemu />
      </div>
      <div className='col-span-10'>{children}</div>
    </div>
  )
}
