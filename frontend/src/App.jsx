import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import AdminPage from './pages/AdminPage';
import { useAuth } from './context/AuthContext';

const OAuthSuccess = () => {
  const { login } = useAuth();
  const location = useLocation();
  const token = new URLSearchParams(location.search).get('token');
  if (token) login(token);
  return <Navigate to="/dashboard" />;
};

const Protected = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => (
  <>
    <NavBar />
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/oauth-success" element={<OAuthSuccess />} />
      <Route path="/dashboard" element={<Protected><DashboardPage /></Protected>} />
      <Route path="/admin" element={<Protected><AdminPage /></Protected>} />
    </Routes>
  </>
);

export default App;
