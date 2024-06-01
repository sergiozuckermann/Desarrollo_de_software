import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { AuthContextType } from "../utils/interfaces";

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
  };

  