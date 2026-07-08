import { Navigate, Outlet } from "react-router-dom";
import { useAdmin } from './AdminContext.jsx';

const ProtectedRoute = () => {
  const { isAdmin } = useAdmin();
  return isAdmin ? (
    <Outlet />
  ) : (<Navigate to="/" />);
};

export default ProtectedRoute;
