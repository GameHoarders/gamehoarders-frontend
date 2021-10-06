import React, { Component } from 'react';
import Form from 'react-bootstrap/Form'
import { withAuth0 } from '@auth0/auth0-react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import './styleForModal.css';

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
                <Modal className="special_modal"  show={true} onHide={this.props.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Write Private Note</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form id="note" onSubmit={this.submitHandler}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Control style={{width:'100%'}} name="note" defaultValue={this.props.data.note} as="textarea" rows={3} />
                            </Form.Group>
                            <Button style={{float:'right'}} variant="primary" type="submit">
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
