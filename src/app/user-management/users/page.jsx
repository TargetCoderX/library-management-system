"use client";
import AuthLayout from '@/app/layouts/AuthLayout';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function Users() {
    const [roles, setroles] = useState(null);
    const router = useRouter();
    const [selectedRole, setselectedRole] = useState('Administrator');
    const [allUsers, setallUsers] = useState(null);
    const [apiUsers, setapiUsers] = useState(null);
    const [newUserData, setnewUserData] = useState({
        "first_name": '',
        "last_name": '',
        "dob": '',
        "gender": '',
        "email": '',
        "phone": '',
        "address": '',
        "card_number": '',
        "role_type": "",
        "start_date": new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
        "id_card": '',
    });

    useEffect((e) => {
        setnewUserData({ ...newUserData, 'role_type': selectedRole })
    }, [selectedRole])

    const changeNewUserInput = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        if (name !== 'id_card')
            setnewUserData({ ...newUserData, [name]: value })
        else
            setnewUserData({ ...newUserData, [name]: e.target.files[0] })

    }

    useEffect(() => {
        getRoles();
        getAllUsers();
    }, []);

    const getRoles = async () => {
        try {
            let response = await axios.get('/api/routes/user-management-api/role-management', {
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": Cookies.get('token')
                }
            })
            setroles(response.data.roles);
        } catch (error) {
            if (error.response.status === 401) {
                return router.push('/login');
            }
        }
    }

    const getAllUsers = async () => {
        let response = await axios.get('/api/routes/user-management-api/users', {
            headers: {
                Authorization: Cookies.get('token'),
            }
        })
        setapiUsers(response.data);
        filterUser(response.data, selectedRole)
    }

    const filterUser = (data, role_name) => {
        let flag = false;
        data.forEach(element => {
            if (element._id.toLowerCase() == role_name.toLowerCase()) {
                flag = true;
                setallUsers(element.users);
            }
            if (flag == false) {
                setallUsers([]);
            }
        });
    }

    const newUserCreation = async (e) => {
        e.preventDefault();
        let formData = new FormData();
        Object.keys(newUserData).forEach((key) => {
            formData.append(key, newUserData[key])
        })
        const response = await axios.post('/api/routes/user-management-api/users', formData, {
            headers: {
                "Content-Type": 'multipart/form-data',
                Authorization: Cookies.get('token'),
            }
        })
        if (response.data.status == 1)
            toast.success(response.data.message)
        else
            toast.error(response.data.message)

        setnewUserData({
            "first_name": '',
            "last_name": '',
            "dob": '',
            "gender": '',
            "email": '',
            "phone": '',
            "address": '',
            "card_number": '',
            "role_type": "",
            "start_date": new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
            "id_card": '',
        });
        document.querySelector('.close_modal').click();
    }

    return (
        <AuthLayout>
            <ul className="nav nav-tabs" id="myTab" role="tablist">
                {roles && roles.map((element, index) => (
                    <li className="nav-item" role="presentation">
                        <button className={`nav-link ${index == 0 ? 'active' : ''}`} id={element._id} data-bs-toggle="tab" data-bs-target={`#tab_pane_${element._id}`} type="button" role="tab" aria-controls={`tab_pane_${element._id}`} onClick={() => { setselectedRole(element.role_name), filterUser(apiUsers, element.role_name) }} aria-selected="true">{element.role_name}</button>
                    </li>
                ))}
            </ul>
            <div className="tab-content" id="myTabContent" style={{ borderColor: 'transparent' }}>
                {roles && roles.map((element, index) => (
                    <div className={`tab-pane fade ${index == 0 ? 'show active' : ''}`} id={`tab_pane_${element._id}`} role="tabpanel" aria-labelledby={element._id} tabindex="0">
                        <div className="row">
                            <div className="col-md-12 text-end m-2">
                                <button onClick={(e) => { setselectedRole(element.role_name) }} className="btn btn-primary text-uppercase btn-sm" data-bs-toggle="modal" data-bs-target="#userAdderUpdaterModal">
                                    <i className='fa fa-plus me-2'></i>
                                    Add {element.role_name}
                                </button>
                            </div>
                        </div>
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>DOB</th>
                                        <th>Gender</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Address</th>
                                        <th>Card Number</th>
                                        <th>Date of Join</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allUsers && allUsers.map((element) => (
                                        <tr>
                                            <td>{element.first_name} {element.last_name}</td>
                                            <td>{element.dob}</td>
                                            <td>{element.gender.toUpperCase()}</td>
                                            <td>{element.email}</td>
                                            <td>{element.phone}</td>
                                            <td>{element.address}</td>
                                            <td>{element.card_number}</td>
                                            <td>{element.start_date}</td>
                                            <td>
                                                <button className="btn btn-danger btn-sm">Delete</button>
                                            </td>
                                        </tr>

                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}
            </div>
            <div class="modal fade" id="userAdderUpdaterModal" tabindex="-1" aria-labelledby="userAdderUpdaterModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-xl">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="userAdderUpdaterModalLabel">Add {selectedRole}</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form className='forms-sample' id='newuserCreationForm' name='newuserCreationForm' onSubmit={(e) => { newUserCreation(e) }}>
                                <div className="row">
                                    <div className="col-3 form-group">
                                        <label htmlFor="" className="">First Name</label>
                                        <input required onChange={(e) => { changeNewUserInput(e) }} type="text" value={newUserData.first_name} name='first_name' placeholder='Jone' className="form-control" />
                                    </div>
                                    <div className="col-3 form-group">
                                        <label htmlFor="" className="">Last Name</label>
                                        <input required onChange={(e) => { changeNewUserInput(e) }} type="text" value={newUserData.last_name} name='last_name' placeholder='Doe' className="form-control" />
                                    </div>
                                    <div className="col-3 form-group">
                                        <label htmlFor="" className="">Date Of Birth</label>
                                        <input required onChange={(e) => { changeNewUserInput(e) }} type="text" name='dob' value={newUserData.dob} placeholder='DD-MM-YYYY' className="form-control" />
                                    </div>
                                    <div className="col-3 form-group">
                                        <label htmlFor="" className="">Gender</label>
                                        <select required onChange={(e) => { changeNewUserInput(e) }} name="gender" className="form-control" value={newUserData.gender}>
                                            <option value="" style={{ display: 'none' }}>Select Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female" >Female</option>
                                            <option value="others" >Others</option>
                                        </select>
                                    </div>
                                    <div className="col-3 form-group">
                                        <label htmlFor="" className="">Email</label>
                                        <input required onChange={(e) => { changeNewUserInput(e) }} type="email" name='email' value={newUserData.email} placeholder='test@email.com' className="form-control" />
                                    </div>
                                    <div className="col-3 form-group">
                                        <label htmlFor="" className="">Phone</label>
                                        <input required onChange={(e) => { changeNewUserInput(e) }} type="number" name='phone' value={newUserData.phone} placeholder='12345678' min={1} className="form-control" />
                                    </div>
                                    <div className="col-3 form-group">
                                        <label htmlFor="" className="">Address</label>
                                        <input required onChange={(e) => { changeNewUserInput(e) }} type="text" name='address' value={newUserData.address} placeholder='Address' className="form-control" />
                                    </div>
                                    {selectedRole === 'Member' && (
                                        <div className="col-3 form-group">
                                            <label htmlFor="" className="">Card Number</label>
                                            <input required onChange={(e) => { changeNewUserInput(e) }} type="text" readOnly name='card_number' value={newUserData.card_number} placeholder='12345678' className="form-control" />
                                        </div>
                                    )}
                                    <div className="col-3 form-group">
                                        <label htmlFor="" className="">Role Type</label>
                                        <input required onChange={(e) => { changeNewUserInput(e) }} type="text" value={newUserData.role_type} name='role_type' readOnly className="form-control" />
                                    </div>
                                    <div className="col-3 form-group">
                                        <label htmlFor="" className="">Start Date</label>
                                        <input required onChange={(e) => { changeNewUserInput(e) }} type="text" value={newUserData.start_date} name='start_date' readOnly className="form-control" />
                                    </div>
                                    {selectedRole === 'Member' && (
                                        <div className="col-3 form-group">
                                            <label htmlFor="" className="">Identity Card Image</label>
                                            <input required onChange={(e) => { changeNewUserInput(e) }} type="file" name="id_card" id="id_card" className="form-control" />
                                        </div>
                                    )}
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary btn-sm close_modal" data-bs-dismiss="modal">Close</button>
                            <button type="submit" form='newuserCreationForm' class="btn btn-primary btn-sm">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
}

export default Users;
