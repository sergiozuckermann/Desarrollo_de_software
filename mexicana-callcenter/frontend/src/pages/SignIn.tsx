import { FunctionComponent, useState } from "react";
import { useAuth } from '../hooks/useAuth'
import FormInput from "../components/FormInput";

const SignIn: FunctionComponent = () => {
  const [usernameTextValue, setUsernameTextValue] = useState("");
  const [passwordTextValue, setPasswordTextValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const credentials = {username: usernameTextValue, password: passwordTextValue}

    // Perform login
    login(credentials).then(() => {
      // If login is successful, open Amazon Connect URL in a new tab
      const instanceURL = "https://mexicana-airline.my.connect.aws/ccp-v2/";
      window.open(instanceURL, '_blank');
    }).catch(error => {
      console.error("Login failed:", error);
    });
  }

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="flex flex-col w-screen h-screen overflow-hidden bg-white ">
      <header className="flex items-center justify-between w-full px-4 py-5 ">
        <div className="w-[339px] h-[73px] relative font-medium hidden max-w-full">
          Sign In
        </div>
      </header>
      <main className="w-full mt-9 max-md:max-w-full cellphone:items-center cellphone:grid cellphone:justify-center">
        <div className="flex w-full gap-5 max-md:flex-col max-md:gap-0 cellphone:items-center cellphone:justify-center"> 
          <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full cellphone:hidden">
            <div className="flex overflow-hidden relative flex-col grow justify-center fill-gray-50 fill-opacity-0 max-w-[700px] min-h-[697px] stroke-[1px] stroke-black max-md:hidden max-md:max-w-full max-sm:hidden max-sm:min-h-0 ">
              <img loading="lazy" src="/SignInBlob.png"></img>
            </div>
          </div>
          <div className="flex flex-col w-6/12 ml-5 max-md:ml-0 max-md:w-full cellphone:w-full cellphone:max-w-xs cellphone:px-4">
            <section className="flex flex-col mr-auto text-lg text-opacity-50 mt-28 text-slate-800 max-md:mt-10 max-md:max-w-full ">
              <div className="tablet:p-50 cellphone:justify-center">
                <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/f9b49ac30b1360c78aaee84af182c069847bf947406edfc0f8e4a1d3a3605a86?apiKey=c75bef4eb26d40e482592a37bfd0f8b8&" alt="" className="ml-3 max-w-full aspect-[3.7] w-[489px] cellphone:ml-0" />
              </div>
              <section className="flex flex-col items-center mt-10 tablet:p-10 cellphone:items-center"> 
                <form onSubmit={handleLogin} className="w-full max-w-md px-4 py-4 mx-auto text-lg rounded-lg  cellphone:text-gray-700 cellphone:py-0 cellphone:px-0">
                  <FormInput
                    type="text"
                    placeholder="Username"
                    name="Username"
                    required={true}
                    value={usernameTextValue}
                    onChange={(e:any) => setUsernameTextValue(e.target.value)}
                    data-cy="username-input"
                  />
                  <FormInput
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                    required={true}
                    value={passwordTextValue}
                    onChange={(e:any) => setPasswordTextValue(e.target.value)}
                    icon="/eye_password.png"
                    onIconClick={togglePasswordVisibility}
                    data-cy="password-input"
                  />
                  <button
                    type="submit"
                    className="w-full px-16 py-4 mt-4 text-white rounded-lg bg-primary hover:bg-secondary"
                  >
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
export default SignIn;
