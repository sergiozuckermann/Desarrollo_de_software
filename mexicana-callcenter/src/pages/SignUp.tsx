
import React, { useState } from "react";
import {
  CognitoIdentityProviderClient,
  SignUpCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import useCustomToast from "../components/notificationComponent";
import "../global.css";

const SignUp: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [jobLevel, setJobLevel] = useState("");
  const [passwordValid, setPasswordValid] = useState(false);
  const [confirmPasswordTextValue, setConfirmPasswordTextValue] = useState("");
  const [passwordTextValue, setPasswordTextValue] = useState("");
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false); // Nuevo estado
  const { showError, showSuccess } = useCustomToast();

  const checkPasswordRequirements = (password: string) => {
    return /[a-z]/.test(password) && /[A-Z]/.test(password) && /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/.test(password);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const client = new CognitoIdentityProviderClient({ region: "us-east-1" });

    const command = new SignUpCommand({
      ClientId: "2gdenkjjd809jojhh7ojfqslf1",
      Username: email,
      Password: password,
      UserAttributes: [
        { Name: "given_name", Value: firstName },
        { Name: "family_name", Value: lastName },
        { Name: "custom:job_level", Value: jobLevel },
      ],
    });

    try {
      const response = await client.send(command);
      const { $metadata } = response;

      // check if user was registered
      if ($metadata.httpStatusCode === 200) {
        showSuccess(
          "🎉 User is registered but confirmation is needed by Admin.\n You will be notified via email when confirmation is done."
        );
      }
    } catch (err) {
      // check if there was an error signing up and notify the user
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred.";
      showError(`🚨 ${errorMessage}`);
    }
  };

  const togglePasswordVisibility = (field: string) => { // Modificado para aceptar un parámetro adicional
    if (field === "password") {
      setShowPassword(!showPassword);
    } else if (field === "confirmPassword") {
      setShowPasswordConfirm(!showPasswordConfirm);
    }
  };

  return (
    <div className="w-full relative bg-white overflow-hidden flex flex-col items-center justify-start gap-[64px] tracking-[normal] mq450:gap-[16px] mq700:gap-[32px] mt-[10%]">      
      <main className="w-[1210px] flex flex-row items-start justify-start py-0 pr-0 box-border gap-[67px] max-w-full cellphone:items-center cellphone:grid cellphone:justify-center">
        <form
          onSubmit={handleSignUp}
          className="flex-1 flex flex-col items-end justify-start gap-[50px] min-w-[383px] max-w-full mq450:min-w-full mq700:gap-[25px] cellphone:text-gray-700 cellphone:py-0 cellphone:px-0"
        >
          {/* signup form */}
          <div className="self-stretch flex flex-col items-start justify-start gap-[15.57px] max-w-full text-left text-lg text-marco font-paragraph cellphone:items-center cellphone:grid cellphone:justify-center pl-[20px] pr-[20px]">
            <div className="w-full md:w-[573px] flex-1 flex flex-row items-start justify-start py-0 px-4 box-border max-w-full md:pl-4 md:pr-4">
              <img
                  className="h-auto w-full object-cover"
                  loading="lazy"
                  alt=""
                  src="/untitled-design-2-2@2x.png"
              />
            </div>
            <div className="self-stretch rounded-3xs bg-tertiary box-border flex flex-row items-start justify-start pt-[15px] px-5 pb-[9.600000000000364px] max-w-full border-[1px] border-solid border-marco">
              <div className="h-[42.6px] w-[590px] relative rounded-3xs bg-tertiary box-border hidden max-w-full border-[1px] border-solid border-marco" />
              <input
                className="[border:none] [outline:none] font-paragraph text-lg bg-[transparent] h-[25px] w-[100%] relative text-marco text-left flex items-end shrink-0 p-0 z-[1]"
                placeholder="First Name(s)"
                type="text"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
              />
            </div>
            <div className="self-stretch rounded-3xs bg-tertiary box-border flex flex-row items-start justify-start pt-[15.899999999999636px] px-[21px] pb-[9.700000000000728px] max-w-full border-[1px] border-solid border-marco">
              <div className="h-[42.6px] w-[590px] relative rounded-3xs bg-tertiary box-border hidden max-w-full border-[1px] border-solid border-marco" />
              <input
                className="[border:none] [outline:none] font-paragraph text-lg bg-[transparent] h-[25px] w-[100%] relative text-marco text-left flex items-end shrink-0 p-0 z-[1]"
                placeholder="Surname"
                type="text"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
              />
            </div>
            <div className="self-stretch rounded-3xs bg-tertiary box-border flex flex-row items-start justify-start pt-[15.5px] px-[19.699999999999815px] pb-[10.100000000000364px] max-w-full border-[1px] border-solid border-marco">
              <div className="h-[42.6px] w-[590px] relative rounded-3xs bg-tertiary box-border hidden max-w-full border-[1px] border-solid border-marco" />
              <input
                className="[border:none] [outline:none] font-paragraph text-lg bg-[transparent] h-[25px] w-[100%] relative text-marco text-left flex items-end shrink-0 p-0 z-[1]"
                placeholder="Email"
                type="text"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="self-stretch rounded-3xs bg-tertiary box-border flex flex-row items-start justify-start pt-[15.800000000000182px] px-[19px] pb-[11px] max-w-full border-[1px] border-solid border-marco relative">
              <div className="h-[42.6px] w-[590px] relative rounded-3xs bg-tertiary box-border hidden max-w-full border-[1px] border-solid border-marco" />
                <input
                  className="[border:none] [outline:none] font-paragraph text-lg bg-[transparent] h-[25px] w-[(100%-10%)] relative text-marco text-left flex items-end shrink-0 p-0 z-[1]"
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setPasswordValid(checkPasswordRequirements(event.target.value));
                    setPasswordTextValue(event.target.value);
                  }}
                  style={{ color: passwordValid ? 'green' : 'red' }}
                />
                <img
                  className="cursor-pointer absolute top-1/2 right-2 transform -translate-y-1/2 h-[30px] w-[30px]"
                  src="/eye_password.png"
                  alt="toggle password visibility"
                  onClick={() => togglePasswordVisibility("password")} // Modificado para especificar qué campo de contraseña debe manipularse
                />
            </div>
            <p  style={{ color: 'gray', fontSize: '12px', margin: '0' }}>Must contain one upper and lowercase letter, one special character and be at least 8 characters long</p>

            <div className="self-stretch rounded-3xs bg-tertiary box-border flex flex-row items-start justify-start pt-[15.800000000000182px] px-[19px] pb-[11px] max-w-full border-[1px] border-solid border-marco relative">
              <div className="h-[42.6px] w-[590px] relative rounded-3xs bg-tertiary box-border hidden max-w-full border-[1px] border-solid border-marco" />
              <input
                className="[border:none] [outline:none] font-paragraph text-lg bg-[transparent] h-[25px] w-[(100%-10%)] relative text-marco text-left flex items-end shrink-0 max-w-full p-0 z-[1]"
                placeholder="Confirm Password"
                type={showPasswordConfirm ? "text" : "password"} 
                value={confirmPassword}
                onChange={(event) => {
                  setConfirmPassword(event.target.value);
                  setConfirmPasswordTextValue(event.target.value);
                }}
                style={{ color: confirmPasswordTextValue === passwordTextValue ? 'green' : 'red' }}
              />
              <img
                className="cursor-pointer absolute top-1/2 right-2 transform -translate-y-1/2 h-[30px] w-[30px]"
                src="/eye_password.png"
                alt="toggle password visibility"
                onClick={() => togglePasswordVisibility("confirmPassword")} 
              />
            </div>
            <p  style={{ color: 'gray', fontSize: '12px', margin: '0' }}>The password must match</p>


            {/* DROPDOWN JOB LEVEL */}
            <div className="self-stretch rounded-3xs bg-tertiary box-border flex flex-row items-start justify-start pt-[15.600000000000364px] px-[21px] pb-2.5 relative max-w-full border-[1px] border-solid border-marco">
              <div className="h-[42.6px] w-[590px] relative rounded-3xs bg-tertiary box-border hidden max-w-full border-[1px] border-solid border-marco" />
              <div className="relative flex-1">
              <div className="custom-select-wrapper">
                <select className="custom-select " value={jobLevel} onChange={(event) => setJobLevel(event.currentTarget.value)}>
                  <option value="" disabled>Job Level</option>
                  <option value="Agent">Agent</option>
                  <option value="Supervisor">Supervisor</option>
                </select>
              </div>
              </div>
            </div>

            
            {/* button */}
            <div className="self-stretch flex flex-row items-start justify-center py-0 pr-5 pl-[30px]">
              <button
                type="submit"
                className="cursor-pointer [border:none] py-2.5 px-5 bg-primary w-[300px] rounded-3xs flex flex-row items-start justify-center box-border hover:bg-slategray"
              >
                <div className="h-[22px] w-[58px] relative text-lg font-paragraph text-tertiary text-center inline-block min-w-[58px]">
                  Create
                </div>
              </button>
            </div>
          </div>
        </form>
        
        <div className="w-[533px] flex flex-col items-start justify-start px-0 pb-0 box-border min-w-[533px] max-w-full mq700:min-w-full mq975:flex-1 cellphone:hidden pl-[10%]">
          <div className="self-stretch h-[654px]">
            <img
              className="absolute h-[644px]"
              alt=""
              src= "/signup_blurb.png"
            />
          </div>
        </div>

      </main>

    </div>
  );
};

export default SignUp;