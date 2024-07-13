import { Form, InputGroup } from "react-bootstrap";
import "./style.scss"

const CreateTrip = () => {
    return (
        <div className="register-as-page">
            <div className="form-box">
                <div>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1"><i className="fas fa-map-marker-alt"></i></InputGroup.Text>
                        <Form.Control
                            placeholder="Place"
                            aria-label="Place"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                </div>
                <div>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1"><i className="fas fa-truck-pickup"></i></InputGroup.Text>
                        <Form.Control
                            placeholder="Pick up"
                            aria-label="pick up"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                </div>

                <div>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1"><i className="fas fa-calendar-week"></i></InputGroup.Text>
                        <Form.Control
                            type="date"
                            placeholder="Start Date"
                            aria-label="start date"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                </div>
                <div>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1"><i className="fas fa-calendar-week"></i></InputGroup.Text>
                        <Form.Control
                            type="date"
                            placeholder="End Date"
                            aria-label="End date"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                </div>
                <div>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1"><i className="fas fa-phone-volume"></i></InputGroup.Text>
                        <Form.Control
                            placeholder="Enquiry Number"
                            aria-label="pick up"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                </div>
                <div>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1"><i className="fas fa-dollar-sign"></i></InputGroup.Text>
                        <Form.Control
                            placeholder="Price"
                            aria-label="pick up"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                </div>

            </div>
            <div className="submit-box">
                <button className="btn btn-primary">
                    Create trip
                </button>
            </div>
        </div>
    );
}

export default CreateTrip