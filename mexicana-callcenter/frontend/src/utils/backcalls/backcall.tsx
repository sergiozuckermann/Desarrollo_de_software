import axios from "axios";
//import { createContext, FunctionComponent, PropsWithChildren } from "react";
//import { useNavigate } from "react-router-dom";
//import { AuthContextType, Credentials } from "../utils/interfaces";
//import useCustomToast from "../components/notificationComponent";

const baseUrl = 'http://localhost:3000'

//export const AuthContext = createContext<AuthContextType | null>(null);
export const metricData = async () => { 
  return axios.get(`${baseUrl}/supervisor/ongoingcalls`)
  .then(res => {

    if(res.status === 200) {
      const { name } = res.data;

    }
  })
  .catch(error =>  {
    //check if there was an error logging in and notify the user
    console.log(error)
  }
  )
}
