import {Navigate} from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({children,allowedRole}){
    console.log(useAuth());
    const {user,role}=useAuth();
    if(!user){
        return <Navigate to='/login' replace/>
    }
    if( allowedRole &&  allowedRole=='recruiter' &&  role=='student' ){
        return <Navigate to='/' replace/>
    }
    return children
}
