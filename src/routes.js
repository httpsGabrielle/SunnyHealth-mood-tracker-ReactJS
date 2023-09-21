import { Navigate, useRoutes } from 'react-router-dom';
// layouts

// paginas
import LoginPage from './pages/auth/LoginPage';
// ----------------------------------------------------------------------

export default function Router() {
    const routes = useRoutes([
      {
        path: 'login',
        element: <LoginPage />,
      }
    ]);
  
    return routes;
}