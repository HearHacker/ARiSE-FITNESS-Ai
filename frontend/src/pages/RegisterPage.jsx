import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', fitnessGoal: 'fat_loss', fitnessLevel: 'beginner' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const { data } = await api.post('/auth/register', form);
    login(data.token);
    navigate('/dashboard');
  };

  return (
    <main className="container">
      <section className="card">
        <h1>Create Hero Profile</h1>
        <form onSubmit={submit} className="form-grid">
          <input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input placeholder="Password" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
          <select onChange={(e) => setForm({ ...form, fitnessGoal: e.target.value })}>
            <option value="fat_loss">Fat Loss</option><option value="muscle_gain">Muscle Gain</option><option value="endurance">Endurance</option>
          </select>
          <select onChange={(e) => setForm({ ...form, fitnessLevel: e.target.value })}>
            <option>beginner</option><option>intermediate</option><option>advanced</option>
          </select>
          <button type="submit">Begin Quest</button>
        </form>
      </section>
    </main>
  );
};

export default RegisterPage;
