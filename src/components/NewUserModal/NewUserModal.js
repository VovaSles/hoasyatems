import { useState } from "react";
import { Button, Modal, Form, Col, Row } from "react-bootstrap";



function NewUserModal(props) {
    const { show, handleClose, addUser } = props;
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [apartment, setApartment] = useState("");

    function closeModal() {
        setName("");
        setEmail("");
        setApartment("");
        handleClose();
    }


    function handleAddUser() {
        // 1) triggers addRecipe at App that will then add this recipe to its recipes state
        addUser(name, email, apartment);

        // 2) cleanup (clean all field + close the modal)
        closeModal();
    }

    

    return (
        <Modal show={show} onHide={closeModal} size="xl" >
            <Modal.Header closeButton>
                <Modal.Title>New User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group as={Row} controlId="formHorizontalName">
                        <Form.Label column sm={2}>
                             Name
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formHorizontalDesc">
                        <Form.Label column sm={2}>
                             Email
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}  />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formHorizontalDesc">
                        <Form.Label column sm={2}>
                            Apartment
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="email" placeholder="Apartment" value={apartment} onChange={e => setApartment(e.target.value)}  />
                        </Col>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleAddUser}>
                    Create User
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default NewUserModal;