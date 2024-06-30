import React from 'react';

function Datatable({ values, searchable, pagination, paginationPerPage }) {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Book Name</th>
                    <th scope="col">Author</th>
                    <th scope="col">Lended By</th>
                    <th scope="col">Lending Date</th>
                    <th scope="col">Due Date</th>
                    <th scope="col">Late Fine</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                </tr>
            </tbody>
        </table>
    );
}

export default Datatable;
