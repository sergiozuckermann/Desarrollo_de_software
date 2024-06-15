// Import the PageStructure component from the "../components/PageStructure" module
import PageStructure from "../components/PageStructure";

// Define the MainContent component
const MainContent = () => {
  // Return the JSX to be rendered by the MainContent component
  return (
    // Render a paragraph with the text "Notifications"
    <p>Notifications</p>
  );
};

// Define the NotificationCenter component
const NotificationCenter = () => {
  // Return the JSX to be rendered by the NotificationCenter component
  return (
    // Render the PageStructure component and pass the title prop as "Notifications"
    <PageStructure title="Notifications">
      {/* Render the MainContent component */}
      <MainContent />
    </PageStructure>
  );
};

// Export the NotificationCenter component as the default export
export default NotificationCenter;