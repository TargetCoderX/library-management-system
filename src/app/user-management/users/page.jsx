"use client";
import AuthLayout from '@/app/layouts/AuthLayout';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

function Users() {
    const [roles, setroles] = useState(null);
    const router = useRouter();
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
            <div className="tab-content" id="myTabContent" style={{borderColor:'transparent'}}>
                {roles && roles.map((element, index) => (
                    <div className={`tab-pane fade ${index == 0 ? 'show active' : ''}`} id={`tab_pane_${element._id}`} role="tabpanel" aria-labelledby={element._id} tabindex="0">
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
        </AuthLayout>
    );
}

export default Users;
