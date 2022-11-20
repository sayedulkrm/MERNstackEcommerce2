import React, { Fragment, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import "./ProductList.css";
import { useDispatch, useSelector } from 'react-redux';

import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from '@mui/material';
import MetaData from '../layout/MetaData';
import Slidebar from './Slidebar';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getAllUsers, clearErrors, deleteUser } from '../../action/userAction';
import { DELETE_USER_RESET } from '../../constants/userConstants';
import Loader from '../layout/Loader/Loader';





const UsersList = () => {


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { error, users, loading } = useSelector((state) => state.allUsers);

    const { error: deleteError, isDeleted, message } = useSelector((state) => state.profile)


    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id));
    };




    useEffect(() => {

        if(error) {
            toast.error(error,{
                position: "bottom-center",
                theme: "dark"
            });
            dispatch(clearErrors());
        }


        if(deleteError) {
            toast.error(deleteError,{
                position: "bottom-center",
                theme: "dark"
            });
            dispatch(clearErrors());
        }

        if(isDeleted) {
            toast.success(message,{
                position: "bottom-center",
                theme: "dark"
            });
            navigate("/admin/users");
            dispatch({ type: DELETE_USER_RESET });
        }


        dispatch(getAllUsers());

    }, [error, dispatch, deleteError, isDeleted, navigate, message])
    




    const columns = [
        { field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },


        {
            field: "email",
            headerName: "Email",
            minWidth: 200,
            flex: 1,
        },


        {
            field: "name",
            headerName: "Name",
            minWidth: 150,
            flex: 0.5,
        },

        {
            field: "role",
            headerName: "Role",
            minWidth: 150,
            flex: 0.3,
            cellClassName: (params) => {
                return params.getValue(params.id, "role") === "admin"
                ? "greenColor"
                : "redColor" ;
            }
        },

        {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 150,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <Fragment>
                        <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>

                            <EditIcon />

                        </Link>


                        <Button onClick={ ()=> deleteUserHandler(params.getValue(params.id, "id"))}>
                            <DeleteIcon />
                        </Button>




                    </Fragment>
                );
            },
        },


    ];




    const rows = [];

    users && users.forEach((item) => {
        rows.push({
            id: item._id,
            role: item.role,
            email: item.email,
            name: item.name,
        });
    });



    return (
        <Fragment>
            <MetaData title={`ALL USERS - ADMIN`} />
            <div className="dashboard">
                <Slidebar />

                <div className="productListContainer">
                    <h1 id="productListHeading">ALL USERS</h1>

                    {
                        loading ? ( <Loader /> )
                        :
                        <DataGrid 

                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        className='productListTable'
                        autoHeight
                    />
                    }
                </div>
            </div>
        </Fragment>
    );
};


export default UsersList