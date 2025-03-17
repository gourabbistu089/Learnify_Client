import React, { useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { resetPassword } from '../services/apiCalls/authCall';

function UpdatePassword() {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const token = location.pathname.split("/").pop();
    const {loading} = useSelector((state) => state.auth);
    const [showPassword , setShowPassword] = useState(false);
    const [showConfirmPassword , setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    });

    const handleOnChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const handleOnSubmit = (e)=>{
        e.preventDefault();
        console.log(formData, "token", token);
        dispatch(resetPassword(formData.password , formData.confirmPassword,token , navigate));

    }
  return (
    <div className=' text-white'>
        {
        loading ? <div>Loading...</div> : 
        <div>
            <h1>Choose New Password</h1>
            <p>Almost done, just enter your new password below</p>

            <form onSubmit={handleOnSubmit}>
                <label>
                    <p>New Password <span>*</span></p>

                    <input 
                    type={showPassword ? "text" : "password"}
                    name='password'
                    required
                    className=' bg-richblack-700 text-white w-full p-6 rounded-md'
                    placeholder='Enter your new password'
                    value={formData.password}
                    onChange={handleOnChange}
                    />
                    <span>
                        {
                            showPassword ? (
                                <AiFillEyeInvisible onClick={() => setShowPassword(!showPassword)} />
                            ) : (
                                <AiFillEye onClick={() => setShowPassword(!showPassword)} />
                            )
                        }
                    </span>
                </label>

                <label>
                    <p>Confirm Password <span>*</span></p>

                    <input 
                    type={showConfirmPassword ? "text" : "password"}
                    name='confirmPassword'
                    required
                    placeholder='Enter your new password'
                    value={formData.confirmPassword}
                     className=' bg-richblack-700 text-white w-full p-6 rounded-md'
                    onChange={handleOnChange}
                    />
                    <span>
                        {
                            showConfirmPassword ? (
                                <AiFillEyeInvisible onClick={() => setShowConfirmPassword(!showConfirmPassword)} />
                            ) : (
                                <AiFillEye onClick={() => setShowConfirmPassword(!showConfirmPassword)} />
                            )
                        }
                    </span>
                </label>

                <button type='submit'>Update Password</button>

            </form>

            <div>
                    <Link to="/login">
                      <p>Back to Login</p> 
                    </Link>
                  </div>
        </div>
        }
    </div>
  )
}

export default UpdatePassword