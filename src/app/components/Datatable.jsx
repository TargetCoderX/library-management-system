import React from 'react';

function Datatable({ values, searchable, pagination, paginationPerPage, columns }) {
    return (
        <>
            <div class="table-responsive pt-3">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            {columns && columns.map((element) => (
                                <th>{element}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {values && values.map((element, index) => (
                            <tr>
                                <th scope="row">{index + 1}</th>
                                {Object.keys(element).map((key) => (
                                    <td>{element[key]}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Datatable;
