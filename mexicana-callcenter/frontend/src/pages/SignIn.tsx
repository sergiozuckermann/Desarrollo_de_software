// Import the FunctionComponent type and useState hook from the 'react' module
import { FunctionComponent, useState } from "react";
// Import the useAuth hook from the '../hooks/useAuth' module
import { useAuth } from '../hooks/useAuth';
// Import the FormInput component from the "../components/FormInput" module
import FormInput from "../components/FormInput";

// Define the SignIn component as a functional component
const SignIn: FunctionComponent = () => {
  // Declare a state variable 'usernameTextValue' and its setter function 'setUsernameTextValue'
  // Initialize it with an empty string
  const [usernameTextValue, setUsernameTextValue] = useState("");
  // Declare a state variable 'passwordTextValue' and its setter function 'setPasswordTextValue'
  // Initialize it with an empty string
  const [passwordTextValue, setPasswordTextValue] = useState("");
  // Declare a state variable 'showPassword' and its setter function 'setShowPassword'
  // Initialize it with a boolean value of false
  const [showPassword, setShowPassword] = useState(false);
  // Destructure the 'login' function from the 'useAuth' hook
  const { login } = useAuth();

  // Define an asynchronous function 'handleLogin' that takes an event object as a parameter
  const handleLogin = async (e: React.FormEvent) => {
    // Prevent the default form submission behavior
    e.preventDefault();

    // Create an object 'credentials' with the current values of 'usernameTextValue' and 'passwordTextValue'
    const credentials = { username: usernameTextValue, password: passwordTextValue };

    // Call the 'login' function with the 'credentials' object
    login(credentials);
  };

  // Define a function 'togglePasswordVisibility' that toggles the value of 'showPassword'
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  // Return the JSX markup for the SignIn component
  return (
    // Render a div with the specified CSS classes
    <div className="flex flex-col bg-white h-screen w-screen overflow-hidden">
      {/* Render a header with the specified CSS classes */}
      <header className="flex items-center justify-between px-4 py-5 w-full">
        {/* Render a div with the specified CSS classes */}
        <div className="w-[339px] h-[73px] relative font-medium hidden max-w-full">
          {/* Display the text "Sign In" */}
          Sign In
        </div>
      </header>
      {/* Render the main content with the specified CSS classes */}
      <main className="mt-9 w-full max-md:max-w-full cellphone:items-center cellphone:grid cellphone:justify-center">
        {/* Render a div with the specified CSS classes */}
        <div className="flex gap-5 max-md:flex-col max-md:gap-0 cellphone:items-center cellphone:justify-center w-full">
          {/* Render a div for the sign-in image */}
          <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full cellphone:hidden">
            {/* Render a div with the specified CSS classes */}
            <div className="flex overflow-hidden relative flex-col grow justify-center fill-gray-50 fill-opacity-0 max-w-[700px] min-h-[697px] stroke-[1px] stroke-black max-md:hidden max-md:max-w-full max-sm:hidden max-sm:min-h-0">
              {/* Render an image with the specified attributes */}
              <img loading="lazy" src="/SignInBlob.png" alt="" />
            </div>
          </div>
          {/* Render a div for the sign-in form */}
          <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full cellphone:w-full cellphone:max-w-xs cellphone:px-4">
            {/* Render a section with the specified CSS classes */}
            <section className="flex flex-col mt-28 mr-auto text-lg text-slate-800 text-opacity-50 max-md:mt-10 max-md:max-w-full">
              {/* Render a div with the specified CSS classes */}
              <div className="tablet:p-50 cellphone:justify-center">
                {/* Render an image with the specified attributes */}
                <img loading="lazy" src="/newLogo_LIGHT_1.png" alt="" className="ml-3 max-w-full aspect-[3.7] w-[489px] cellphone:ml-0" />
              </div>
              {/* Render a section for the sign-in form */}
              <section className="flex flex-col items-center mt-10 tablet:p-10 cellphone:items-center">
                {/* Render a form with the specified attributes and CSS classes */}
                <form onSubmit={handleLogin} className="rounded-lg py-4 px-4 w-full max-w-md mx-auto text-lg cellphone:text-gray-700 cellphone:py-0 cellphone:px-0">
                  {/* Render the FormInput component for the username input */}
                  <FormInput
                    type="text"
                    placeholder="Username"
                    name="Username"
                    required={true}
                    value={usernameTextValue}
                    onChange={(e: any) => setUsernameTextValue(e.target.value)}
                    data-cy="username-input"
                  />
                  {/* Render the FormInput component for the password input */}
                  <FormInput
                    // Set the input type to "text" if 'showPassword' is true, otherwise set it to "password"
                    type={showPassword ? "text" : "password"}
                    // Set the placeholder text for the password input
                    placeholder="Password"
                    // Set the name attribute of the password input
                    name="password"
                    // Set the required attribute to true, indicating that the password input is mandatory
                    required={true}
                    // Set the value of the password input to the current value of 'passwordTextValue'
                    value={passwordTextValue}
                    // Set the onChange event handler for the password input
                    // When the input value changes, update the 'passwordTextValue' state with the new value
                    onChange={(e: any) => setPasswordTextValue(e.target.value)}
                    // Set the path to the icon image for the password input
                    icon="/eye_password.png"
                    // Set the click event handler for the password input icon
                    // When the icon is clicked, toggle the visibility of the password by calling 'togglePasswordVisibility'
                    onIconClick={togglePasswordVisibility}
                    // Set a custom data attribute 'data-cy' for testing purposes
                    data-cy="password-input"
                    />
                  {/* Render a submit button with the specified attributes and CSS classes */}
                  <button
                  // Set the type of the button to "submit"
                    type="submit"
                    className="bg-primary hover:bg-secondary text-white rounded-lg py-4 px-16 w-full mt-4"
                  >
                    {/* Display the text "Sign in" */}
                    Sign in
                  </button>
                </form>
              </section>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

// Export the SignIn component as the default export
export default SignIn;