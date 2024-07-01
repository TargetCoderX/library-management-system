"use client"
import React, { useEffect, useState } from 'react';

function Datatable({ values, searchable, pagination, paginationPerPage, columns, searchableColumns }) {

    const [searchValue, setsearchValue] = useState("");
    const [filterValue, setFilterValue] = useState([]);
    const handleSearch = (e) => {
        const { value } = e.target;
        setsearchValue(value);
        const getFilterData = [...values].filter(element => {
            return searchableColumns.some(field => element[field].toLowerCase().includes(value));
        })
        setFilterValue(getFilterData);
    }
    useEffect(() => {
        setFilterValue([...values])
    }, [values]);
    return (
        <>
            <div class="table-responsive pt-3">
                {searchable && (
                    <div className="d-flex justify-content-end mb-2">
                        <input type="text" value={searchValue} onChange={(e) => handleSearch(e)} className="form-control w-25" placeholder='Search...' />
                    </div>
                )}
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
                        {filterValue && filterValue.map((element, index) => (
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
