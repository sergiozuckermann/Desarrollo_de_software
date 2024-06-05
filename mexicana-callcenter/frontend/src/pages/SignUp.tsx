import React, { useState } from "react";
import useCustomToast from "../components/LoginNotification";
import "../css/global.css";
import axios from "axios";
import { redirect } from "react-router-dom";
import { FaUpload } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";



const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [preferred_username, setUsername] = useState("");
  const [agentType, setAgentType] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [jobLevel, setJobLevel] = useState("");
  const [passwordValid, setPasswordValid] = useState(false);
  const [confirmPasswordTextValue, setConfirmPasswordTextValue] = useState("");
  const [passwordTextValue, setPasswordTextValue] = useState("");
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const { showError, showSuccess } = useCustomToast();
  const [file, setFile] = useState<File | null>(null);
  const [fileLabel, setFileLabel] = useState("Choose your profile picture");
  const [fileLabelColor, setFileLabelColor] = useState(""); 
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);


  const checkPasswordRequirements = (password: string) => {
    return /[a-z]/.test(password) && /[A-Z]/.test(password) && /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/.test(password);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      showError(`🚨 Passwords do not match!`);
      return;
    }
    const formData = new FormData();
    formData.append("profilePicture", file);
    formData.append("preferred_username", preferred_username);
    await axios.post('http://localhost:3000/upload', formData, { headers: {'Content-Type': 'multipart/form-data'}})

    const data = {
      name: firstName,
      lastname: lastName,
      email,
      username: preferred_username,
      agentType,
      password,
      jobLevel
    };

    console.log(data);

    try {
      const response = await fetch('http://localhost:3000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        showSuccess(
          "🎉 User is registered but confirmation is needed by Admin.\n You will be notified via email when confirmation is done."
        );
        navigate('/signin');
      } else {
        const errorData = await response.json();
        showError(`🚨 ${errorData.message}`);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred.";
      showError(`🚨 ${errorMessage}`);
    }
  };

  const togglePasswordVisibility = (field: string) => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else if (field === "confirmPassword") {
      setShowPasswordConfirm(!showPasswordConfirm);
    }
  
  
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    if (selectedFile) {
      setFile(selectedFile);
      uploadFile(selectedFile)
        .then(() => {
          setFileLabel("The image has been uploaded successfully");
          setFileLabelColor("green"); 
          setPreviewUrl(URL.createObjectURL(selectedFile));
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
          setFileLabel("Error uploading the image. Please try again.");
          setFileLabelColor("red"); 
        });
      e.target.value = '';
    }
  };

  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append("profilePicture", file);
    formData.append("preferred_username", preferred_username);
  
    try {
      await axios.post('http://localhost:3000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    } catch (error) {
      throw new Error("Error uploading file");
    }
  };

  const handleContainerClick = () => {
    const fileInput = document.getElementById('profilePictureInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  };
  

  return (
    <div className="w-full relative bg-white flex flex-col items-center justify-start gap-[64px] tracking-[normal] mq450:gap-[16px] mq700:gap-[32px] mt-[5%] overflow-hidden mb-[5%]">
      <main className="w-[1210px] flex flex-row items-start justify-start py-0 pr-0 box-border gap-[67px] max-w-full cellphone:items-center cellphone:grid cellphone:justify-center">
        <form
          onSubmit={handleSignUp}
          className="flex-1 flex flex-col items-end justify-start gap-[50px] min-w-[383px] max-w-full mq450:min-w-full mq700:gap-[25px] cellphone:text-gray-700 cellphone:py-0 cellphone:px-0"
        >
          {/* signup form */}
          <div className="self-stretch flex flex-col items-start justify-start gap-[15.57px] max-w-full text-left text-lg text-marco font-paragraph cellphone:items-center cellphone:grid cellphone:justify-center pl-[20px] pr-[20px]">
            <div className="w-full md:w-[573px] flex-1 flex flex-row items-start justify-start py-0 px-4 box-border max-w-full md:pl-4 md:pr-4">
              <img
                className="object-cover w-full h-auto"
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
                data-cy="first-name-input"
                required
              />
            </div>
            <div className="self-stretch rounded-3xs bg-tertiary box-border flex flex-row items-start justify-start pt-[15.899999999999636px] px-[21px] pb-[9.700000000000728px] max-w-full border-[1px] border-solid border-marco">
              <div className="h-[42.6px] w-[590px] relative rounded-3xs bg-tertiary box-border hidden max-w-full border-[1px] border-solid border-marco" />
              <input
                className="[border:none] [outline:none] 
                
                
                
                text-lg bg-[transparent] h-[25px] w-[100%] relative text-marco text-left flex items-end shrink-0 p-0 z-[1]"
                placeholder="Surname"
                type="text"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                data-cy="sur-name-input"
                required
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
                data-cy="email-input"
                required
              />
            </div>
            <div className="self-stretch rounded-3xs bg-tertiary box-border flex flex-row items-start justify-start pt-[15.5px] px-[19.699999999999815px] pb-[10.100000000000364px] max-w-full border-[1px] border-solid border-marco">
              <div className="h-[42.6px] w-[590px] relative rounded-3xs bg-tertiary box-border hidden max-w-full border-[1px] border-solid border-marco" />
              <input
                className="[border:none] [outline:none] font-paragraph text-lg bg-[transparent] h-[25px] w-[100%] relative text-marco text-left flex items-end shrink-0 p-0 z-[1]"
                placeholder="Username"
                type="text"
                value={preferred_username}
                onChange={(event) => setUsername(event.target.value)}
                data-cy="username-input"
                required
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
                data-cy="password-input"
                required
              />
              <img
                className="cursor-pointer absolute top-1/2 right-2 transform -translate-y-1/2 h-[30px] w-[30px]"
                src="/eye_password.png"
                alt="toggle password visibility"
                onClick={() => togglePasswordVisibility("password")} // Modificado para especificar qué campo de contraseña debe manipularse
              />
            </div>
            <p style={{ color: 'gray', fontSize: '12px', margin: '0' }}>Must contain one upper and lowercase letter, one special character and be at least 8 characters long</p>

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
                data-cy="password-confirm-input"
                required
              />
              <img
                className="cursor-pointer absolute top-1/2 right-2 transform -translate-y-1/2 h-[30px] w-[30px]"
                src="/eye_password.png"
                alt="toggle password visibility"
                onClick={() => togglePasswordVisibility("confirmPassword")}
              />
            </div>
            <p style={{ color: 'gray', fontSize: '12px', margin: '0' }}>The password must match</p>


            {/* DROPDOWN JOB LEVEL */}
            <div className="self-stretch rounded-3xs bg-tertiary box-border flex flex-row items-start justify-start pt-[15.600000000000364px] px-[21px] pb-2.5 relative max-w-full border-[1px] border-solid border-marco">
              <div className=" h-[42.6px] w-[590px] relative rounded-3xs bg-tertiary box-border hidden max-w-full border-[1px] border-solid border-marco" />
              <div className="relative flex-1 ">
                <div className="custom-select-wrapper ">
                  <select className="custom-select drop-down " value={jobLevel} onChange={(event) => setJobLevel(event.currentTarget.value)}  required data-cy='job-level-input'>
                    <option value="" disabled>Job Level</option>
                    <option value="Agent">Agent</option>
                    <option value="Supervisor">Supervisor</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* DROPDOWN QUEUE */}
            <div className="self-stretch rounded-3xs bg-tertiary box-border flex flex-row items-start justify-start pt-[15.600000000000364px] px-[21px] pb-2.5 relative max-w-full border-[1px] border-solid border-marco">
              <div className="h-[42.6px] w-[590px] relative rounded-3xs bg-tertiary box-border hidden max-w-full border-[1px] [border-none] border-marco" />
              <div className="relative flex-1">
                <div className="custom-select-wrapper">
                  <select className="custom-select drop-down" value={agentType} onChange={(event) => setAgentType(event.currentTarget.value)} required data-cy='agent-type-input' >
                  <option value="" disabled>
                    Agent Type
                  </option>
                  <option value="cef57a3d-e69c-410f-a52a-511cdd89664b">Flight Managment</option>
                  <option value="0de58771-443e-461c-bb5d-3999dea7dfb6">Website Assistance</option>
                  <option value="10700746-2ca6-4e5f-a882-4c274cd1e2b4">Customer Care</option>
                  <option value="ce4292ed-d0e1-46a5-a0b5-966c4315e429">Other Questions</option>
                  <option value="2d25f6a6-a8c9-4cf3-aacb-ad3338c699fc">Special Assistance</option>
                  <option value="ac2bd63f-1865-4bc6-821f-36f2dbd19ecc">Travel Information</option>
                  </select>
                </div>
              </div>
            </div>

            {/* profile picture */}
            <div className="self-stretch rounded-3xs bg-tertiary box-border flex flex-row items-start justify-start pt-[15px] px-5 pb-[9.600000000000364px] max-w-full border-[1px] border-solid border-marco"
            onClick={handleContainerClick} style={{cursor:'pointer'}}>
              <div className="color: #9CA3AF;h-[42.6px] w-[590px] relative rounded-3xs bg-tertiary box-border hidden max-w-full [border:none]" 
              style={{color:'#9CA3AF' }}/>
              <label className="mr-4" htmlFor="profilePictureInput" style={{ color: fileLabelColor }}>{fileLabel}</label>
              <input 
                id ="profilePictureInput" 
                onChange={handleFileChange} 
                type="file" 
                accept="image/*"
                className="file-input"
                style={{ display: 'none' }}>
              </input>
                <FaUpload className="upload-icon" />
            </div>
            <p style={{ color: 'gray', fontSize: '12px', margin: '0' }}>Accepted files: .png </p>
            <div className="self-stretch rounded-3xs bg-tertiary box-border flex flex-row items-start justify-start pt-[15.5px] px-[19.699999999999815px] pb-[10.100000000000364px] max-w-full border-[1px] border-solid border-marco justify-center">
            {previewUrl ? (
                  <img src={previewUrl} alt="Preview" className="max-w-full max-h-64" />
                ) : (
                  <img src="/default-image.png" alt="Image Preview" className="max-w-full max-h-64" />
                )}
            </div>

            {/* button */}
            <div className="self-stretch flex flex-row items-start justify-center py-0 pr-5 pl-[30px] mt-[2%]">
              <button
                type="submit"
                className="cursor-pointer [border:none] py-2.5 px-5 bg-primary w-[300px] rounded-3xs flex flex-row items-start justify-center box-border hover:bg-[#4A8B51]"
                data-cy="submit-button"
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
              className="absolute h-[80%]"
              alt=""
              src="/signup_blurb.png"
            />
          </div>
        </div>

      </main>

    </div>
  );
};

export default SignUp;