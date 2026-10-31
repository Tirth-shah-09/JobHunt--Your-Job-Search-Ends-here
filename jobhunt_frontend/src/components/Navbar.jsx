import {Link,useNavigate} from 'react-router-dom';
import { useAuth} from '../context/AuthContext';
import {logoutuser} from '../api/authApi.js'

export default function Navbar(){
    let {user,logout,role}=useAuth();
    const navigate=useNavigate();

    const handleLogout=async()=>{
        try {
            await logoutUser();
            logout();
            navigate('/login');
        } catch (error) {
            console.log('Logout failed',error);
        }
    }
    return (
        <nav className='bg-white shadow-sm border-b border-gray-200'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center'>
                <Link to='/' className='text-2xl font-bold text-indigo-600'>JobHunt</Link>
                <div className='flex items-center space-x-6'>
                   {user?(
                    <>
                    {role=='student' && (
                        <>
                        <Link to='/jobs' className='text-gray-600 hover:text-indigo-600'>Jobs</Link>
                        <Link to='/applied-jobs' className='text-gray-600 hover:text-indigo-600'>My Applications</Link>
                        </>
                    )}
                    {role=='recruiter' && (
                        <>
                        <Link to='/recruiter/dashboard' className='text-gray-600 hover:text-indigo-600'>Dashborad</Link>
                        <Link to='/recruiter/jobs' className='text-gray-600 hover:text-indigo-600'>My Jobs</Link>
                        <Link to='/recruiter/company' className='text-gray-600 hover:text-indigo-600'>Company</Link>
                        </>
                    )}
                    <Link to='/profile' className='text-gray-600 hover:text-indigo-600'>Profile</Link>
                    <button onClick={handleLogout} className='bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-100'>
                        Logout
                    </button>
                    </> 
                   ):(
                    <>
                    <Link to='/login' className='text-gray-400 hover:text-indigo-600 font-medium'>Login</Link>
                    <Link to='/register' className='bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700'>
                    Register
                    </Link>
                    </>
                   )}
                </div>
            </div>
        </nav>
    )
}