import CollectionPage from './CollectionPage';

const leaderboardEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/';

const columns = [
  { key: 'rank', label: 'Rank' },
  { key: 'user', label: 'User' },
  { key: 'team', label: 'Team' },
  { key: 'points', label: 'Points' }
];

function Leaderboard() {
  return (
    <CollectionPage
      endpoint="leaderboard"
      endpointUrl={leaderboardEndpoint}
      title="Leaderboard"
      subtitle="Competitive rankings across users and teams"
      columns={columns}
    />
  );
}

export default Leaderboard;
