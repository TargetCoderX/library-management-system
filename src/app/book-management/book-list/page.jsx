"use client"
import AuthLayout from '@/app/layouts/AuthLayout';
import React, { useEffect, useState } from 'react';
import FileUploader from '../components/dropzone/FileUploader';
import Booklist from '../components/booklist/Booklist';
import axios from 'axios';
import Cookies from 'js-cookie';

function book_list() {
    const [isFileUploader, setisFileUploader] = useState(false);
    const [bookList, setbookList] = useState([]);
    const [searchBooks, setsearchBooks] = useState([]);
    const [searchBookKeyword, setSearchBookKeyword] = useState([]);
    const closeModal = () => {
        document.getElementById("modelCloseButton").click();
    }
    const getAllBooks = async () => {
        const response = await axios.get("/api/routes/book-management-api/book-management", {
            headers: {
                Authorization: Cookies.get("token")
            }
        })
        if (response.data.status == 1) {
            setbookList(response.data.books)
            setsearchBooks(response.data.books);
        }
        else {
            setbookList([])
            setsearchBooks([]);

        }
    }
    useEffect(() => {
        getAllBooks()
    }, []);

    const search = (e) => {
        const { value } = e.target;
        setSearchBookKeyword(value);
        const filterData = [...bookList].filter(element => {
            return element.book_name.toLowerCase().includes(value.toLowerCase()) ||
                element.book_description.toLowerCase().includes(value.toLowerCase()) ||
                element.author.toLowerCase().includes(value.toLowerCase()) ||
                element.status.toLowerCase().includes(value.toLowerCase())
        })
        setsearchBooks(filterData);
    }
    return (
        <AuthLayout>
            <div className="row">
                <div className="col-md-12 text-end mb-5 d-flex align-items-center">
                    <input type="text" placeholder="Search" name="search" id="search" value={searchBookKeyword} onChange={(e) => { search(e) }} className="form-control w-50 me-2" />
                    <div className='justify-content-end w-50'>
                        <button className="btn btn-primary btn-sm ml-auto me-2" onClick={() => { setisFileUploader(false) }} data-bs-toggle="modal" data-bs-target="#bookListModal">Add New Book</button>
                        <button className="btn btn-primary btn-sm" onClick={() => { setisFileUploader(true) }} data-bs-toggle="modal" data-bs-target="#bookListModal">Upload Book List</button>
                    </div>
                </div>
                {
                    searchBooks && searchBooks.map((element) => {
                        return <div className="col-md-3 mb-4">
                            <div className="card">
                                <span className={`position-absolute top-0 start-50 translate-middle badge rounded-pill ${element.status.toLowerCase() == 'active' ? 'bg-success' : 'bg-danger'}`}>
                                    {element.status}
                                    <span className="visually-hidden">unread messages</span>
                                </span>
                                <img className="card-img-top mt-3" style={{ "height": "200px", objectFit: "contain" }} src={`/api/routes/externals/secure-image-access?image=${element.cover_image}`} alt="Card image cap" />
                                <div className="card-body text-center">
                                    <h5 className="card-title multiline-ellipsis-title">{element.book_name}</h5>
                                    <p><strong>By {element.author}</strong></p>
                                    <p className="multiline-ellipsis">{element.book_description}</p>
                                </div>
                            </div>
                        </div>

                    })
                }


                <div className="modal fade" id="bookListModal" tabindex="-1" aria-labelledby="bookListModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-md">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="bookListModalLabel">{isFileUploader ? "File Uploader" : "Add New Book"}</h1>
                                <button type="button" id='modelCloseButton' className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                {isFileUploader ? (<FileUploader closemodel={closeModal} />) : (<Booklist closemodel={closeModal} getAllBooks={getAllBooks} />)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthLayout >
    );
}

export default book_list;
