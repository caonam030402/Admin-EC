import { TfiDashboard } from 'react-icons/tfi'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { IoBagRemoveOutline } from 'react-icons/io5'
import { FiUser } from 'react-icons/fi'
import { VscSignOut } from 'react-icons/vsc'
import path from 'src/constants/path'

export const optionMenu = [
  { name: 'Dashboard', icon: <TfiDashboard />, to: path.home },
  { name: 'Đơn hàng', icon: <AiOutlineShoppingCart />, to: path.order },
  { name: 'Sản phẩm', icon: <IoBagRemoveOutline />, to: path.products },
  { name: 'Khách hàng', icon: <FiUser />, to: path.customers },
  { name: 'Đăng xuất', icon: <VscSignOut />, to: path.signOut }
]
