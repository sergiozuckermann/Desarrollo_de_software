import { useAuth } from "../hooks/useAuth";

const SupervisorHomeTest = () => {
  const { logout } = useAuth();

  return (
    <div>
      <h1>Supervisor home</h1>
      <button onClick={() => logout()}>logout</button>
    </div>
  );
};

export default SupervisorHomeTest;
