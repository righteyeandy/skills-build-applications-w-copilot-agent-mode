import CollectionPage from './CollectionPage';

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
      title="Workouts"
      subtitle="Suggested and assigned training plans"
      columns={columns}
    />
  );
}

export default Workouts;
