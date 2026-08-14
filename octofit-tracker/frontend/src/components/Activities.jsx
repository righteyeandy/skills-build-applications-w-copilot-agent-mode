import CollectionPage from './CollectionPage';

const activitiesEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/';

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
      endpointUrl={activitiesEndpoint}
      title="Activities"
      subtitle="Workout activity logs and intensity details"
      columns={columns}
    />
  );
}

export default Activities;
