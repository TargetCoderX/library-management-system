"use client"
import AuthLayout from '@/app/layouts/AuthLayout';
import React from 'react';

function book_list() {
    const tempCount = 25;
    return (
        <AuthLayout>
            <div className="row">
                {Array.from({length:tempCount}).map(() => (
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
            </div>
        </AuthLayout>
    );
}

export default book_list;
