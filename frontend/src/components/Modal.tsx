import React, { useState } from 'react';
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label
} from "reactstrap";

function CustomModal(props : any) {
    const [activeItem, setActiveItem] = useState(props.activeItem);

    const handleChange = (e : any) => {
        let { name, value } = e.target;
        const innerActiveItem = { ...activeItem, [name]: value };
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
