import React, { useContext, useEffect, useState } from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Button, Divider, Form, Grid, Icon, Message, Modal, Placeholder, Segment } from 'semantic-ui-react'
import Logo from '../../components/Logo/Logo'
import { getEmployees, getParkingOwners, getUsers } from '../../services/api'
import { Title, Wrapper } from './Login.styles'
import SessionContext from '../../contexts/SessionContext'
import { Link, useHistory } from 'react-router-dom'

const Login = () => {
    const { setAuthenticated, setUser } = useContext(SessionContext);
    const history = useHistory();
    const [username, setUsername] = useState("");
    const [loginError, setLoginError] = useState(false);
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState("");
    const [users, setUsers] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [parkingOwners, setParkingOwners] = useState([]);
    const [requestWaiting, setRequestWaiting] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        const init = async () => {
            setLoading(true);

            try {
                const { data } = await getUsers();
                setUsers(data);
            } catch (err) {
                setServerError(err);
            }

            try {
                const { data } = await getEmployees();
                setEmployees(data);
            } catch (err) {
                setServerError(err);
            }

            try {
                const { data } = await getParkingOwners();
                setParkingOwners(data);
            } catch (err) {
                setServerError(err);
            }

            setLoading(false);
        }
        init();
    }, [])

    const handleUsernameChange = (event, { value }) => {
        if ((/^[a-zA-Z0-9]+$/.test(value) || value === '') && value.length < 25) {
            setUsername(value);
            if (requestWaiting)
                setRequestWaiting(false);
            if (loginError)
                setLoginError(false);
        }
    }

    const handlePasswordChange = (event, { value }) => {
        if ((/^[a-zA-Z0-9]+$/.test(value) || value === '') && value.length < 25) {
            setPassword(value);
            if (loginError)
                setLoginError(false);
            if (requestWaiting)
                setRequestWaiting(false);
        }
    }

    const handleSigninOnClick = (event) => {
        event.preventDefault();
        if (users.some((user) => user.user_name === username && user.password === password)) {
            setUser(users.find((user) => user.user_name === username))
            setAuthenticated('User');
            history.push("/user");
        } else if (employees.some((employee) => employee.user_name === username && employee.password === password && employee.is_accepted)) {
            setUser(employees.find((employee) => employee.user_name === username && employee.password === password && employee.is_accepted))
            setAuthenticated('Employee');
            history.push("/employee");
        } else if (parkingOwners.some((parkingOwner) => parkingOwner.user_name === username && parkingOwner.password === password)) {
            setUser(parkingOwners.find((parkingOwner) => parkingOwner.user_name === username && parkingOwner.password === password))
            setAuthenticated('ParkingOwner');
            history.push("/parkingowner");
        } else if (employees.some((employee) => employee.user_name === username && employee.password === password && !employee.is_accepted)) {
            setRequestWaiting(true);
            setModalOpen(true);
        } else {
            setLoginError(true);
            setModalOpen(true);
        }
    }

    return (
        <>
            <Logo />
            <Title> Parking App</Title>
            <Wrapper>
                <Segment placeholder>
                    <Grid columns={2} relaxed='very' stackable >
                        < Grid.Column >
                            {!loading && !serverError ?
                                <Form size="big">
                                    <Form.Input
                                        value={username}
                                        icon='user'
                                        iconPosition='left'
                                        label='Username'
                                        placeholder="Username (max 24)"
                                        onChange={handleUsernameChange}
                                    />
                                    <Form.Input
                                        value={password}
                                        icon='lock'
                                        iconPosition='left'
                                        label='Password'
                                        type='password'
                                        placeholder="Password (max 24)"
                                        onChange={handlePasswordChange}
                                    />
                                    <Button
                                        primary
                                        animated
                                        size='big'
                                        onClick={handleSigninOnClick}
                                    >
                                        <Button.Content visible>Sign in</Button.Content>
                                        <Button.Content hidden><Icon name="sign-in" /></Button.Content>
                                    </Button>
                                </Form>
                                : !serverError ?
                                    <Placeholder>
                                        <Placeholder.Line />
                                        <Placeholder.Line />
                                        <Placeholder.Line />
                                        <Placeholder.Line />
                                        <Placeholder.Line />
                                    </Placeholder>
                                    :
                                    <Message negative>{serverError.toString()}</Message>
                            }
                        </Grid.Column>
                        <Grid.Column verticalAlign='middle'>
                            <Button content='Sign up' icon='signup' size='big' as={Link} to="/register" />
                        </Grid.Column>
                    </Grid>
                    <Divider vertical>Or</Divider>
                </Segment>
            </Wrapper>
            <Modal
                dimmer="blurring"
                open={modalOpen}
                onClose={() => setModalOpen(false)}
            >
                <Modal.Header>
                    {loginError ?
                        <Message
                            negative
                            header='Wrong username or password'
                        />
                        : requestWaiting ?
                            <Message
                                negative
                                header='Your job request is waiting to accept by parking owner. '
                            />
                            : null
                    }</Modal.Header>
                <Modal.Actions>
                    <Button negative onClick={() => setModalOpen(false)}>
                        OK!
                    </Button>
                </Modal.Actions>
            </Modal>
        </>
    )
}

export default Login