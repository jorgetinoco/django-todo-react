import React, { useState } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Input,
    Label
} from "reactstrap";
import { TodoItem } from "../interfaces";

const DatePicker = require('reactstrap-date-picker');

interface Props {
    activeItem: TodoItem,
    toggle: any,
    onSave: any
}

function CustomModal (props : Props) {
    const [activeItem, setActiveItem] = useState(props.activeItem);

    const handleChange = (e : any) => {
        let { name, value } = e.target;

        if (e.target.type === "checkbox") {
          value = e.target.checked;
        }

        const innerActiveItem = { ...activeItem, [name]: value };
        setActiveItem(innerActiveItem);
    }

    const handleDateChange = (value : any, _ : any /* formatted date not used*/ ) => {
        const innerActiveItem = { ...activeItem, 'due_date': value };
        setActiveItem(innerActiveItem);
    }

    const { toggle, onSave } = props;

    return (
        <Modal isOpen={true} toggle={toggle}>
            <ModalHeader toggle={toggle}>TODO Item</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label form="todo-title">Title</Label>
                        <Input
                            type="text"
                            id="todo-title"
                            name="title"
                            value={activeItem.title}
                            onChange={handleChange}
                            placeholder="Enter TODO title"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label form="todo-description">Description</Label>
                        <Input
                            type="text"
                            id="todo-description"
                            name="description"
                            value={activeItem.description}
                            onChange={handleChange}
                            placeholder="Enter TODO description"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label form="todo-description">Priority</Label>
                        <Input type="select" name="priority" id="todo-priority" onChange={handleChange} value={activeItem.priority}>
                            <option value="High">High</option>
                            <option value="Med">Medium</option>
                            <option value="Low">Low</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label form="todo-dueDate">Due Date</Label>
                        <DatePicker
                            id="todo-dueDate"
                            value={activeItem.due_date}
                            onChange={handleDateChange}
                        />
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                        <Input
                            type="checkbox"
                            id="todo-completed"
                            name="completed"
                            checked={activeItem.completed}
                            onChange={handleChange}
                            placeholder="Enter TODO description"
                        />
                            Completed
                        </Label>
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
              <Button
                color="success"
                onClick={() => onSave(activeItem)}
              > Save
          </Button>
        </ModalFooter>
        </Modal>
    );
}

export default CustomModal;
