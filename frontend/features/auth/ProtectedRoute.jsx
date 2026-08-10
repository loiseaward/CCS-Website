import { Navigate, Outlet } from "react-router-dom";
import { useAdmin } from './AdminContext.jsx';

const ProtectedRoute = () => {
  const { isAdmin, isCheckingAdmin } = useAdmin();

  if (isCheckingAdmin) {
    return null;
  }

  return isAdmin ? (
    <Outlet />
  ) : (<Navigate to="/" />);
};

export default ProtectedRoute;
