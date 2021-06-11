import React, { useState } from 'react';

interface SearchProps {
    onSearchFn: any
}

function Search (props : SearchProps) {
    const [filter, setFilter] = useState('');

    const handleOnChange = (e : any) => {
        let { value } = e.target;
        setFilter(value);
    }

    return (
        <div className="input-group">
            <input type="search" className="form-control rounded" placeholder="Title to search" aria-label="Search"
                   aria-describedby="search-addon" onChange={handleOnChange} value={filter} />
            <button type="button" className="btn btn-outline-primary" onClick={() => props.onSearchFn(filter)}>Search</button>
        </div>
    );
}

export default Search;
