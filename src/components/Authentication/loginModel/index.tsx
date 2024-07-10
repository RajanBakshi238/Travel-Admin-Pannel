import { useState, forwardRef, useImperativeHandle, MutableRefObject } from 'react';
import { InputGroup, Form, Modal } from 'react-bootstrap';
import "./../registerModel/style.css"
import { IChildRef } from '../../landingPage/Header';

const LoginModal = forwardRef((props: { registerRef: MutableRefObject<IChildRef | undefined> }, ref) => {
    const [show, setShow] = useState(false);

    const handleClose = () => { setShow(false) };
    const handleShow = () => {
        if (props.registerRef.current) {
            props.registerRef.current.handleClose()
        }

        setShow(true)
    };

    useImperativeHandle(ref, () => ({
        handleClose,
        handleShow
    }))


    return (
        <Modal centered dialogClassName="yatri-model" show={show} onHide={handleClose}>
            <div className='m-4 mx-8 auth-model text-center'>

                <h3 className='text-primary'>Join Travel Yatri </h3>
                <p className='sub-heading'>Become a member to enjoy special tours and offers.</p>

                <div>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1"><i className="fas fa-envelope"></i></InputGroup.Text>
                        <Form.Control
                            placeholder="Email"
                            aria-label="Email"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon2"><i className="fas fa-lock"></i></InputGroup.Text>
                        <Form.Control
                            placeholder="Password"
                            aria-label="Password"
                            aria-describedby="basic-addon2"
                        />
                    </InputGroup>

                    <button className='btn btn-primary w-100'>Login</button>

                    <p className='sub-heading continue'>or continue with</p>

                    <button className='btn btn-primary w-100 google-login-btn'>Login with Google</button>

                    <p className='already-registered'>Don't have an account? <a className='text-primary' href="#" onClick={() => {
                        if (props.registerRef.current) {
                            props.registerRef.current.handleShow()
                        }
                    }}>Register</a></p>


                </div>
            </div>
        </Modal>
    )
})

export default LoginModal