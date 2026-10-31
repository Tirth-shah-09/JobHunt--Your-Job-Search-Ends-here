import { useState } from "react";
import {useNavigate,Link} from 'react-router-dom'
import {loginUser} from '../api/authApi.js'
import {useAuth} from '../context/AuthContext.jsx'

export default function Login(){
    const [email,setEmail]=useState(' ')
    const [password,setPassword]=useState('');
    const [role, setRole] = useState("student");
    const [error,setError]=useState('');
    const {login}=useAuth();
    const navigate=useNavigate();

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            const data=await loginUser({email,password,role})
            login(data.user);
            navigate(data.user.role==='recruiter'?'/recruiter/dashboard' : 'jobs')
        } catch (error) {
            console.log(error)
            setError(error.response?.data?.message || 'Login Failed');
        }
    };
    return(
        <div className="min-h-[80vh] flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-gray-200">

                <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">
                    Login To JobHunt
                </h2>

                {error && (
                    <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    {/* Role */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Login as
                        </label>

                        <div className="flex gap-6">

                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={role === "student"}
                                    onChange={(e) => setRole(e.target.value)}
                                    className="text-indigo-600 focus:ring-indigo-500"
                                />
                                <span className="text-sm text-gray-700">
                                    Student
                                </span>
                            </label>

                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={role === "recruiter"}
                                    onChange={(e) => setRole(e.target.value)}
                                    className="text-indigo-600 focus:ring-indigo-500"
                                />
                                <span className="text-sm text-gray-700">
                                    Recruiter
                                </span>
                            </label>

                        </div>
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700"
                    >
                        Login
                    </button>

                </form>
                <div className="flex justify-center">
                <Link to='/register' className="text-sm text-center text-gray-400 mt-4 ">
                    Don't have an account?
                </Link>
                </div>

            </div>
        </div>
    )
}