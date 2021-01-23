import { useState } from "react";
import { Button, Modal, Form, Col, Row } from "react-bootstrap";



function NewVotingModal(props) {
    const { show, handleClose, addVoting } = props;
    const [title, setTitle] = useState("");
    const [details, setDetails] = useState("");
  

    function closeModal() {
        setTitle("");
        setDetails("");
        handleClose();
    }


    function handleAddVoting() {
        // 1) triggers addRecipe at App that will then add this recipe to its recipes state
        addVoting(title, details);

        // 2) cleanup (clean all field + close the modal)
        closeModal();
    }

    

    return (
        <Modal show={show} onHide={closeModal} size="xl" >
            <Modal.Header closeButton>
                <Modal.Title>New Voting</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group as={Row} controlId="formHorizontalName">
                        <Form.Label column sm={2}>
                             Title
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formHorizontalDesc">
                        <Form.Label column sm={2}>
                             
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" placeholder="Details" value={details} onChange={e => setDetails(e.target.value)} required />
                        </Col>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleAddVoting}>
                    Create Voting
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default NewVotingModal;