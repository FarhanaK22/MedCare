"use client"
import React from "react";
import { useState ,useContext ,createContext , ReactNode} from "react";

interface AdminContextType {
    isAdmin : boolean,
    setIsAdmin : (value : boolean) => void;
}
const validAdminContext = createContext<AdminContextType  | undefined>(undefined)

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
  
  return (
    <validAdminContext.Provider value={{ isAdmin, setIsAdmin }}>
      {children}
    </validAdminContext.Provider>
  );
};
export const useAdminContext = () => {
    const context = useContext(validAdminContext);
    if (!context) {
      throw new Error("useAdminContext must be used within an AdminProvider");
    }
    return context;
  };