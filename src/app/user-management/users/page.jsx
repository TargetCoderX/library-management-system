"use client";
import AuthLayout from '@/app/layouts/AuthLayout';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

function Users() {
    const [roles, setroles] = useState(null);
    const router = useRouter();
    const [selectedRole, setselectedRole] = useState('');
    useEffect(() => {
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
        getRoles();
    }, []);
    return (
        <AuthLayout>
            <ul className="nav nav-tabs" id="myTab" role="tablist">
                {roles && roles.map((element, index) => (
                    <li className="nav-item" role="presentation">
                        <button className={`nav-link ${index == 0 ? 'active' : ''}`} id={element._id} data-bs-toggle="tab" data-bs-target={`#tab_pane_${element._id}`} type="button" role="tab" aria-controls={`tab_pane_${element._id}`} aria-selected="true">{element.role_name}</button>
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
                                        <th>Profile</th>
                                        <th>VatNo.</th>
                                        <th>Created</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Jacob</td>
                                        <td>53275531</td>
                                        <td>12 May 2017</td>
                                        <td><label class="badge badge-danger">Pending</label></td>
                                    </tr>
                                    <tr>
                                        <td>Messsy</td>
                                        <td>53275532</td>
                                        <td>15 May 2017</td>
                                        <td><label class="badge badge-warning">In progress</label></td>
                                    </tr>
                                    <tr>
                                        <td>John</td>
                                        <td>53275533</td>
                                        <td>14 May 2017</td>
                                        <td><label class="badge badge-info">Fixed</label></td>
                                    </tr>
                                    <tr>
                                        <td>Peter</td>
                                        <td>53275534</td>
                                        <td>16 May 2017</td>
                                        <td><label class="badge badge-success">Completed</label></td>
                                    </tr>
                                    <tr>
                                        <td>Dave</td>
                                        <td>53275535</td>
                                        <td>20 May 2017</td>
                                        <td><label class="badge badge-warning">In progress</label></td>
                                    </tr>
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
                            <form className='forms-sample'>
                                <div className="row">
                                    <div className="col-3 form-group">
                                        <label htmlFor="" className="">First Name</label>
                                        <input type="text" name='first_name' placeholder='Jone' className="form-control" />
                                    </div>
                                    <div className="col-3 form-group">
                                        <label htmlFor="" className="">Last Name</label>
                                        <input type="text" name='last_name' placeholder='Doe' className="form-control" />
                                    </div>
                                    <div className="col-3 form-group">
                                        <label htmlFor="" className="">Date Of Birth</label>
                                        <input type="text" name='dob' placeholder='DD-MM-YYYY' className="form-control" />
                                    </div>
                                    <div className="col-3 form-group">
                                        <label htmlFor="" className="">Gender</label>
                                        <select name="gender" className="form-control">
                                            <option value="" style={{ display: 'none' }}>Select Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female" >Female</option>
                                            <option value="others" >Others</option>
                                        </select>
                                    </div>
                                    <div className="col-3 form-group">
                                        <label htmlFor="" className="">Email</label>
                                        <input type="email" name='email' placeholder='test@email.com' className="form-control" />
                                    </div>
                                    <div className="col-3 form-group">
                                        <label htmlFor="" className="">Phone</label>
                                        <input type="number" name='phone' placeholder='12345678' className="form-control" />
                                    </div>
                                    <div className="col-3 form-group">
                                        <label htmlFor="" className="">Address</label>
                                        <input type="text" name='address' placeholder='Address' className="form-control" />
                                    </div>
                                    <div className="col-3 form-group">
                                        <label htmlFor="" className="">Card Number</label>
                                        <input type="text" readOnly name='card_number' placeholder='12345678' className="form-control" />
                                    </div>
                                    <div className="col-3 form-group">
                                        <label htmlFor="" className="">Role Type</label>
                                        <input type="text" name='role_type' value={selectedRole} readOnly className="form-control" />
                                    </div>
                                    <div className="col-3 form-group">
                                        <label htmlFor="" className="">Start Date</label>
                                        <input type="text" name='start_date' value={new Date().toLocaleDateString('en-IN', {day:'numeric',month:'long',year:'numeric'})} readOnly className="form-control" />
                                    </div>
                                    <div className="col-3 form-group">
                                        <label htmlFor="" className="">Identity Card Image</label>
                                        <input type="file" name="id_card" id="id_card" className="form-control" />
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary btn-sm">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
}

export default Users;
