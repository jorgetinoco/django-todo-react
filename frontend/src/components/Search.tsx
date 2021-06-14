import React from 'react';

interface SearchProps {
    onSearchFn: any,
    setFilter: any,
    filter: string
}

function Search (props : SearchProps) {

    const handleOnChange = (e : any) => {
        let { value } = e.target;
        props.setFilter(value);
    }

    return (
        <div className="input-group">
            <input type="search" className="form-control rounded" placeholder="Title to search" aria-label="Search"
                   aria-describedby="search-addon" onChange={handleOnChange} value={props.filter} />
            <button type="button" className="btn btn-outline-primary" onClick={() => props.onSearchFn(props.filter)}>Search</button>
        </div>
    );
}

export default Search;
