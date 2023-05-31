import { useRoutes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home/Home'
import Products from './pages/Products/Products'
import CreateProduct from './pages/CreateProduct/CreateProduct'

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      index: true,
      path: '/',
      element: (
        <MainLayout>
          <Home />
        </MainLayout>
      )
    },
    {
      path: '/products',
      element: (
        <MainLayout>
          <Products />
        </MainLayout>
      )
    },
    {
      path: '/product/manage/:productId',
      element: (
        <MainLayout>
          <CreateProduct />
        </MainLayout>
      )
    },
    {
      path: '/product/manage/add-product',
      element: (
        <MainLayout>
          <CreateProduct />
        </MainLayout>
      )
    }
  ])
  return routeElements
}
