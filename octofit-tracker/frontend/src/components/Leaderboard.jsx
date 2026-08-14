import CollectionPage from './CollectionPage';

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
      title="Leaderboard"
      subtitle="Competitive rankings across users and teams"
      columns={columns}
    />
  );
}

export default Leaderboard;
