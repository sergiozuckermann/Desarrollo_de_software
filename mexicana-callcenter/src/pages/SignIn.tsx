import { FunctionComponent, useState } from "react";
import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  AuthFlowType,
} from "@aws-sdk/client-cognito-identity-provider"; // ES Modules import
import { jwtDecode } from 'jwt-decode';
import useCustomToast from "../components/notificationComponent";
import { useAuth, CustomTokenPayload } from "../components/authContext";
import { Form, useNavigate } from "react-router-dom";
import { FormInputProps } from "../types"; // Import FormInputProps type

const FormInput: React.FC<FormInputProps> = ({
    type,
    placeholder,
    name,
    className,
    required,
    value,
    onChange,
    icon,
    onIconClick,
  }) => {
    const inputPaddingRight = icon ? "pr-12" : "pr-4";
    return (
      <div className={className=" relative mb-4"}>
        <label htmlFor={name} className="sr-only">
          {placeholder}
        </label>
        <input
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
          className="border-2 border-gray-300 rounded-lg py-3 px-4 w-full text-lg pr-10 ${className}" 
        />
        {icon && (
          <img
            className="cursor-pointer absolute inset-y-0 right-1 my-auto h-6 w-6" 
            src={icon}
            alt="toggle password visibility"
            onClick={onIconClick}
          />
        )}
      </div>
    );
  };
  
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
            {/* <header className="items-end px-16 pt-7 pb-4 w-full text-6xl font-medium text-right bg-gray-50 shadow-sm text-slate-800 max-md:px-5 max-md:max-w-full max-md:text-4xl">
               Sign In
             </header> */}
            <main className="mt-9 w-full max-md:max-w-full">
              <div className="flex gap-5 max-md:flex-col max-md:gap-0"></div>
               <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
                  <div className="flex overflow-hidden relative flex-col grow justify-center border border-black border-none fill-gray-50 fill-opacity-0 max-w-[654px] min-h-[697px] stroke-[1px] stroke-black max-md:hidden max-md:max-w-full max-sm:hidden max-sm:min-h-0">
                    <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/95d42361535047c5ec4de20830a9f16e4cec66c779b4b96be8065a0d972af13a?apiKey=c75bef4eb26d40e482592a37bfd0f8b8&" alt="" className="object-contain object-top absolute inset-0 size-full" />
                    <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/b06560911a75a79371c04aeb38bab9a9d98d504b65d92288f44a293d57f3c87b?apiKey=c75bef4eb26d40e482592a37bfd0f8b8&" alt="" className="object-contain -ml-0.5 w-full border border-white border-solid aspect-[0.81] fill-[linear-gradient(133deg,#178448_20.16%,#19253E_91.74%)] max-w-[619px] max-md:flex max-md:max-w-full max-sm:hidden" />
                   </div>
                 </div>
                 <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                   <section className="flex flex-col mt-28 mr-auto text-lg text-slate-800 text-opacity-50 max-md:mt-10 max-md:max-w-full">
                     <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/f9b49ac30b1360c78aaee84af182c069847bf947406edfc0f8e4a1d3a3605a86?apiKey=c75bef4eb26d40e482592a37bfd0f8b8&" alt="" className="ml-3 max-w-full aspect-[3.7] w-[489px]" />
                  
                    <form onSubmit={handleLogin} className="flex flex-col gap-4 p-8">
                      <FormInput 
                        type="email"
                        placeholder="Email"
                        name="email"
                        data-cy="email-input" // Added to do cypress testings
                        // className="border-none outline-none font-paragraph text-lg bg-transparent h-18px w-full relative text-marco text-left flex items-end shrink-0 p-0 z-1"
                        required={true}
                        value={emailTextValue}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmailTextValue(e.target.value)}/>

                      <div className="relative mb-4">
                      <FormInput
                           data-cy="password-input" // Added to do cypress testing
                           placeholder="Password"
                           type={showPassword ? "text" : "password"}
                           value={passwordTextValue}
                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPasswordTextValue(e.target.value)}
                           className="pr-10"
                           icon="/eye_password.png"
                           onIconClick={togglePasswordVisibility}
                       />
                       {/* <img
                           className="cursor-pointer absolute inset-y-0 right-0 mr-3 my-auto h-[30px] w-[30px]"
                          //  className="cursor-pointer absolute inset-y-0 right-0 mr-6 my-auto h-[30px] w-[30px]
                           src="/eye_password.png"
                           alt="toggle password visibility"
                           onClick={togglePasswordVisibility}
                       /> */}
                      </div>
                       <button
                        type="submit"
                        className="bg-primary hover:bg-secondary text-white rounded-lg py-3 px-6 w-3/4 mx-auto text-lg">
                        Sign in
                      </button>
                    </form>
               
                     {/* <form
                      onSubmit={handleLogin}
                      className="flex flex-col gap-4 p-4 rounded-lg shadow-md bg-white max-w-md mx-auto my-8"
                        >
              <FormInput
                type="email"
                data-cy="email-input" // Added to do cypress testing
                placeholder="Email"
                name="email"
                className="[border:none] [outline:none] font-paragraph text-lg bg-[transparent] h-[18px] w-[100%] relative text-marco text-left flex items-end shrink-0 p-0 z-[1] "
                required={true}
                value={emailTextValue}
                onChange={(e:React.ChangeEvent<HTMLInputElement>) => setEmailTextValue(e.target.value)}
              />
              <FormInput
                type="password"
                placeholder="Password"
                name="password"
                className="your-input-class"
                required={true}
                value={passwordTextValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPasswordTextValue(e.target.value)}
              />
              <button
                type="submit"
                className="your-button-class"
              >
                Sign In
                </button>
              </form> */}
            </section>
         </div>
      </div>
      </main>
      </div>
        );
      };
export default SignIn;