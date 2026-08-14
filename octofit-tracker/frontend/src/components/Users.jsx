import CollectionPage from './CollectionPage';

const usersEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/';

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'fitnessLevel', label: 'Fitness Level' },
  { key: 'age', label: 'Age' }
];

function Users() {
  return (
    <CollectionPage
      endpoint="users"
      endpointUrl={usersEndpoint}
      title="Users"
      subtitle="Registered OctoFit athletes and profile details"
      columns={columns}
    />
  );
}

export default Users;
