import { useAuth } from '../components/authContext';

const ProfileComponent = () => {
  const { jobLevel } = useAuth();

  return (
    <div>
      {jobLevel === 'Supervisor' ? (
        <div>Supervisor Content</div>
      ) : (
        <div>Agent Content</div>
      )}
    </div>
  );
};

export default ProfileComponent;
