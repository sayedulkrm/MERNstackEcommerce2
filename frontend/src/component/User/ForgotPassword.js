import React, { Fragment, useState, useEffect } from 'react';

import Loader from '../layout/Loader/Loader';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import "./ForgotPassword.css";
import { toast } from 'react-toastify';

import { useDispatch, useSelector } from 'react-redux';
import { clearErrors,forgotPassword } from '../../action/userAction';

import MetaData from '../layout/MetaData';





const ForgotPassword = () => {




    const dispatch = useDispatch();

    const { error, message, loading } = useSelector(state => state.forgotPassword);

    const [email, setEmail] = useState("");




    const forgotPasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set( "email", email );
        dispatch(forgotPassword(myForm));

    };




    useEffect(() => {



        if(error){
            toast.error(error,{
                position:"bottom-center",
                theme:"colored"
            });
            dispatch(clearErrors());
        }



        if(message){
            toast.success(message,{
                position: "bottom-center",
                theme: "dark"
            });




        }

    }, [dispatch, error, message]);







    return (
        <Fragment>
        {loading ? <Loader /> : 

                    <Fragment>
                    <MetaData title="Forgot Password " />
                        <div className="forgotPasswordContainer">
                            <div className="forgotPasswordBox"> 

                                <h2 className='forgotPasswordheading'>Forgot Password</h2>

                                <form className="forgotPasswordForm"  onSubmit={forgotPasswordSubmit}>
                                    

                                    <div className="forgotPasswordEmail">
                                        <MailOutlineIcon />
                                        <input type="email" placeholder='Email' required name='email' value={email} onChange={(e)=> setEmail(e.target.value)} />
                                    </div>

                                    

                                    <input type="submit" value="Send" className='forgotPasswordBtn' />
                                    

                                </form>
                            
                            </div>
                        </div>
                    </Fragment>
        }
    </Fragment>
    )
}

export default ForgotPassword