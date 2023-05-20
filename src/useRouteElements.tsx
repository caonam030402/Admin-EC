import { useRoutes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home/Home'
import Products from './pages/Products/Products'

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
    }
  ])
  return routeElements
}
