import { useRoutes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'

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
    }
  ])
  return routeElements
}
