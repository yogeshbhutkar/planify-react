import { useRoutes } from 'raviger'
import Home from '../pages/Home'
import ToDo from '../pages/ToDo'
import Login from '../pages/Login'
import AppContainer from '../AppContainer'

const routes = {
  '/': () => <Home />,
  '/todos': () => <ToDo />,
  '/login': () => <Login />
}

export default function AppRouter() {
    let routeResult = useRoutes(routes);
    return (
      <AppContainer >{routeResult}</AppContainer>
    );
}