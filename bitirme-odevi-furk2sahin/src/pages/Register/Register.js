import React, { useEffect, useState } from 'react'
import { Wrapper } from './Register.styles'
import {
    Button,
    Checkbox,
    Form,
    Icon,
    Message,
    Modal,
    Placeholder,
    Select
} from 'semantic-ui-react'
import Logo from '../../components/Logo/Logo'
import { Title } from './Register.styles'
import { getParkings, createUser, getUsers, getEmployees, getParkingOwners, createEmployee } from '../../services/api'
import { useHistory } from 'react-router-dom'

const Register = () => {
    const history = useHistory();
    const [success, setSuccess] = useState(false);
    const [users, setUsers] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [parkingOwners, setParkingOwners] = useState([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [alreadyTaken, setAlreadyTaken] = useState("");
    const [selectedParking, setSelectedParking] = useState("");
    const [isChecked, setChecked] = useState(false);
    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    const [userNameError, setUserNameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [parkingError, setParkingError] = useState(false);
    const [parkingLoading, setParkingLoading] = useState(false);
    const [createLoading, setCreateLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [successErrorModalOpen, setSuccessErrorModalOpen] = useState(false);
    const [error, setError] = useState("");
    const [parkings, setParkings] = useState([]);

    useEffect(() => {
        setParkingLoading(true);
        const init = async () => {
            try {
                let { data } = await getParkings();
                data = data.map((parking, index) => { return { key: index, text: parking.name, value: parking.name, ...parking } })
                setParkings(data);
                setParkingLoading(false);
            } catch (err) {
                setError(err);
            }

            try {
                const { data } = await getUsers();
                setUsers(data);
            } catch (err) {
                setError(err);
            }

            try {
                const { data } = await getEmployees();
                setEmployees(data);
            } catch (err) {
                setError(err);
            }

            try {
                const { data } = await getParkingOwners();
                setParkingOwners(data);
            } catch (err) {
                setError(err);
            }
            setParkingLoading(false);
        }
        init();
    }, [])

    const updateAccounts = async () => {
        setCreateLoading(true);
        try {
            const { data } = await getUsers();
            setUsers(data);
        } catch (err) {
            setError(err);
        }

        try {
            const { data } = await getEmployees();
            setEmployees(data);
        } catch (err) {
            setError(err);
        }

        try {
            const { data } = await getParkingOwners();
            setParkingOwners(data);
        } catch (err) {
            setError(err);
        }
        setCreateLoading(false);
    }

    const handleFirstNameChange = (event, { value }) => {
        if ((/^[a-zA-Z]+$/.test(value) || value === '') && value.length < 25) {
            setFirstName(value);
            if (firstNameError)
                setFirstNameError(false);
        }
    }

    const handleLastNameChange = (event, { value }) => {
        if ((/^[a-zA-Z]+$/.test(value) || value === '') && value.length < 25) {
            setLastName(value);
            if (lastNameError)
                setLastNameError(false);
        }
    }

    const handlePhoneChange = (event, { value }) => {
        if ((/^[0-9]+$/.test(value) || value === '') && value.length < 11 && value !== "0") {
            setPhone(value);
            if (phoneError)
                setPhoneError(false);
        }
    }

    const handleUserNameChange = (event, { value }) => {
        if ((/^[a-zA-Z0-9]+$/.test(value) || value === '') && value.length < 25) {
            setUserName(value);
            if (userNameError)
                setUserNameError(false);
        }
    }

    const handlePasswordChange = (event, { value }) => {
        if ((/^[a-zA-Z0-9]+$/.test(value) || value === '') && value.length < 25) {
            setPassword(value);
            if (passwordError)
                setPasswordError(false);
        }
    }

    const dropdownOnChangeHandler = (event, { value }) => {
        setSelectedParking(value);
        setParkingError(false);
    }

    const checkboxOnChange = () => {
        setChecked(!isChecked)
    }

    const onClickHandler = (event) => {
        if (firstName.length < 3)
            setFirstNameError(true);
        else if (lastName.length < 3)
            setLastNameError(true);
        else if (phone.length < 10)
            setPhoneError(true);
        else if (userName.length < 5)
            setUserNameError(true);
        else if (password.length < 5)
            setPasswordError(true);
        else if (selectedParking === '')
            setParkingError(true);
        else {
            if (users.some((user) => user.user_name.toLowerCase() === userName.toLowerCase()) ||
                employees.some((employee) => employee.user_name.toLowerCase() === userName.toLowerCase()) ||
                parkingOwners.some((parkingOwner) => parkingOwner.user_name.toLowerCase() === userName.toLowerCase())) {
                setAlreadyTaken("Username");
                setSuccessErrorModalOpen(true);
            } else if (users.some((user) => user.phone === phone) ||
                employees.some((employee) => employee.phone === phone) ||
                parkingOwners.some((parkingOwner) => parkingOwner.phone === phone)) {
                setAlreadyTaken("Phone")
                setSuccessErrorModalOpen(true);
            } else {
                setModalOpen(true);
            }
        }
    }

    const modalOKButtonHandler = async () => {
        let createPerson = {
            parking_id: parkings.find((parking) => parking.name === selectedParking).id,
            full_name: `${firstName} ${lastName}`,
            user_name: userName,
            password: password,
            phone: phone
        };
        if (isChecked) {
            createPerson = { starting_date: "date", is_accepted: false, ...createPerson };
            try {
                setCreateLoading(true);
                await createEmployee(createPerson);
            } catch (err) {
                setError(err);
            }
        } else {
            try {
                await createUser({ registration_date: new Date(), ...createPerson });
                setCreateLoading(false);
            } catch (err) {
                setError(err);
            }
        }
        setModalOpen(false);
        setSuccessErrorModalOpen(true);
        updateAccounts();
        setFirstName('');
        setLastName('');
        setPhone('');
        setUserName('');
        setPassword('');
        setSelectedParking('');
        setSuccess(true);
        setChecked(false);
        setAlreadyTaken("");
        setTimeout(() => {
            history.push("/login");
            setSuccess(false);
        }, 3000);
    }

    return (
        <>
            <Logo />
            <Title>Create your account</Title>
            <Wrapper>
                <Modal
                    dimmer="blurring"
                    open={successErrorModalOpen}
                    onClose={() => setSuccessErrorModalOpen(false)}
                >
                    <Modal.Content>
                        <Message negative={!success} positive={success} header={
                            success ? "Your account created successfully. You'll be redirect to login page in 3 seconds."
                                : alreadyTaken === "Username" ? "This Username is already in use"
                                    : alreadyTaken === "Phone" ? "This Phone is already in use"
                                        : null
                        } />
                    </Modal.Content>
                    <Modal.Actions>
                        {alreadyTaken === "Username" || alreadyTaken === "Phone" ?
                            <Button negative onClick={() => setSuccessErrorModalOpen(false)}>
                                OK!
                                </Button>
                            : null
                        }
                    </Modal.Actions>
                </Modal>

                {parkingLoading ?
                    <Placeholder>
                        <Placeholder.Line />
                        <Placeholder.Line />
                        <Placeholder.Line />
                        <Placeholder.Line />
                        <Placeholder.Line />
                        <Placeholder.Line />
                    </Placeholder>
                    : parkings.length === 0 && !error ?
                        <Message negative header="There is no parking. You can't register." />
                        : error ?
                            <Message negative>{error.toString()}</Message>
                            :
                            <>
                                <Form size="big">
                                    <Form.Group widths="equal">
                                        <Form.Input
                                            onChange={handleFirstNameChange}
                                            value={firstName}
                                            required
                                            fluid
                                            label="First name"
                                            placeholder="First name (between 2-24 letter)"
                                            error={firstNameError}
                                        />
                                        <Form.Input
                                            onChange={handleLastNameChange}
                                            value={lastName}
                                            required
                                            fluid
                                            label="Last name"
                                            placeholder="Last name (between 2-24 letter)"
                                            error={lastNameError}
                                        />
                                    </Form.Group>
                                    <Form.Input
                                        onChange={handlePhoneChange}
                                        value={phone}
                                        required
                                        label="Phone"
                                        placeholder="Phone (Length should be 10)"
                                        error={phoneError}
                                    />
                                    <Form.Input
                                        onChange={handleUserNameChange}
                                        value={userName}
                                        required
                                        label="Username"
                                        placeholder="Username (between 5-24 letter)"
                                        error={userNameError}
                                    />
                                    <Form.Input
                                        onChange={handlePasswordChange}
                                        value={password}
                                        required
                                        label="Password"
                                        placeholder="Password (between 5-24 letter)"
                                        type="password"
                                        error={passwordError}
                                    />
                                    <Form.Field
                                        loading={parkingLoading}
                                        value={selectedParking}
                                        onChange={dropdownOnChangeHandler}
                                        required
                                        control={Select}
                                        options={parkings}
                                        label="Choose Parking"
                                        placeholder='Choose Parking'
                                        search
                                        error={parkingError}
                                    />
                                    <Form.Field>
                                        <Checkbox slider label='Do you want to work in this parking?' onChange={checkboxOnChange} checked={isChecked} />
                                    </Form.Field>
                                    <Button
                                        loading={createLoading}
                                        animated
                                        fluid
                                        primary
                                        disabled={firstNameError || lastNameError || phoneError || userNameError || passwordError || parkingError ? true : false}
                                        onClick={onClickHandler}
                                    >
                                        <Button.Content visible>
                                            Sign in
                                </Button.Content>
                                        <Button.Content hidden>
                                            <Icon name="signup" />
                                        </Button.Content>
                                    </Button>
                                </Form>
                                <br />
                                <Modal
                                    dimmer="blurring"
                                    open={modalOpen}
                                    onClose={() => setModalOpen(false)}
                                >
                                    <Modal.Header>Are you sure the information is correct?</Modal.Header>
                                    <Modal.Content>
                                        <h3>
                                            First name: <i style={{ color: "red" }}>{firstName}</i><br />
                                            Last name: <i style={{ color: "red" }}>{lastName}</i><br />
                                            Phone: <i style={{ color: "red" }}>{phone}</i><br />
                                            Username: <i style={{ color: "red" }}>{userName}</i><br />
                                            Selected Parking: <i style={{ color: "red" }}>{selectedParking}</i><br />
                                            User Type: <i style={{ color: "red" }}>{isChecked ? "Employee" : "User"}</i>
                                        </h3>
                                    </Modal.Content>
                                    <Modal.Actions>
                                        <Button negative onClick={() => setModalOpen(false)}>
                                            Nope, something wrong!
                                    </Button>
                                        <Button positive onClick={modalOKButtonHandler}>
                                            All fine.
                                    </Button>
                                    </Modal.Actions>
                                </Modal>
                            </>
                }
                {
                    !error ?
                        <Message warning>
                            <Icon name='user' />
                            Already have an account?&nbsp;<a href='/login'>Login here</a>&nbsp;instead.
                        </Message>
                        :
                        null
                }
            </Wrapper>
        </>
    )
}

export default Register
