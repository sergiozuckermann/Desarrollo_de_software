import { FunctionComponent, useState } from "react";
import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  AuthFlowType,
} from "@aws-sdk/client-cognito-identity-provider"; // ES Modules import
import { jwtDecode } from 'jwt-decode';
import useCustomToast from "../components/notificationComponent";
import { useAuth, CustomTokenPayload } from "../components/authContext";
import {useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";

  
const SignIn: FunctionComponent = () => {
  const [emailTextValue, setEmailTextValue] = useState("");
  const [passwordTextValue, setPasswordTextValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { showError } = useCustomToast();
  const { showSuccess } = useCustomToast();
  const { setJobLevel } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const client = new CognitoIdentityProviderClient({ region: "us-east-1" });

    const input = {
      // InitiateAuthRequest
      AuthFlow: AuthFlowType.USER_PASSWORD_AUTH, // required
      AuthParameters: {
        // AuthParametersType
        USERNAME: emailTextValue,
        PASSWORD: passwordTextValue,
      },
      ClientId: "7n1pkdlieo0jnsl5uht0vpd5pj", // required
    };
    const command = new InitiateAuthCommand(input);

    try {
      const response = await client.send(command);
      const { $metadata } = response;
      const { AuthenticationResult } = response;

      // check if user was successfully logged in
      if ($metadata.httpStatusCode === 200) {
        showSuccess("🎉 You are now signed in.");
        if (AuthenticationResult && AuthenticationResult.IdToken) {
          const decodedToken = jwtDecode<CustomTokenPayload>(AuthenticationResult.IdToken);
          if (decodedToken['custom:job_level']) {
            const jobLevel = decodedToken['custom:job_level'];
            
            setJobLevel(jobLevel);
            navigate("/profileTest");
          }
        }
      }      
    } catch (err) {
      // check if there was an error logging in and notify the user
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred.";
      showError(`🚨 ${errorMessage}`);
    }
  }
 

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
    return (
    <div className="flex flex-col bg-white h-screen w-screen overflow-hidden">
       <header className="flex items-center justify-between px-4 py-5  w-full">
                <div className="w-[339px] h-[73px] relative font-medium hidden max-w-full">
                  Sign In
                </div>
                </header>
      <main className="mt-9 w-full max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
        <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
                   <div className="flex overflow-hidden relative flex-col grow justify-center border border-black border-none fill-gray-50 fill-opacity-0 max-w-[700px] min-h-[697px] stroke-[1px] stroke-black max-md:hidden max-md:max-w-full max-sm:hidden max-sm:min-h-0">
                   <img loading="lazy"
                    src="/SignInBlob.png"></img>
                   </div>
                 </div>
          <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
            <section className="flex flex-col mt-28 mr-auto text-lg text-slate-800 text-opacity-50 max-md:mt-10 max-md:max-w-full">
              <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/f9b49ac30b1360c78aaee84af182c069847bf947406edfc0f8e4a1d3a3605a86?apiKey=c75bef4eb26d40e482592a37bfd0f8b8&" alt="" className="ml-3 max-w-full aspect-[3.7] w-[489px]" />
              <div className="w-full flex flex-col items-center">
                <form onSubmit={handleLogin} className="border-2 border-gray-300 rounded-lg py-4 px-4 w-full text-lg pr-4 pl-4 ${className}">
                  <FormInput 
                    type="email"
                    placeholder="Email"
                    name="email"
                    data-cy="email-input"
                    required={true}
                    value={emailTextValue}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmailTextValue(e.target.value)}
                  />
                  <FormInput
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                    data-cy="password-input"
                    required={true}
                    value={passwordTextValue}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPasswordTextValue(e.target.value)}
                    icon="/eye_password.png"
                    onIconClick={togglePasswordVisibility}
                  />
                  <button
                    type="submit"
                    className="bg-primary hover:bg-secondary text-white rounded-lg py-4 px-16 pr-40 pl-40 max-w-sm mx-auto text-lg block">
                    Sign in
                  </button>
                </form>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignIn;
