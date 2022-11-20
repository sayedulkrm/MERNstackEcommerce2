import React, { Fragment, useState, useEffect } from 'react';
import {  useNavigate, useParams } from 'react-router-dom';
import Loader from '../layout/Loader/Loader';
import "./ResetPassword.css";
import { toast } from 'react-toastify';

import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, resetPassword } from '../../action/userAction';
import MetaData from '../layout/MetaData';
import LockOpen from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';





const RestPassword = ( ) => {


    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {token} = useParams();



    
    

    const { error, success, loading } = useSelector(state => state.forgotPassword);



    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");




    const resetPasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();
        

        myForm.set( "password", password );
        myForm.set( "confirmPassword", confirmPassword );
        dispatch(resetPassword( token , myForm ));

    };



    useEffect(() => {



        if(error){
            toast.error(error,{
                position:"bottom-center",
                theme:"dark"
            });
            dispatch(clearErrors());
        }



        if(success){
            toast.success("Password Updated Successfully",{
                position: "bottom-center",
                theme: "dark"
            });

            navigate("/login");




        }

    }, [dispatch, error, success, navigate]);












    return (
        <Fragment>
                    {loading ? <Loader /> : 

                    <Fragment>
                    <MetaData title="Change Password" />
                        <div className="resetPasswordContainer">
                            <div className="resetPasswordBox"> 

                                <h2 className='resetPasswordheading'>Update Profile</h2>

                                <form className="resetPasswordForm"  onSubmit={resetPasswordSubmit}>



                                    <div>
                                    <LockOpen />

                                    <input type="password" 
                                            placeholder='New Password' 
                                            required  
                                            value={password} 
                                            onChange={(e) => setPassword(e.target.value)} 
                                    />

                                    </div>


                                    <div>
                                    <LockIcon />

                                    <input type="password" 
                                            placeholder='Confirm Password' 
                                            required 
                                            value={confirmPassword} 
                                            onChange={(e) => setConfirmPassword(e.target.value)} 
                                    />

                                    </div>

                                    

                                    <input type="submit" value="Update" className='resetPasswordBtn' />
                                    

                                </form>
                            
                            </div>
                        </div>
                    </Fragment>
        }
    </Fragment>
    )

}


export default RestPassword;