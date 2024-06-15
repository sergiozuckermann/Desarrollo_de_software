// Import the useAuth hook from the "../hooks/useAuth" module
import { useAuth } from "../hooks/useAuth";

// Define the SupervisorHomeTest component
const SupervisorHomeTest = () => {
  // Destructure the 'logout' function from the 'useAuth' hook
  const { logout } = useAuth();

  // Return the JSX to be rendered by the SupervisorHomeTest component
  return (
    // Render a div container
    <div>
      {/* Render an h1 heading with the text "Supervisor home" */}
      <h1>Supervisor home</h1>
      {/* Render a button */}
      <button
        // Attach a click event handler to the button
        onClick={() => logout()}
      >
        {/* Set the text of the button to "logout" */}
        logout
      </button>
    </div>
  );
};

// Export the SupervisorHomeTest component as the default export
export default SupervisorHomeTest;