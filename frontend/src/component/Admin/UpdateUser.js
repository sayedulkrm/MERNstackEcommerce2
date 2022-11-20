import React, { Fragment, useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import MetaData from '../layout/MetaData';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PersonIcon from '@mui/icons-material/Person';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import Slidebar from './Slidebar';
import { useNavigate, useParams } from 'react-router-dom';
import { UPDATE_USER_RESET } from '../../constants/userConstants';
import { getUserDetails, updateUser,clearErrors } from '../../action/userAction';
import Loader from '../layout/Loader/Loader';







const UpdateUser = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();



    const { loading, error, user } = useSelector((state) => state.userDetails);

    const { loading: updateLoading, error:updateError, isUpdated } = useSelector((state) => state.profile);



    const userId = params.id;

    const [name, setName ] = useState("");
    const [email, setEmail] = useState("");
    const [ role, setRole ] = useState("");

    useEffect(() => {

        if(user && user._id !== userId) {
            dispatch(getUserDetails(userId));
        } else {
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
        }

        if(error) {
            toast.error(error,{
                position: "bottom-center",
                theme: "dark"
            });
            dispatch(clearErrors());
        }


        if(updateError) {
            toast.error(error,{
                position: "bottom-center",
                theme: "dark"
            });
            dispatch(clearErrors());
        }


        if(isUpdated) {
            toast.success("User Updated Successfully",{
                position: "bottom-center",
                theme: "dark"
            });
            navigate("/admin/users");
            dispatch({ type: UPDATE_USER_RESET })
        }

    }, [dispatch, error, navigate, isUpdated, updateError, user, userId]);


    const updateUserSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("role", role);

        dispatch(updateUser(userId, myForm));

    };




    return (
        <Fragment>
            <MetaData title="Update User -- Admin" />
            <div className="dashboard">
                <Slidebar />
                <div className="newProductContainer">
                    {loading ? ( <Loader /> )
                    :
                    <form className="createProductForm"
                        onSubmit={updateUserSubmitHandler}
                    >
                        <h1>Update User</h1>

                        <div>
                            <PersonIcon />
                            <input type="text" 
                                placeholder='Name'
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div>
                            <MailOutlineIcon />
                            <input type="email" 
                                placeholder='Email'
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <VerifiedUserIcon />
                            <select 
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            >
                                <option value="">Choose Role</option>
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                            
                            </select>
                        </div>



                        <Button
                            id='createProductBtn'
                            type='submit'
                            disabled={updateLoading ? true : false || role === "" ? true : false}
                        
                        >
                            Update
                        </Button>

                    </form>
                    }
                </div>
            </div>
        </Fragment>
    );
};


export default UpdateUser;