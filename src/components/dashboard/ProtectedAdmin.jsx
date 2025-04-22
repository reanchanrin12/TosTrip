import { Navigate } from 'react-router';

const ProtectedAdmin = ({ children }) => {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedAdmin;
