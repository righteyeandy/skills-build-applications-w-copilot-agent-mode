import CollectionPage from './CollectionPage';

const teamsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/';

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
      endpointUrl={teamsEndpoint}
      title="Teams"
      subtitle="Team rosters and group performance"
      columns={columns}
    />
  );
}

export default Teams;
