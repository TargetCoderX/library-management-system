"use client";
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

function Booklist({ closemodel, getAllBooks }) {
    const randomStringGenerator = (length) => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    const [newBookform, setnewBookform] = useState({
        "book_name": "",
        "book_description": "",
        "author": "",
        "isbn": randomStringGenerator(3),
        "publisher": "",
        "publish_date": "",
        "edition": "",
        "genre": "",
        "status": "Active",
        "acquisition_date": "",
        "cover_image": null,
    });

    const handleformOnChange = (e) => {
        const { name, value } = e.target;
        if (name !== "cover_image")
            setnewBookform({ ...newBookform, [name]: value });
        else
            setnewBookform({ ...newBookform, [name]: e.target.files[0] });
    }
    const submitBookForm = async () => {
        let formdata = new FormData();
        Object.keys(newBookform).forEach(element => {
            formdata.append(element, newBookform[element])
        });
        const response = await axios.post("/api/routes/book-management-api/book-management", formdata, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": Cookies.get('token'),
            }
        })
        if (response.data.status === 1) {
            toast.success(response.data.message);
            closemodel();
            setnewBookform({
                "book_name": "",
                "book_description": "",
                "author": "",
                "isbn": randomStringGenerator(3),
                "publisher": "",
                "publish_date": "",
                "edition": "",
                "genre": "",
                "status": "Active",
                "acquisition_date": "",
                "cover_image": null,
            })
            getAllBooks();
        }
        else
            toast.error(response.data.message);
    }
    return (
        <>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <input type="text" className='form-control' onChange={(e) => { handleformOnChange(e) }} placeholder='Book Name' name="book_name" value={newBookform.book_name} id="book_name" />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <input type="text" className='form-control' onChange={(e) => { handleformOnChange(e) }} placeholder='Book Description' name="book_description" value={newBookform.book_description} id="book_description" />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <input type="text" className='form-control' onChange={(e) => { handleformOnChange(e) }} placeholder='Author' name="author" id="author" value={newBookform.author} />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <input type="text" className='form-control' onChange={(e) => { handleformOnChange(e) }} placeholder='ISBN' name="isbn" id="isbn" value={newBookform.isbn} />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <input type="text" className='form-control' onChange={(e) => { handleformOnChange(e) }} placeholder='Publisher' name="publisher" value={newBookform.publisher} id="publisher" />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <input type="date" className='form-control' onChange={(e) => { handleformOnChange(e) }} placeholder='Publication Date' name="publish_date" value={newBookform.publish_date} id="publish_date" />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <input type="text" className='form-control' onChange={(e) => { handleformOnChange(e) }} placeholder='Edition' name="edition" value={newBookform.edition} id="edition" />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <input type="text" className='form-control' onChange={(e) => { handleformOnChange(e) }} placeholder='Genre' name="genre" value={newBookform.genre} id="genre" />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <input type="text" className='form-control' onChange={(e) => { handleformOnChange(e) }} placeholder='Status' readOnly={true} name="status" value={newBookform.status} id="status" />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <input type="date" className='form-control' onChange={(e) => { handleformOnChange(e) }} placeholder='Acquisition Date' name="acquisition_date" value={newBookform.acquisition_date} id="acquisition_date" />
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="form-group">
                        <input type="file" className='form-control' onChange={(e) => { handleformOnChange(e) }} name="cover_image" id="cover_image" />
                    </div>
                </div>
                <div className="col-md-12 m-2 text-center">
                    <button className="btn btn-primary btn-sm w-50" onClick={(e) => submitBookForm()}>Add Book</button>
                </div>
            </div>
        </>
    );
}

export default Booklist;
