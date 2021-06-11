import React, { useState } from 'react';
import {Button, Form, FormGroup, Input} from "reactstrap";

interface SortProps {
    sortFn: any
}

function SortByField (props : SortProps) {
    const [sortField, setSortField] = useState('');
    const [sortAsc, setSortAsc] = useState('asc');

    const handleSortFieldChange = (e : any) => {
        const { value } = e.target;
        setSortField(value);
    }

    const handleSortAscChange = (e : any) => {
        const { value } = e.target;
        setSortAsc(value);
    }


    return (
        <Form inline>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Input type="select" name="sortField" id="sortField" onChange={handleSortFieldChange} value={sortField}>
                <option value="empty">-</option>
                <option value="title">Title</option>
                <option value="priority">Priority</option>
                <option value="due_date">Due Date</option>
            </Input>
          </FormGroup>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Input type="select" name="asc" id="sortField" onChange={handleSortAscChange} value={sortAsc}>
                <option value="asc">Asc</option>
                <option value="desc">Desc</option>
            </Input>
          </FormGroup>
          <Button
              className="mb-2 mr-sm-2 mb-sm-0"
            color="success"
            onClick={() => props.sortFn(sortField, sortAsc)}
          > Sort </Button>
        </Form>
    );
}

export default SortByField;
