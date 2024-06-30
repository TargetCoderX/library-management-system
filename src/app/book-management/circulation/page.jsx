"use client"
import Datatable from '@/app/components/Datatable';
import AuthLayout from '@/app/layouts/AuthLayout';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';

function circulation() {

    const [users, setusers] = useState([]);
    const [books, setbooks] = useState([]);
    const todayAndAfter10Days = () => {
        let today = new Date();
        let afterTenDays = new Date(today); //copying today
        afterTenDays.setDate(afterTenDays.getDate() + 10)
        const options = {
            "year": "numeric",
            "month": "numeric",
            "day": "numeric"
        }

        return {
            "today": today.toLocaleDateString('en-IN', options),
            "due_date": afterTenDays.toLocaleDateString('en-IN', options),
        }
    }

    const [issueForm, setissueForm] = useState({
        user_id: "",
        book_id: "",
        issue_date: todayAndAfter10Days().today,
        due_date: todayAndAfter10Days().due_date,
    });

    const getAllActiveBooksAndUsers = async () => {
        const response = await axios.get(`/api/routes/book-management-api/book-circulation`, {
            headers: {
                "Authorization": Cookies.get('token'),
            }
        })
        setusers(response.data.users);
        setbooks(response.data.books);
    }

    useEffect(() => {
        getAllActiveBooksAndUsers()
    }, []);

    const bookformOnChange = (e) => {
        const { name, value } = e.target;
        setissueForm({ ...issueForm, [name]: value });
    }
    return (
        <AuthLayout>
            <div className="card">
                <div className="card-body">
                    <div className="d-flex align-items-end justify-content-between mb-2">
                        <h5 className="card-title mb-0">Circulation</h5>
                        <button className="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#issueBookModal">Issue Book</button>
                    </div>
                    <Datatable values={[]} searchable={true} pagination={true} paginationPerPage={10} />
                </div>
            </div>
            <div className="modal fade" id="issueBookModal" tabindex="-1" aria-labelledby="issueBookModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="issueBookModalLabel">Modal title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label htmlFor="">Select User</label>
                                <select onChange={(e) => bookformOnChange(e)} name="user_id" id="user" className="form-control" value={issueForm.user_id}>
                                    <option value="" style={{ "display": "none" }}>Select User</option>
                                    {users && users.map((user) => (
                                        <option value={user._id}>{user.first_name} {user.last_name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Select book</label>
                                <select onChange={(e) => bookformOnChange(e)} name="book_id" id="book" className="form-control" value={issueForm.book_id}>
                                    <option value="" style={{ "display": "none" }}>Select Book</option>
                                    {books && books.map((book) => (
                                        <option value={book._id}>{book.book_name} ({book.author})</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Issue Date</label>
                                <input onChange={(e) => bookformOnChange(e)} type="text" value={issueForm.issue_date} name='issue_date' readOnly className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Due Date</label>
                                <input onChange={(e) => bookformOnChange(e)} type="text" value={issueForm.due_date} name='due_date' readOnly className="form-control" />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary btn-sm" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary btn-sm">Issue Book</button>
                        </div>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
}

export default circulation;
