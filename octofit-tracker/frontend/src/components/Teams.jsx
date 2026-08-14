import CollectionPage from './CollectionPage';

const columns = [
  { key: 'name', label: 'Team Name' },
  { key: 'description', label: 'Description' },
  { key: 'members', label: 'Members' },
  { key: 'totalPoints', label: 'Total Points' }
];

function Teams() {
  return (
    <CollectionPage
      endpoint="teams"
      title="Teams"
      subtitle="Team rosters and group performance"
      columns={columns}
    />
  );
}

export default Teams;
