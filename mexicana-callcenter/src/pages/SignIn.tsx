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
          className="border-2 border-gray-300 rounded-lg py-4 px-6 w-full text-lg pr-10 ${className}" 
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
            <div className="flex flex-col bg-white" style={{ overflowX: "auto", overflowY: "auto" }}>
            <header className="self-stretch h-[100px] relative bg-tertiary shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] hidden" />
       <div className="w-[339px] h-[73px] relative font-medium hidden max-w-full">
        Sign In
      </div>
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
                        className="bg-primary hover:bg-secondary text-white rounded-lg py-6 px-6 w-full text-lg content-center">
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





// import { FunctionComponent, useState } from "react";
// import {
//   CognitoIdentityProviderClient,
//   InitiateAuthCommand,
//   AuthFlowType,
// } from "@aws-sdk/client-cognito-identity-provider"; // ES Modules import
// import { jwtDecode } from 'jwt-decode';
// import useCustomToast from "../components/notificationComponent";
// import { useAuth, CustomTokenPayload } from "../components/authContext";
// import { useNavigate } from "react-router-dom";

// const SignIn: FunctionComponent = () => {
//   const [emailTextValue, setEmailTextValue] = useState("");
//   const [passwordTextValue, setPasswordTextValue] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const { showError } = useCustomToast();
//   const { showSuccess } = useCustomToast();
//   const { setJobLevel } = useAuth();
//   const navigate = useNavigate();

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const client = new CognitoIdentityProviderClient({ region: "us-east-1" });

//     const input = {
//       // InitiateAuthRequest
//       AuthFlow: AuthFlowType.USER_PASSWORD_AUTH, // required
//       AuthParameters: {
//         // AuthParametersType
//         USERNAME: emailTextValue,
//         PASSWORD: passwordTextValue,
//       },
//       ClientId: "7n1pkdlieo0jnsl5uht0vpd5pj", // required
//     };
//     const command = new InitiateAuthCommand(input);

//     try {
//       const response = await client.send(command);
//       const { $metadata } = response;
//       const { AuthenticationResult } = response;

//       // check if user was successfully logged in
//       if ($metadata.httpStatusCode === 200) {
//         showSuccess("🎉 You are now signed in.");
//         if (AuthenticationResult && AuthenticationResult.IdToken) {
//           const decodedToken = jwtDecode<CustomTokenPayload>(AuthenticationResult.IdToken);
//           if (decodedToken['custom:job_level']) {
//             const jobLevel = decodedToken['custom:job_level'];
            
//             setJobLevel(jobLevel);
//             navigate("/profileTest");
//           }
//         }
//       }      
//     } catch (err) {
//       // check if there was an error logging in and notify the user
//       const errorMessage =
//         err instanceof Error ? err.message : "An unexpected error occurred.";
//       showError(`🚨 ${errorMessage}`);
//     }
//   }
 

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <div className="w-full relative bg-white overflow-hidden flex flex-col items-start justify-start gap-[35px] tracking-[normal] text-right text-41xl text-primary font-paragraph mq750:gap-[17px]">
//       <header className="self-stretch h-[100px] relative bg-tertiary shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] hidden" />
//       <div className="w-[339px] h-[73px] relative font-medium hidden max-w-full">
//         Sign In
//       </div>
//       <div className="w-[269px] h-[75px] relative hidden text-center text-lg text-black">
//         <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%]">
//           <img
//             className="absolute h-full w-[74.35%] top-[0px] right-[25.65%] bottom-[0px] left-[0%] max-w-full overflow-hidden max-h-full object-cover"
//             alt=""
//             src="/image-12@2x.png"
//           />
//         </div>
//         <div className="absolute h-[calc(100%_-_16px)] w-[21.93%] top-[8px] right-[0%] bottom-[8px] left-[78.07%]">
//           <img
//             className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] max-w-full overflow-hidden max-h-full object-cover"
//             alt=""
//             src="/mexicana-logoremovebgpreview-1@2x.png"
//           />
//           <img
//             className="absolute h-[57.63%] w-[77.8%] top-[7.63%] right-[17.29%] bottom-[34.75%] left-[4.92%] max-w-full overflow-hidden max-h-full object-cover"
//             alt=""
//             src="/5c54ffaa6210e5031ddf4b4320271804dibujosanimadosdeauriculares-1@2x.png"
//           />
//         </div>
//         <div className="absolute top-[10.67%] left-[12.64%]">Call Center</div>
//       </div>
//       <main className="self-stretch h-[697px] flex flex-row items-start justify-start pt-0 pb-[243px] pr-[107px] pl-[620px] box-border gap-[35px] max-w-full lg:pl-[310px] lg:pr-[53px] lg:box-border mq450:pl-5 mq450:pb-[103px] mq450:box-border mq750:gap-[17px] mq750:pl-[155px] mq750:pr-[26px] mq750:box-border mq1050:pb-[158px] mq1050:box-border">
//         <img
//           className="ml-[-829px] h-[732px] w-[794px] relative shrink-0 [debug_commit:1cbd860] max-w-[144%] z-[2]"
//           alt=""
//           src="/sign-in-label.svg"
//         />

//         <div className="self-stretch w-[553px] flex flex-col items-start justify-start pt-[114px] px-0 pb-0 box-border max-w-full mq450:pt-[74px] mq450:box-border">
//           <form
//             onSubmit={handleLogin}
//             className="m-0 self-stretch flex-1 flex flex-col items-end justify-start gap-[46px] shrink-0 [debug_commit:1cbd860] mq750:gap-[23px]"
//           >
//             <div className="self-stretch flex-1 flex flex-col items-start justify-start gap-[16.2px] max-w-full">
//               <div className="w-[501px] flex-1 flex flex-row items-start justify-start relative max-w-full">
//                 <div className="h-[697px] w-[632px] absolute my-0 mx-[!important] bottom-[-453px] left-[-620px]">
//                   <div className="absolute top-[126px] left-[249px] w-[85px] h-[85px]">
//                     <img
//                       className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] max-w-full overflow-hidden max-h-full object-cover"
//                       alt=""
//                       src="/mexicana-logoremovebgpreview-1-1@2x.png"
//                     />
//                     <img
//                       className="absolute h-[57.65%] w-[77.76%] top-[7.65%] right-[17.29%] bottom-[34.71%] left-[4.94%] max-w-full overflow-hidden max-h-full object-cover z-[1]"
//                       alt=""
//                       src="/5c54ffaa6210e5031ddf4b4320271804dibujosanimadosdeauriculares-1-1@2x.png"
//                     />
//                   </div>
//                   <img
//                     className="absolute top-[0px] left-[-162px] w-[794px] h-[732px] z-[3]"
//                     alt=""
//                     src="/vector-1.svg"
//                   />
//                 </div>
//                 <div className="self-stretch flex-1 flex flex-row items-start justify-start py-0 pr-0 pl-3 box-border max-w-full">
//                   <img
//                     className="h-[130px] flex-1 relative max-w-full overflow-hidden object-cover z-[4]"
//                     loading="lazy"
//                     alt=""
//                     src="/untitled-design-2-1@2x.png"
//                   />
//                 </div>
//               </div>
//               <div className="self-stretch rounded-3xs bg-tertiary box-border flex flex-row items-start justify-start pt-4 px-[18px] pb-[10.800000000000182px] max-w-full border-[1px] border-solid border-marco">
//                 <div className="h-[44.8px] w-[553px] relative rounded-3xs bg-tertiary box-border hidden max-w-full border-[1px] border-solid border-marco" />
//                 <input
//                   className="[border:none] [outline:none] font-paragraph text-lg bg-[transparent] h-[18px] w-[100%] relative text-marco text-left flex items-end shrink-0 p-0 z-[1]"
//                   data-cy="email-input" // Added to do cypress testing
//                   placeholder="Email"
//                   type="text"
//                   value={emailTextValue}
//                   onChange={(event) => setEmailTextValue(event.target.value)}
//                 />
//               </div>
//               <div className="self-stretch rounded-3xs bg-tertiary box-border flex flex-row items-start justify-start pt-[15.800000000000182px] px-[19px] pb-[11px] max-w-full border-[1px] border-solid border-marco relative">
//                   <input
//                       className="[border:none] [outline:none] font-paragraph text-lg bg-[transparent] h-[18px] w-[calc(100% - 10%)] relative text-marco text-left flex items-end shrink-0 p-0 z-[1] "
//                       data-cy="password-input" // Added to do cypress testing
//                       placeholder="Password"
//                       type={showPassword ? "text" : "password"}
//                       value={passwordTextValue}
//                       onChange={(event) => setPasswordTextValue(event.target.value)}
//                   />
//                   <img
//                       className="cursor-pointer absolute top-1/2 right-2 transform -translate-y-1/2 h-[30px] w-[30px]"
//                       src="/eye_password.png"
//                       alt="toggle password visibility"
//                       onClick={togglePasswordVisibility}
//                   />
//               </div>
//             </div>
//             <div className="w-[508px] flex flex-row items-start justify-center py-0 px-5 box-border max-w-full">
//               <button
//                data-cy="submit-button" // Added to do cypress testing
//                 type="submit"
//                 className="cursor-pointer [border:none] py-2.5 px-5 bg-primary w-[300px] rounded-3xs flex flex-row items-start justify-center box-border whitespace-nowrap hover:bg-slategray"
//               >
//                 <div className="h-[22px] w-[58px] relative text-lg font-paragraph text-tertiary text-center inline-block min-w-[58px]">
//                   Sign in
//                 </div>
//               </button>
//             </div>
//           </form>
//         </div>
//       </main>
//     </div>
//   );
// }


// export default SignIn;
