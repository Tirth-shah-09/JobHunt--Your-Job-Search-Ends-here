import {useState} from 'react';
import { useNavigate,Link } from 'react-router-dom';
import { registerUser } from '../api/authApi';


const Register = () => {
  const [formData,setFormData]=useState({
    fullName:'',
    email:'',
    phoneNumber:'',
    password:'',
    role:'',
    file:null
  })
  const [error,setError]=useState('');
  const  navigate=useNavigate()
  const handleChange=(e)=>{
    const {name,value,files}=e.target;
    setFormData({...formData,[name]:files?files[0]:value})
  }

  const handleSubmit=async(e)=>{
    e.preventDefault()
    const data=new FormData();
    Object.keys(formData).forEach((key)=>data.append(key,formData[key]))

    try {
      await registerUser(data);
      navigate('/login');
    } catch (error) {
      console.log(error )
      setError(error.response?.data?.message || 'registation failed');
    }
  }
  return (
    <div className='min-h-[85vh] flex items-center justify-center px-4 py-8'>
      <div className='max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-gray-200'>
        <h2 className='text-2xl font-bold text-center mb-6 text-gray-900'>Create Account</h2>
        {error && <div className='bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4'>{error} </div>}
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input type="text" name='fullName' onChange={handleChange} required className='w-full border border-gray-300 rounded-lg px-3 py-2' />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700 mv-1'>Email</label>
            <input type="email" name='email' onChange={handleChange} required className='w-full border border-gray-300 rounded-lg px-3 py-2'  />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Phone Number</label>
            <input type="number" name='phoneNumber' onChange={handleChange} required className='w-full border border-gray-300 rounded-lg px-3 py-2'  />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Password</label>
            <input type="password" name='password' onChange={handleChange} required className='w-full border border-gray-300 rounded-lg px-3 py-2' />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Role</label>
            <select name="role" value={formData.role} onChange={handleChange} className='w-full border border-gray-300 rounded-lg px-3 py-2'>
              <option value="" disabled>-- Select a Role --</option> 
              <option value="student">Student</option>
              <option value="recruiter">Recruiter</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Profile/Resume File</label>
            <input type="file" name='file' onChange={handleChange} className='w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100' />

          </div>
          <button type='submit' className='w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700'>Register</button>
        </form>
        <p className='text-sm text-center text-gray-600 mt-4 '>Already have an Account?</p>
      </div>  
    </div>
  )
}

export default Register
