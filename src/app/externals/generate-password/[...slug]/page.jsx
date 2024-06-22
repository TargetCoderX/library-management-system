"use client"
import GuestLayout from '@/app/layouts/GuestLayout';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function genrate_password({ params }) {

  const router = useRouter();
  const [passwords, setpasswords] = useState({
    password: '',
    confirm_password: ''
  });

  const [isPasswordMissmatched, setisPasswordMissmatched] = useState(false);
  const handlePasswordOnChange = (e) => {
    const { name, value } = e.target;
    setpasswords({ ...passwords, [name]: value })
  }
  useEffect(() => {
    if (passwords.password !== passwords.confirm_password)
      setisPasswordMissmatched(true);
    else
      setisPasswordMissmatched(false);
  }, [passwords]);

  const submitPasswordGenerateForm = async (e) => {
    e.preventDefault();
    console.log(params);
    if (!isPasswordMissmatched) {
      const response = await axios.post('/api/routes/externals/password-generate', {
        user_id: params.slug[0],
        token: params.slug[1],
        password: passwords.password
      }, {
        headers: {
          "Content-Type": 'application/json',
        }
      })
      if (response.data.status === 1) {
        toast.success(response.data.message);
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      }
      else
        toast.error(response.data.message);
    } else {
      toast.error("Password and Confirm Password must be matched");
    }
  }
  return (
    <GuestLayout>
      <div className="auth-form-light text-left py-5 px-4 px-sm-5">
        <h2 className=" text-center fw-light">Generate Password</h2>
        {isPasswordMissmatched && (
          <div class="alert alert-danger" role="alert">
            Password and Confirm Password Mismatched
          </div>
        )}
        <form className="pt-3" onSubmit={(e) => { submitPasswordGenerateForm(e) }}>
          <div className="form-group">
            <input type="text" className="form-control form-control-lg" value={passwords.password} onChange={(e) => { handlePasswordOnChange(e) }} name='password' id="password" placeholder="Password" />
          </div>
          <div className="form-group">
            <input type="text" className="form-control form-control-lg" value={passwords.confirm_password} onChange={(e) => { handlePasswordOnChange(e) }} name='confirm_password' id="confirm_password" placeholder="Confirm Password" />
          </div>
          <div className="mt-3 d-grid gap-2">
            <button type='submit' className="btn btn-block btn-primary btn-lg fw-medium auth-form-btn">Create Password</button>
          </div>
        </form>
      </div>
    </GuestLayout>
  );
}

export default genrate_password;
