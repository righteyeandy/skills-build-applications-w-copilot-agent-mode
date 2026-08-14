import CollectionPage from './CollectionPage';

const workoutsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/';

const columns = [
  { key: 'title', label: 'Workout' },
  { key: 'category', label: 'Category' },
  { key: 'difficulty', label: 'Difficulty' },
  { key: 'durationMinutes', label: 'Duration (min)' },
  { key: 'assignedTo', label: 'Assigned To' }
];

function Workouts() {
  return (
    <CollectionPage
      endpoint="workouts"
      endpointUrl={workoutsEndpoint}
      title="Workouts"
      subtitle="Suggested and assigned training plans"
      columns={columns}
    />
  );
}

export default Workouts;
