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

    login(credentials) // call login function defined in the AuthProvider
  }
 

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
  <div className="flex flex-col bg-white h-screen w-screen overflow-hidden ">
    <header className="flex items-center justify-between px-4 py-5  w-full ">
      <div className="w-[339px] h-[73px] relative font-medium hidden max-w-full">
        Sign In
      </div>
    </header>
    <main className="mt-9 w-full max-md:max-w-full  cellphone:items-center cellphone:grid cellphone:justify-center">
      <div className="flex gap-5 max-md:flex-col max-md:gap-0 cellphone:items-center cellphone:justify-center w-full"> 
      <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full cellphone:hidden">
        <div className="flex overflow-hidden relative flex-col grow justify-center fill-gray-50 fill-opacity-0 max-w-[700px] min-h-[697px] stroke-[1px] stroke-black max-md:hidden max-md:max-w-full max-sm:hidden max-sm:min-h-0 ">
        <img loading="lazy"
        src="/SignInBlob.png"></img>
        </div>
      </div>
        <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full cellphone:w-full cellphone:max-w-xs cellphone:px-4">
          <section className="flex flex-col mt-28 mr-auto text-lg text-slate-800 text-opacity-50 max-md:mt-10 max-md:max-w-full ">
            <div className="tablet:p-50 cellphone:justify-center">
              <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/f9b49ac30b1360c78aaee84af182c069847bf947406edfc0f8e4a1d3a3605a86?apiKey=c75bef4eb26d40e482592a37bfd0f8b8&" alt="" className="ml-3 max-w-full aspect-[3.7] w-[489px] cellphone:ml-0" />
            </div>
            {/* <div className="w-full md:w-1/2"> */}
          <section className="flex flex-col items-center mt-10 tablet:p-10 cellphone:items-center"> 
            <form onSubmit={handleLogin} className=" rounded-lg py-4 px-4 w-full max-w-md mx-auto text-lg cellphone:text-gray-700 cellphone:py-0 cellphone:px-0">
              <FormInput
                type="text"
                placeholder="Username"
                name="Username"
                required={true}
                value={usernameTextValue}
                onChange={(e) => setUsernameTextValue(e.target.value)}
                data-cy="username-input"
                />
              <FormInput
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                required={true}
                value={passwordTextValue}
                onChange={(e) => setPasswordTextValue(e.target.value)}
                icon="/eye_password.png"
                onIconClick={togglePasswordVisibility}
                data-cy="password-input"
              />
                <button
                type="submit"
                className="bg-primary hover:bg-secondary text-white rounded-lg py-4 px-16 w-full mt-4">
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

