import { Navigate } from 'react-router';

const ProtectedAdmin = ({ children }) => {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    return <Navigate to="/auth/login" />;
  }

  return children;
};

export default ProtectedAdmin;
