import { Form, InputGroup } from "react-bootstrap"
import "./style.scss"

const AdminLogin = () => {
    return <>
        <div className="admin-login">
            <div className="admin-login-box">
                <h3 className='text-primary'>Admin Login </h3>
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

                <button className='btn btn-primary w-100'>Create My Account</button>

            </div>
        </div>

    </>
}

export default AdminLogin