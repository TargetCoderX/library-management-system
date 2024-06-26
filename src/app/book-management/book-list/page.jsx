"use client"
import AuthLayout from '@/app/layouts/AuthLayout';
import React, { useState } from 'react';
import FileUploader from '../components/dropzone/FileUploader';
import Booklist from '../components/booklist/Booklist';

function book_list() {
    const tempCount = 25;
    const [isFileUploader, setisFileUploader] = useState(false);
    const closeModal = () => {
        document.getElementById("modelCloseButton").click();
    }
    return (
        <AuthLayout>
            <div className="row">
                <div className="col-md-12 text-end mb-5 d-flex justify-content-end">
                    <button className="btn btn-primary btn-sm ml-auto me-2" onClick={() => { setisFileUploader(false) }} data-bs-toggle="modal" data-bs-target="#bookListModal">Add New Book</button>
                    <button className="btn btn-primary btn-sm" onClick={() => { setisFileUploader(true) }} data-bs-toggle="modal" data-bs-target="#bookListModal">Upload Book List</button>
                </div>
                {Array.from({ length: tempCount }).map(() => (
                    <div className="col-md-3 mb-5">
                        <div className="card">
                            <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-danger">
                                checked out
                                <span className="visually-hidden">unread messages</span>
                            </span>
                            <img className="card-img-top mt-3" style={{ "height": "200px", objectFit: "contain" }} src="https://www.designforwriters.com/wp-content/uploads/2017/10/design-for-writers-book-cover-tf-2-a-million-to-one.jpg" alt="Card image cap" />
                            <div className="card-body text-center">
                                <h5 className="card-title">"To Kill a Mockingbird" by Harper Lee</h5>
                                <p className="">A classic novel exploring themes of racial injustice and moral growth in the American South.</p>
                            </div>
                        </div>
                    </div>

                ))}

                <div className="modal fade" id="bookListModal" tabindex="-1" aria-labelledby="bookListModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-md">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="bookListModalLabel">{isFileUploader ? "File Uploader" : "Add New Book"}</h1>
                                <button type="button" id='modelCloseButton' className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                {isFileUploader ? (<FileUploader closemodel={closeModal} />) : (<Booklist closemodel={closeModal} />)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthLayout >
    );
}

export default book_list;
