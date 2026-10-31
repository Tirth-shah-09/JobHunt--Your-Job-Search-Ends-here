import { createContext,useContext,useState,useEffect } from "react";

const AuthContext=createContext()

export const AuthProvider=({children})=>{
    const [user,setUser]=useState(()=>{
      const savedUser=localStorage.getItem('jobhunt_user');
      return savedUser? JSON.parse(savedUser):null
    })


const login=(userData)=>{
    setUser(userData);
    localStorage.setItem('jobhunt_user',JSON.stringify(userData))
}
const logout=()=>{
    setUser(null);
    localStorage.removeItem('jobhunt_user')
}
 return (
    <AuthContext.Provider value={{user,login,logout,role:user?.role}}>
        {children}
    </AuthContext.Provider>
 )
}

export const useAuth=()=>{return useContext(AuthContext)};