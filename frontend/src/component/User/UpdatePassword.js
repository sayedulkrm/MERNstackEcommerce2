import React, { Fragment, useState, useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import Loader from '../layout/Loader/Loader';
import "./UpdatePassword.css";
import { toast } from 'react-toastify';

import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, updatePassword } from '../../action/userAction';
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants';
import MetaData from '../layout/MetaData';
import LockOpen from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import VpnKeyIcon from '@mui/icons-material/VpnKey';







const UpdatePassword = () => {



    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { error, isUpdated, loading } = useSelector(state => state.profile);



    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");




    const updatePasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set( "oldPassword", oldPassword );
        myForm.set( "newPassword", newPassword );
        myForm.set( "confirmPassword", confirmPassword );
        dispatch(updatePassword(myForm));

    };



    useEffect(() => {



        if(error){
            toast.error(error,{
                position:"bottom-center",
                theme:"colored"
            });
            dispatch(clearErrors());
        }



        if(isUpdated){
            toast.success("Password Updated Successfully",{
                position: "bottom-center",
                theme: "dark"
            });

            navigate("/account");


            dispatch({
                type: UPDATE_PASSWORD_RESET,
            });



        }

    }, [dispatch, error, isUpdated, navigate]);












    return (
        <Fragment>
        {loading ? <Loader /> : 

                    <Fragment>
                    <MetaData title="Change Password" />
                        <div className="updatePasswordContainer">
                            <div className="updatePasswordBox"> 

                                <h2 className='updatePasswordheading'>Update Profile</h2>

                                <form className="updatePasswordForm"  onSubmit={updatePasswordSubmit}>

                                    <div className="signUpPassword">
                                    <VpnKeyIcon />

                                    <input type="password" 
                                            placeholder='Old Password' 
                                            required 
                                            value={oldPassword} 
                                            onChange={(e) => setOldPassword(e.target.value)} 
                                    />

                                    </div>


                                    <div className="signUpPassword">
                                    <LockOpen />

                                    <input type="password" 
                                            placeholder='New Password' 
                                            required  
                                            value={newPassword} 
                                            onChange={(e) => setNewPassword(e.target.value)} 
                                    />

                                    </div>


                                    <div className="signUpPassword">
                                    <LockIcon />

                                    <input type="password" 
                                            placeholder='Confirm Password' 
                                            required 
                                            value={confirmPassword} 
                                            onChange={(e) => setConfirmPassword(e.target.value)} 
                                    />

                                    </div>

                                    

                                    <input type="submit" value="Change" className='updatePasswordBtn' />
                                    

                                </form>
                            
                            </div>
                        </div>
                    </Fragment>
        }
    </Fragment>
    )
}

export default UpdatePassword;