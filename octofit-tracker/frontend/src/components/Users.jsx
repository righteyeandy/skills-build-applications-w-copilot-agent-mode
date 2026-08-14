import CollectionPage from './CollectionPage';

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
      title="Users"
      subtitle="Registered OctoFit athletes and profile details"
      columns={columns}
    />
  );
}

export default Users;
