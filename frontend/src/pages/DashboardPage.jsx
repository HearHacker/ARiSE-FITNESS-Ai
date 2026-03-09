import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { CategoryScale, Chart, LinearScale, BarElement } from 'chart.js';
import api from '../api/client';
import XPBar from '../components/XPBar';
import WorkoutCard from '../components/WorkoutCard';

Chart.register(CategoryScale, LinearScale, BarElement);

const DashboardPage = () => {
  const [user, setUser] = useState();
  const [workout, setWorkout] = useState();
  const [history, setHistory] = useState([]);

  const load = async () => {
    const [{ data: profile }, { data: daily }, { data: weekly }] = await Promise.all([
      api.get('/user/me'),
      api.get('/workouts/today'),
      api.get('/workouts/history')
    ]);
    setUser(profile);
    setWorkout(daily);
    setHistory(weekly.slice(0, 7));
  };

  useEffect(() => { load(); }, []);

  const completeWorkout = async () => {
    if (!workout?._id) return;
    await api.post(`/workouts/${workout._id}/complete`);
    await load();
  };

  const chartData = {
    labels: history.map((h) => new Date(h.date).toLocaleDateString()),
    datasets: [{ label: 'XP earned', data: history.map((h) => h.xpEarned), backgroundColor: '#7e5bef' }]
  };

  return (
    <main className="container">
      <section className="card hero-card">
        <h1>{user?.name}'s Dashboard</h1>
        <p>Level {user?.level} • Streak {user?.streak} days</p>
        <XPBar xp={user?.xp || 0} />
      </section>
      <WorkoutCard workout={workout} onComplete={completeWorkout} />
      <section className="card">
        <h3>Weekly Activity</h3>
        <Bar data={chartData} />
      </section>
    </main>
  );
};

export default DashboardPage;
