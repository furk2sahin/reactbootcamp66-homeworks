import React from 'react';
import './Greetings.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert } from 'react-bootstrap';

function Greeting(props) {
    return (
        <Alert variant="primary" className="greetings">
            <i>{`Welcome To Movie List ${props.name}`}</i>
        </Alert>

    )
}

export default Greeting
