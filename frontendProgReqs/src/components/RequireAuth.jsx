import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth'

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();
  
    const userRoles = [auth?.roles];
  
    let roleFound = false;
    for (const role of allowedRoles) {
      if (userRoles.includes(role)) {
        roleFound = true;
        break;
      }
    }
  
  
    return (
      roleFound
        ? <Outlet />
        : auth?.username
          ? <Navigate to="/unauthorized" state={{ from: location }} replace />
          : <Navigate to="/login" state={{ from: location }} replace />
    );
  };
  
  export default RequireAuth;
  