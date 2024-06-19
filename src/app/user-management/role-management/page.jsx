"use client";
import AuthLayout from '@/app/layouts/AuthLayout';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';

function Rolemanagement() {
    const [RoleAdderEditorForm, setRoleAdderEditorForm] = useState({ role_name: '', role_description: '', role_id: '' });
    const [error, seterror] = useState("");
    const [roles, setroles] = useState([]);
    const router = useRouter();
    const submitRoleAddereditor = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`/api/routes/user-management-api/role-management`, RoleAdderEditorForm, {
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": Cookies.get('token')
                }
            })
            if (response.data.status == 0) {
                seterror(response.data.message);
            } else {
                document.getElementById('closeButtonModal').click();
                setroles(response.data.roles);
                roleModal();
            }

        } catch (error) {
            if (error.response.status === 401)
                return router.push('/login');
        }
    }
    const roleAdderrUpdaterHandleChange = (e) => {
        const { name, value } = e.target;
        setRoleAdderEditorForm({ ...RoleAdderEditorForm, [name]: value });
    }
    const roleModal = () => {
        setRoleAdderEditorForm({ role_name: '', role_description: '', role_id: '' });
        seterror("");
    }
    useEffect(() => {
        const getAllroles = async () => {
            try {
                let response = await axios.get(`/api/routes/user-management-api/role-management`, {
                    headers: {
                        "Authorization": Cookies.get('token')
                    }
                });
                setroles(response.data.roles);
            } catch (error) {
                if (error.response.status === 401)
                    return router.push('/login');
            }
        }
        getAllroles();

    }, []);

    const confirmDelete = (element_id) => {
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        try {
                            const response = await axios.delete(`/api/routes/user-management-api/role-management`, {
                                headers: {
                                    "Content-Type": 'application/json',
                                    "Authorization": Cookies.get('token')
                                },
                                data: {
                                    "element_id": element_id,
                                }
                            })
                            setroles(response.data.current_roles);
                        } catch (error) {
                            if (error.response.status === 401)
                                return router.push('/login');
                        }
                    }
                },
                {
                    label: 'No',
                    onClick: () => { }
                }
            ]
        });
    };

    const editRoles = async (role_name, role_description, role_id) => {
        setRoleAdderEditorForm({ role_name: role_name, role_description: role_description, role_id: role_id });
        seterror("");
    }

    return (
        <AuthLayout>
            <div className="card">
                <div className="card-body">
                    <div className="d-flex align-items-end justify-content-between">
                        <h4>Roles</h4>
                        <button data-bs-toggle="modal" onClick={(e) => roleModal()} data-bs-target="#roleAdderModal" className="btn btn-success btn-rounded btn-sm"><i className='fa fa-plus' /> Add Role</button>
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Role Name</th>
                                <th scope="col">Description</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {roles.map((element, index) => (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{element.role_name}</td>
                                    <td>{element.role_description}</td>
                                    <td className='justify-space-between'>
                                        <button className="btn btn-warning btn-sm me-2 w-50" data-bs-toggle="modal" data-bs-target="#roleAdderModal"  onClick={(e) => { editRoles(element.role_name, element.role_description, element._id) }}>Edit</button>
                                        <button className="btn btn-danger btn-sm w-50" onClick={(e) => { confirmDelete(element._id) }}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* role adder modal */}
            <div className="modal fade" id="roleAdderModal" tabIndex="-1" aria-labelledby="roleadderModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="roleadderModalLabel">Add/Update Roles</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {error && (
                                <div class="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )}
                            <form name='role_adder_editor' id='role_adder_editor' onSubmit={(e) => { submitRoleAddereditor(e) }}>
                                <input type="hidden" name="role_id" id="role_id" value={RoleAdderEditorForm.role_id} />
                                <div className="form-group">
                                    <label htmlFor="role_name" className="form-label">Role Name</label>
                                    <input type="text" onChange={e => { roleAdderrUpdaterHandleChange(e) }} id='role_name' value={RoleAdderEditorForm.role_name} name='role_name' className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="role_description" className="form-label">Role Description</label>
                                    <textarea name="role_description" onChange={e => { roleAdderrUpdaterHandleChange(e) }} value={RoleAdderEditorForm.role_description} id="role_description" cols={10} rows={10} style={{ resize: 'none', height: '100px' }} className="form-control"></textarea>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" id="closeButtonModal" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button form='role_adder_editor' type="submit" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
}

export default Rolemanagement;
