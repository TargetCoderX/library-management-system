"use client";
import GuestLayout from '@/app/layouts/GuestLayout';
import React, { useState } from 'react';
import logo from '../../assets/images/logo.png'
import Image from 'next/image';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

function AdminLogin() {
    const [adminLoginForm, setadminLoginForm] = useState({ email: '', password: '' });
    const navigation = useRouter();
    const handleAdminLoginForm = (e) => {
        const { name, value } = e.target;
        setadminLoginForm({ ...adminLoginForm, [name]: value });
    }

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/routes/authentication/admin/login', adminLoginForm, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                if (response.status == 200) {
                    const responseData = response.data;
                    Cookies.set("token", responseData.token,{ expires: 2 });
                    Cookies.set("user", JSON.stringify(responseData.user),{ expires: 2 });
                    navigation.push('/dashboard');
                } else {

                }

            })
            .catch(error => console.log(error));
    }

    return (
        <GuestLayout>
            <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                <div className="brand-logo text-center">
                    <Image src={logo} alt="logo" height={100} width={200} />
                </div>
                <h4 className='text-center'>Hello! let's get started</h4>
                <h6 className="fw-light text-center">Sign in to continue.</h6>
                <form className="pt-3" onSubmit={(e) => { handleLoginSubmit(e) }}>
                    <div className="form-group">
                        <input type="email" value={adminLoginForm.email} name='email' onChange={(e) => { handleAdminLoginForm(e) }} className="form-control form-control-lg" id="exampleInputEmail1" placeholder="Username" />
                    </div>
                    <div className="form-group">
                        <input type="password" value={adminLoginForm.password} name='password' onChange={(e) => { handleAdminLoginForm(e) }} className="form-control form-control-lg" id="exampleInputPassword1" placeholder="Password" />
                    </div>
                    <div className="mt-3 d-grid gap-2">
                        <button type='submit' className="btn btn-block btn-primary btn-lg fw-medium auth-form-btn">SIGN IN</button>
                    </div>
                    <div className="my-2 d-flex justify-content-between align-items-center">
                        <div className="form-check">
                            <label className="form-check-label text-muted">
                                <input type="checkbox" className="form-check-input" /> Keep me signed in </label>
                        </div>
                        <a href="#" className="auth-link text-black">Forgot password?</a>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}

export default AdminLogin;
