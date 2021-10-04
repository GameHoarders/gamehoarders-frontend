import React, { Component } from 'react';
import Form from 'react-bootstrap/Form'
import { withAuth0 } from '@auth0/auth0-react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';

class UpdateModal extends Component {
    submitHandler= async (event)=>{
        event.preventDefault();
        let note = event.target.note.value;
        await this.props.update(note)
    }
    render() {
        const { user } = this.props.auth0;
        console.log(user.email);
        return (
            <>
                <Modal show={true} onHide={this.props.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.submitHandler}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Write Private Note</Form.Label>
                                <Form.Control name="note" defaultValue={this.props.data.note} as="textarea" rows={3} />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Update
                            </Button>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.close}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>


            </>
        )
    }
}
export default withAuth0(UpdateModal);
