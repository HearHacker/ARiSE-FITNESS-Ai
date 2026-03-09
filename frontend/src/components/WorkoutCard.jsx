const WorkoutCard = ({ workout, onComplete }) => (
  <section className="card">
    <h3>{workout?.title || 'Daily Quest'}</h3>
    <ul>
      {workout?.exercises?.map((exercise) => (
        <li key={exercise.name}>{exercise.name} — {exercise.sets}x{exercise.reps}</li>
      ))}
    </ul>
    <button onClick={onComplete}>Complete Workout (+100 XP)</button>
  </section>
);

export default WorkoutCard;
