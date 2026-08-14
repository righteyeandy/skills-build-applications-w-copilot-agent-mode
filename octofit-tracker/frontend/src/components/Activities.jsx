import CollectionPage from './CollectionPage';

const columns = [
  { key: 'type', label: 'Type' },
  { key: 'user', label: 'User' },
  { key: 'team', label: 'Team' },
  { key: 'durationMinutes', label: 'Duration (min)' },
  { key: 'caloriesBurned', label: 'Calories' }
];

function Activities() {
  return (
    <CollectionPage
      endpoint="activities"
      title="Activities"
      subtitle="Workout activity logs and intensity details"
      columns={columns}
    />
  );
}

export default Activities;
