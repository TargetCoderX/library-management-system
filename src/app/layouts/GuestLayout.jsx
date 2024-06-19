import React from 'react';

function GuestLayout({ children }) {
    return (
        <div className="container-scroller">
            <div className="container-fluid page-body-wrapper full-page-wrapper">
                <div className="content-wrapper d-flex align-items-center auth px-0">
                    <div className="row w-100 mx-0">
                        <div className="col-lg-4 mx-auto">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GuestLayout;
