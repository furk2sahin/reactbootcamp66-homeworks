import React, { useContext, useEffect, useState } from 'react'
import { MoonLoader } from 'react-spinners'
import { Button, Card, Divider, Form, Grid, Icon, Message, Ref, Sticky, Visibility } from 'semantic-ui-react'
import Contents from '../../components/Contents/Contents'
import Header from '../../components/Header/Header'
import { menuItems } from '../../components/MenuItems/MenuItems'
import SearchBar from '../../components/SearchBar/SearchBar'
import WelcomeCard from '../../components/WelcomeCard/WelcomeCard'
import SessionContext from '../../contexts/SessionContext'
import {
    createParkArea,
    createParking,
    getBlacklist,
    getEmployees,
    getEntranceExitLogs,
    getParkAreas,
    getParkings,
    getReportList,
    getUsers,
    getVehicles,
} from '../../services/api'
import { Wrapper } from '../Wrapper'

const ParkingOwnerPage = () => {
    const { user } = useContext(SessionContext);
    const [activeMenu, setActiveMenu] = useState(menuItems.parkingOwner[0]);
    const [parkingName, setParkingName] = useState("");
    const [parkingNameError, setParkingNameError] = useState(false);
    const [parkAreaCount, setParkAreaCount] = useState("");
    const [parkAreaCountError, setParkAreaCountError] = useState(false);
    const [alreadyExistError, setAlreadyExistError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [vehicles, setVehicles] = useState([]);
    const [parkings, setParkings] = useState([]);
    const [currentParkingId, setCurrentParkingId] = useState(0);
    const [employees, setEmployees] = useState([]);
    const [blacklist, setBlacklist] = useState([]);
    const [users, setUsers] = useState([]);
    const [parkAreas, setParkAreas] = useState([]);
    const [logs, setLogs] = useState([]);
    const [allLogs, setAllLogs] = useState([]);
    const [reports, setReports] = useState([]);
    const [allReports, setAllReports] = useState([]);
    const [loading, setLoading] = useState(false);
    const [createLoading, setCreateLoading] = useState(false);
    const [error, setError] = useState("");
    const [userInput, setUserInput] = useState('');
    const contextRef = React.createRef();

    const handleHeaderOnClick = (event, { name }) => {
        setActiveMenu(name);
    }

    const person = {
        fullname: user.full_name,
        phone: "0" + user.phone,
    }

    useEffect(() => {
        setUserInput("");

        const init = async () => {
            setLoading(true);
            try {
                const { data } = await getParkings();
                if (data.some(parking => Number(parking.owner_id) === Number(user.id))) {
                    setCurrentParkingId(Number(data.find(parking => Number(parking.owner_id) === Number(user.id)).id))
                }
                setParkings(data);
            } catch (err) {
                setError(err);
            }

            if (activeMenu === "Create Parking") {
                try {
                    const { data } = await getParkings();
                    if (data.some(parking => Number(parking.owner_id) === Number(user.id))) {
                        setCurrentParkingId(Number(data.find(parking => Number(parking.owner_id) === Number(user.id)).id))
                        setActiveMenu(menuItems.parkingOwner[1])
                        setParkings(data);
                    }
                } catch (err) {
                    setError(err);
                }
            } else if (activeMenu === "Entrance Exit Log") {
                try {
                    const { data } = await getVehicles();
                    setVehicles(data);
                } catch (err) {
                    setError(err);
                }

                try {
                    const { data } = await getEntranceExitLogs();
                    setLogs(data);
                } catch (err) {
                    setError(err);
                }
            } else if (activeMenu === "Report List") {
                try {
                    const { data } = await getReportList();
                    setAllReports(data);
                    setReports(data.filter((report) => report.is_active && Number(report.parking_id) === currentParkingId));
                } catch (err) {
                    setError(err);
                }

                try {
                    let { data } = await getEmployees();
                    setEmployees(data);
                } catch (err) {
                    setError(err);
                }

                try {
                    const { data } = await getVehicles();
                    setVehicles(data);
                } catch (err) {
                    setError(err);
                }

                try {
                    const { data } = await getEntranceExitLogs();
                    setAllLogs(data);
                } catch (err) {
                    setError(err);
                }

                try {
                    const { data } = await getParkings();
                    if (data.some(parking => Number(parking.owner_id) === Number(user.id))) {
                        const parkingId = data.find(parking => Number(parking.owner_id) === Number(user.id)).id;
                        const areas = await getParkAreas();
                        setParkAreas(areas.data.filter(parkArea =>
                            Number(parkingId) === Number(parkArea.parking_id)));
                    } else {
                        setParkAreas([]);
                    }
                } catch (err) {
                    setError(err);
                }
            } else if (activeMenu === "List Park Area") {
                try {
                    const { data } = await getParkings();
                    if (data.some(parking => Number(parking.owner_id) === Number(user.id))) {
                        const parkingId = data.find(parking => Number(parking.owner_id) === Number(user.id)).id;
                        const areas = await getParkAreas();
                        setParkAreas(areas.data.filter(parkArea =>
                            Number(parkingId) === Number(parkArea.parking_id)));
                    } else {
                        setParkAreas([]);
                    }
                } catch (err) {
                    setError(err);
                }
            } else if (activeMenu === "Employee Requests") {
                try {
                    const { data } = await getEmployees();
                    setEmployees(data);
                } catch (err) {
                    setError(err);
                }
            } else if (activeMenu === "List Vehicles") {
                try {
                    const { data } = await getVehicles();
                    setVehicles(data);
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
                    const { data } = await getParkings();
                    setParkings(data);
                } catch (err) {
                    setError(err);
                }
            } else if (activeMenu === "Blacklist") {
                try {
                    const { data } = await getBlacklist();
                    setBlacklist(data);
                } catch (err) {
                    setError(err);
                }
            }
            setLoading(false);
        }
        init();
    }, [activeMenu, user.id, currentParkingId])

    const updateEmployees = async () => {
        setLoading(true);
        try {
            let { data } = await getEmployees();
            setEmployees(data);
        } catch (err) {
            setError(err);
        }
        setLoading(false);
    }

    const updateReports = async () => {
        setLoading(true);
        try {
            const { data } = await getReportList();
            setAllReports(data);
            setReports(data.filter((report) => report.is_active && Number(report.parking_id) === currentParkingId));
        } catch (err) {
            setError(err);
        }
        setLoading(false);
    }

    const getFilteredReports = () => {
        const filteredVehicles = vehicles.filter((vehicle) => vehicle.license_plate.toLowerCase().indexOf(userInput.toLowerCase()) !== -1)
            .map((vehicle) => vehicle.id.toString());
        return reports.filter((report) => filteredVehicles.includes(report.vehicle_id.toString()));
    }

    const updateBlacklist = async () => {
        setLoading(true);
        try {
            const { data } = await getBlacklist();
            setBlacklist(data);
        } catch (err) {
            setError(err);
        }
        setLoading(false);
    }

    const updateParkings = async () => {
        setLoading(true);
        try {
            const { data } = await getParkings();
            setParkings(data);
            if (data.some(parking => Number(parking.owner_id) === Number(user.id))) {
                setCurrentParkingId(Number(data.find(parking => Number(parking.owner_id) === Number(user.id)).id))
            }
        } catch (err) {
            setError(err);
        }
        setLoading(false);
    }

    const handleParkAreaCountChange = (event, { value }) => {
        if ((/^[0-9]+$/.test(value) || value === '') && Number(value) < 16) {
            setParkAreaCount(value);
            if (alreadyExistError)
                setAlreadyExistError(false);
            if (parkAreaCountError)
                setParkAreaCountError(false);
        }
    }

    const handleParkingNameChange = (event, { value }) => {
        if ((/^[a-zA-Z ]+$/.test(value) || value === '') && value.length < 25) {
            setParkingName(value);
            if (alreadyExistError)
                setAlreadyExistError(false);
            if (parkingNameError)
                setParkingNameError(false);
        }
    }

    const handleSearchOnChange = (event) => {
        setUserInput(event.target.value);
    }

    const createOnClickHandle = async () => {
        setCreateLoading(true);
        if (parkingName.trim().replace(/\s\s+/g, ' ').length < 5)
            setParkingNameError(true);
        else if (Number(parkAreaCount) < 1) {
            setParkAreaCountError(true);
        } else if (parkings.some((parking) => parking.name === parkingName.toUpperCase())) {
            setAlreadyExistError(true);
        } else {
            setParkingName("");
            setParkAreaCount("");
            try {
                const { data } = await createParking({
                    owner_id: Number(user.id),
                    name: parkingName.trim().replace(/\s\s+/g, ' ').toUpperCase(),
                    park_area_count: Number(parkAreaCount)
                })
                setSuccess(true);
                setTimeout(() => {
                    updateParkings();
                    setActiveMenu(menuItems.parkingOwner[1])
                }, 1000);
                for (let i = 0; i < Number(parkAreaCount); i++)
                    await createParkArea({
                        parking_id: Number(data.id),
                        vehicle_id: 0,
                        is_full: false
                    });
            } catch (err) {
                setError(err);
            }
            setSuccess(false);
        }
        setCreateLoading(false);
    }

    const getFilteredLogs = () => {
        const filteredVehicles = vehicles.filter((vehicle) => Number(vehicle.parking_id) === Number(currentParkingId) && vehicle.license_plate.toLowerCase().indexOf(userInput.toLowerCase()) !== -1)
            .map((vehicle) => vehicle.id.toString());
        return logs.filter((log) => filteredVehicles.includes(log.vehicle_id.toString()));
    }

    const getFilteredEmployees = () => {
        return employees.filter(employee => !employee.is_accepted &&
            Number(employee.parking_id) === Number(currentParkingId) &&
            employee.full_name.toLowerCase().indexOf(userInput.toLowerCase()) !== -1)
    }

    const getFilteredVehicles = () => {
        return vehicles.filter(vehicle => Number(vehicle.parking_id) === Number(currentParkingId) &&
            vehicle.license_plate.toLowerCase().indexOf(userInput.toLowerCase()) !== -1);
    }

    return (
        <>
            { parkings.some((parking) => parking.owner_id.toString() === user.id.toString()) ?
                <Header menuItems={menuItems.parkingOwner.slice(1, 7)} activeMenu={activeMenu} handleHeaderOnClick={handleHeaderOnClick} />
                : <Header menuItems={menuItems.parkingOwner} activeMenu={activeMenu} handleHeaderOnClick={handleHeaderOnClick} />
            }
            <Wrapper>
                <Sticky context={contextRef}>
                    <Grid centered>
                        {!loading ?
                            activeMenu === "Employee Requests" ?
                                getFilteredEmployees().length === 0 && userInput === "" ?
                                    <Message positive header="There is no new requests" />
                                    :
                                    <SearchBar userInput={userInput} onChange={handleSearchOnChange} placeholder="Search by name..." />
                                : activeMenu === "Entrance Exit Log" ?
                                    getFilteredLogs().length === 0 && userInput === "" ?
                                        <Message negative header="There is no content" />
                                        :
                                        <SearchBar userInput={userInput} onChange={handleSearchOnChange} placeholder="Search by license plate..." />
                                    : activeMenu === "Report List" ?
                                        getFilteredReports().length === 0 && userInput === "" ?
                                            <Message negative header="There is no content" />
                                            :
                                            <SearchBar userInput={userInput} onChange={handleSearchOnChange} placeholder="Search by license plate..." />
                                        : activeMenu === "List Vehicles" ?
                                            getFilteredVehicles().length === 0 && userInput === "" ?
                                                <Message positive header="There is no content" />
                                                :
                                                <SearchBar userInput={userInput} onChange={handleSearchOnChange} placeholder="Search by license plate..." />
                                            : null
                            : null
                        }
                    </Grid>
                </Sticky>

                <Ref innerRef={contextRef}>
                    <Grid>
                        <Grid.Column width="13">
                            {loading && !error ?
                                <div style={{ marginLeft: "50%" }}>
                                    <MoonLoader size="75px" color="#36D7B7"></MoonLoader>
                                </div>
                                : error ? <Message negative>{error.toString()}</Message> :
                                    <Visibility>
                                        {activeMenu === 'Create Parking' ?
                                            <><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                                                <Grid>
                                                    <Grid.Column width="5" floated="left"></Grid.Column>
                                                    <Grid.Column floated="left" width="5">
                                                        <Card>
                                                            <Card.Content >
                                                                <Card.Header textAlign="center">
                                                                    <strong>
                                                                        Create your own parking
                                                                    </strong>
                                                                </Card.Header>
                                                                <Divider />
                                                                <Card.Description>
                                                                    <Form>
                                                                        <Form.Input
                                                                            required
                                                                            value={parkingName}
                                                                            label='Parking Name'
                                                                            placeholder="Parking Name (5-24)"
                                                                            error={parkingNameError}
                                                                            onChange={handleParkingNameChange}
                                                                        />
                                                                        <Form.Input
                                                                            required
                                                                            value={parkAreaCount}
                                                                            label='Park Area Count'
                                                                            placeholder="max 15"
                                                                            error={parkAreaCountError}
                                                                            onChange={handleParkAreaCountChange}
                                                                        />
                                                                    </Form>
                                                                </Card.Description>
                                                            </Card.Content>
                                                            {success ?
                                                                <Message positive header="Parking created successfully." />
                                                                :
                                                                alreadyExistError ?
                                                                    <Message negative header="This parking name already exist." />
                                                                    : null
                                                            }
                                                            <Card.Content extra textAlign="center">
                                                                <Button fluid animated="fade" positive onClick={createOnClickHandle} loading={createLoading}>
                                                                    <Button.Content visible>Create</Button.Content>
                                                                    <Button.Content hidden><Icon name="add" /></Button.Content>
                                                                </Button>
                                                            </Card.Content >
                                                        </Card>
                                                    </Grid.Column>
                                                    <Grid.Column width="5" floated="right"></Grid.Column>
                                                </Grid>
                                            </>
                                            : activeMenu === "Employee Requests" ?
                                                <Contents
                                                    contents={getFilteredEmployees()}
                                                    updateEmployees={updateEmployees}
                                                    getContent="EmployeeRequestCard"
                                                />
                                                : activeMenu === "Entrance Exit Log" ?
                                                    <Contents
                                                        contents={getFilteredLogs()}
                                                        parkings={parkings}
                                                        vehicles={vehicles}
                                                        getContent="LogCard"
                                                    />
                                                    : activeMenu === "Report List" ?
                                                        <Contents
                                                            contents={getFilteredReports()}
                                                            allLogs={allLogs}
                                                            allReports={allReports}
                                                            vehicles={vehicles}
                                                            parkings={parkings}
                                                            employees={employees}
                                                            parkAreas={parkAreas}
                                                            updateReports={updateReports}
                                                            getContent="ParkingOwnerReportCard"
                                                        />
                                                        : activeMenu === "Blacklist" ?
                                                            <Contents
                                                                contents={blacklist.filter(item => Number(item.parking_id) === Number(currentParkingId))}
                                                                vehicles={vehicles}
                                                                updateBlacklist={updateBlacklist}
                                                                getContent="BlacklistCard"
                                                            />
                                                            : activeMenu === "List Park Area" ?
                                                                <Contents
                                                                    contents={parkAreas}
                                                                    allLogs={allLogs}
                                                                    allVehicles={vehicles}
                                                                    getContent="ParkAreaCard"
                                                                />
                                                                : activeMenu === "List Vehicles" && users.length !== 0 && getFilteredVehicles().length !== 0 && parkings.length !== 0 ?
                                                                    <Contents
                                                                        contents={getFilteredVehicles()}
                                                                        parkings={parkings}
                                                                        users={users}
                                                                        getContent="ParkingOwnerVehicleCard"
                                                                    />
                                                                    : null
                                        }
                                    </Visibility>
                            }
                        </Grid.Column>

                        <Grid.Column width="3">
                            <Sticky context={contextRef}>
                                {!loading ?
                                    <WelcomeCard person={person} />
                                    : null
                                }

                            </Sticky>
                        </Grid.Column>
                    </Grid>
                </Ref>
            </Wrapper >

        </>
    )
}

export default ParkingOwnerPage
