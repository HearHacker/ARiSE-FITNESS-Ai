import { useState } from 'react';
import api from '../api/client';

const AdminPage = () => {
  const [payload, setPayload] = useState('{"title":"Power Circuit","level":"beginner","goal":"fat_loss","exercises":[]}');

  const createWorkout = async () => {
    await api.post('/admin/workouts', JSON.parse(payload));
    alert('Workout created');
  };

  return (
    <main className="container">
      <section className="card">
        <h1>Admin Control Room</h1>
        <textarea rows="8" value={payload} onChange={(e) => setPayload(e.target.value)} />
        <button onClick={createWorkout}>Add Workout</button>
      </section>
    </main>
  );
};

export default AdminPage;
