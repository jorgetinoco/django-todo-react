import React from 'react';
import {Button, Form, FormGroup, Input} from "reactstrap";

interface SortProps {
    sortFn: any,
    setSortField: any,
    setSortAsc: any,
    sortField: string,
    sortAsc: string
}

function SortByField (props : SortProps) {

    const handleSortFieldChange = (e : any) => {
        const { value } = e.target;
        props.setSortField(value);
    }

    const handleSortAscChange = (e : any) => {
        const { value } = e.target;
        props.setSortAsc(value);
    }


    return (
        <Form inline>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Input type="select" name="sortField" id="sortField" onChange={handleSortFieldChange} value={props.sortField}>
                <option value="empty">-</option>
                <option value="title">Title</option>
                <option value="priority">Priority</option>
                <option value="due_date">Due Date</option>
            </Input>
          </FormGroup>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Input type="select" name="asc" id="sortField" onChange={handleSortAscChange} value={props.sortAsc}>
                <option value="asc">Asc</option>
                <option value="desc">Desc</option>
            </Input>
          </FormGroup>
          <Button
              className="mb-2 mr-sm-2 mb-sm-0"
            color="success"
            onClick={() => props.sortFn()}
          > Sort </Button>
        </Form>
    );
}

export default SortByField;
