import React from 'react';
import './dropzone.css';
function FileUploader() {
    return (
        <div className="col-md-12">
            <form method="post" action="#" id="dropzone_form">
                <div className="form-group files color">
                    <input type="file" className="form-control d-none" />
                </div>
            </form>
        </div>
    );
}

export default FileUploader;
