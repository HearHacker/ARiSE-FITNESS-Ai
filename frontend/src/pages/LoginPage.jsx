import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const { data } = await api.post('/auth/login', { email, password });
    login(data.token);
    navigate('/dashboard');
  };

  return (
    <main className="container">
      <section className="card">
        <h1>Login</h1>
        <form onSubmit={onSubmit} className="form-grid">
          <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">Login</button>
        </form>
        <a href={`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/auth/google`} className="google-btn">Continue with Google</a>
        <p>Need an account? <Link to="/register">Register</Link></p>
      </section>
    </main>
  );
};

export default LoginPage;
