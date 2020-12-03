import React, { useContext, useEffect, useState } from 'react'
import { Button, Form, Grid, Icon, Message, Ref, Select, Sticky, Visibility } from 'semantic-ui-react'
import Contents from '../../components/Contents/Contents'
import Header from '../../components/Header/Header'
import { menuItems } from '../../components/MenuItems/MenuItems'
import SearchBar from '../../components/SearchBar/SearchBar'
import WelcomeCard from '../../components/WelcomeCard/WelcomeCard'
import SessionContext from '../../contexts/SessionContext'
import { getBlacklist, getEmployees, getEntranceExitLogs, getParkAreas, getParkings, getReportList, getVehicles } from '../../services/api'
import { Wrapper } from '../Wrapper'
import MoonLoader from 'react-spinners/MoonLoader'

const UserPage = () => {
    const { user } = useContext(SessionContext);
    const [vehicles, setVehicles] = useState([]);
    const [allVehicles, setAllVehicles] = useState([]);
    const [parkings, setParkings] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [parkAreas, setParkAreas] = useState([]);
    const [selectedParkingParkAreas, setSelectedParkingParkAreas] = useState([]);
    const [listLogs, setListLogs] = useState(false);
    const [placeholder, setPlaceholder] = useState("Select Parking");
    const [vehicleLogs, setVehicleLogs] = useState([]);
    const [blacklist, setBlacklist] = useState([]);
    const [allLogs, setAllLogs] = useState([]);
    const [listReports, setListReports] = useState(false);
    const [vehicleReports, setVehicleReports] = useState([]);
    const [allReports, setAllReports] = useState([]);
    const [listedVehicleId, setListedVehicleId] = useState(0);
    const [currentParkId, setCurrentParkId] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [userInput, setUserInput] = useState('');
    const [activeMenu, setActiveMenu] = useState(menuItems.user[0]);
    const [selectedCar, setSelectedCar] = useState("");
    const [selectedParking, setSelectedParking] = useState("");
    const [carError, setCarError] = useState(false);
    const [carOptions, setCarOptions] = useState([]);
    const contextRef = React.createRef();

    const date = new Date(user.registration_date);

    const person = {
        fullname: user.full_name,
        phone: "0" + user.phone,
        registrationDate: date,
    }

    const getFilteredVehicles = () => {
        return vehicles.filter((vehicle) => vehicle.license_plate.toLowerCase().indexOf(userInput.toLowerCase()) !== -1)
    }

    const handleOnChange = (event) => {
        setUserInput(event.target.value);
    }

    const handleHeaderOnClick = (event, { name }) => {
        setActiveMenu(name);
    }

    const backOnClickHandler = () => {
        setListReports(false);
        setListLogs(false);
    }

    const selectCarOnChangeHandler = (event, { value }) => {
        setSelectedCar(value);
        setCarError(false);
    }

    const selectParkingOnChangeHandler = (event, { value }) => {
        setSelectedParking(value);
    }

    const updateVehicles = async () => {
        setLoading(true);
        if (activeMenu === "Your Vehicles") {
            try {
                let { data } = await getVehicles();
                setAllVehicles(data);
                data = data.filter((vehicle) => user.id.toString() === vehicle.user_id.toString());
                setVehicles(data);
            } catch (err) {
                setError(err);
            }

            if (listLogs) {
                try {
                    const { data } = await getEntranceExitLogs();
                    setAllLogs(data);
                } catch (err) {
                    setError(err);
                }
            }
        } else if (activeMenu === "Park Your Car") {
            try {
                const { data } = await getParkAreas();
                setSelectedParkingParkAreas(data.filter(area => Number(area.parking_id) === currentParkId));
                setParkAreas(data);
            } catch (err) {
                setError(err);
            }
            try {
                const { data } = await getEntranceExitLogs();
                setAllLogs(data);
            } catch (err) {
                setError(err)
            }
        }

        setLoading(false);
    }

    useEffect(() => {
        const init = async () => {
            setLoading(true);
            try {
                let { data } = await getVehicles();
                data = data.filter((vehicle) => user.id === vehicle.user_id.toString());
                setVehicles(data);
            } catch (err) {
                setError(err);
            }

            try {
                let { data } = await getVehicles();
                setAllVehicles(data);
            } catch (err) {
                setError(err);
            }

            try {
                const { data } = await getParkings();
                setSelectedParking(data[0].name);
                setParkings(data);
            } catch (err) {
                setError(err);
            }

            try {
                const { data } = await getParkAreas();
                setParkAreas(data);
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
                const { data } = await getEmployees();
                setEmployees(data);
            } catch (err) {
                setError(err);
            }

            try {
                const { data } = await getReportList();
                setAllReports(data);
            } catch (err) {
                setError(err);
            }

            try {
                const { data } = await getBlacklist();
                setBlacklist(data);
            } catch (err) {
                setError(err);
            }
            setLoading(false);
        }
        init();
    }, [user.id])

    useEffect(() => {
        setSelectedCar('');
        const fullAreaVehicles = parkAreas.filter((area) => area.is_full)
            .map((area) => area.vehicle_id)
        setCarOptions(vehicles.filter((vehicle) => vehicle.user_id.toString() === user.id.toString() && !fullAreaVehicles.includes(vehicle.id.toString()))
            .map((vehicle) => ({ text: vehicle.license_plate, value: vehicle.license_plate, ...vehicle })))
    }, [parkAreas, vehicles, user.id])

    useEffect(() => {
        const getParkAreasBySelectedCar = () => {
            if (selectedCar !== "" && parkings.length !== 0 && parkAreas.length !== 0) {
                const parkingId = parkings.find((parking) => Number(parking.id) === Number(allVehicles.find(vehicle => vehicle.license_plate === selectedCar).parking_id)).id;
                setCurrentParkId(Number(parkingId));
                setSelectedParkingParkAreas(parkAreas.filter((area) => area.parking_id.toString() === parkingId.toString()));
                setPlaceholder(parkings.find(parking => Number(parking.id) === Number(parkingId)).name);
                setSelectedParking("");
            }
        }
        getParkAreasBySelectedCar();
    }, [selectedCar, parkAreas, allVehicles, parkings])

    useEffect(() => {
        const getParkAreasBySelectedParking = () => {
            if (selectedParking !== "" && parkings.length !== 0 && parkAreas.length !== 0) {
                const parkingId = parkings.find((parking) => parking.name === selectedParking).id;
                setCurrentParkId(Number(parkingId));
                setSelectedParkingParkAreas(parkAreas.filter((area) => area.parking_id.toString() === parkingId.toString()));
                setSelectedCar("");
            }
        }
        getParkAreasBySelectedParking();
    }, [selectedParking, parkAreas, parkings])

    useEffect(() => {
        console.log(listLogs);
        const getListedVehicleLogs = async () => {
            setLoading(true);
            try {
                let { data } = await getEntranceExitLogs();
                setAllLogs(data);
                data = data.filter((log) => log.vehicle_id.toString() === listedVehicleId.toString());
                setVehicleLogs(data);
            } catch (err) {
                setError(err);
            }
            setLoading(false);
        }
        const getListedVehicleReports = async () => {
            setLoading(true);
            try {
                let { data } = await getReportList();
                data = data.filter((report) => report.vehicle_id.toString() === listedVehicleId.toString());
                setVehicleReports(data);
            } catch (err) {
                setError(err);
            }
            setLoading(false);
        }
        if (listLogs)
            getListedVehicleLogs();
        else if (listReports)
            getListedVehicleReports();
    }, [listLogs, listReports, listedVehicleId])

    useEffect(() => {
        const update = async () => {
            setLoading(true);
            if (activeMenu === "Your Vehicles") {
                try {
                    let { data } = await getVehicles();
                    setAllVehicles(data);
                    data = data.filter((vehicle) => user.id.toString() === vehicle.user_id.toString());
                    setVehicles(data);
                } catch (err) {
                    setError(err);
                }

                if (listLogs) {
                    try {
                        const { data } = await getEntranceExitLogs();
                        setAllLogs(data);
                    } catch (err) {
                        setError(err);
                    }
                }
            } else if (activeMenu === "Park Your Car") {
                setListLogs(false);
                try {
                    const { data } = await getParkAreas();
                    setSelectedParkingParkAreas(data.filter(area => Number(area.parking_id) === currentParkId));
                    setParkAreas(data);
                } catch (err) {
                    setError(err);
                }
                try {
                    const { data } = await getEntranceExitLogs();
                    setAllLogs(data);
                } catch (err) {
                    setError(err)
                }
            }
            setListReports(false);
            setLoading(false);
        }
        update();
    }, [activeMenu, currentParkId, user.id, listLogs])

    const parkingOptions = parkings.map((parking) => ({ text: parking.name, value: parking.name, ...parking }))
    return (
        <>
            <Header menuItems={menuItems.user} activeMenu={activeMenu} handleHeaderOnClick={handleHeaderOnClick} />
            <Wrapper>
                <Sticky context={contextRef}>
                    <Grid centered>
                        {activeMenu === 'Your Vehicles' && !listLogs && !listReports ?
                            <SearchBar userInput={userInput} onChange={handleOnChange} placeholder="Search by license plate..." />
                            : activeMenu === 'Your Vehicles' && (listLogs || listReports) ?
                                <div style={{ marginBottom: "1%", marginTop: "1%" }}>
                                    <Button animated primary onClick={backOnClickHandler}>
                                        <Button.Content visible>Back</Button.Content>
                                        <Button.Content hidden><Icon name="arrow left" /></Button.Content>
                                    </Button>
                                </div>
                                :
                                <>
                                    <div style={{ marginBottom: "1%", marginTop: "1%", color: error ? "red" : "" }}>
                                        <Form>
                                            <Form.Field
                                                loading={loading}
                                                value={selectedCar}
                                                onChange={selectCarOnChangeHandler}
                                                required
                                                control={Select}
                                                options={carOptions}
                                                placeholder='Choose your car'
                                                search
                                                error={carError}
                                            />
                                        </Form>
                                    </div>

                                    <div style={{ marginBottom: "1%", marginTop: "1%" }}>
                                        <Form.Field
                                            loading={loading}
                                            value={selectedParking}
                                            onChange={selectParkingOnChangeHandler}
                                            required
                                            control={Select}
                                            options={parkingOptions}
                                            placeholder={placeholder}
                                            search
                                        />
                                    </div>
                                </>
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
                                        {activeMenu === 'Your Vehicles' && parkings.length !== 0 ?
                                            listLogs ?
                                                <Contents
                                                    contents={vehicleLogs}
                                                    vehicles={vehicles}
                                                    parkings={parkings}
                                                    getContent="LogCard"
                                                /> :
                                                listReports ?
                                                    <Contents
                                                        contents={vehicleReports}
                                                        vehicles={vehicles}
                                                        parkings={parkings}
                                                        employees={employees}
                                                        getContent="UserVehicleReportCard"
                                                    />
                                                    :
                                                    <Contents
                                                        allReports={allReports}
                                                        parkAreas={parkAreas}
                                                        allLogs={allLogs}
                                                        contents={getFilteredVehicles()}
                                                        getContent="UserVehicleCard"
                                                        parkings={parkings}
                                                        updateVehicles={updateVehicles}
                                                        setListLogs={setListLogs}
                                                        setListReports={setListReports}
                                                        setListedVehicleId={setListedVehicleId}
                                                        blacklist={blacklist}
                                                    />
                                            : activeMenu === "Park Your Car" ?
                                                <Contents
                                                    allLogs={allLogs}
                                                    contents={selectedParkingParkAreas}
                                                    selectedCar={selectedCar}
                                                    allVehicles={allVehicles}
                                                    vehicles={vehicles}
                                                    updateVehicles={updateVehicles}
                                                    setCarError={setCarError}
                                                    getContent="ParkAreaCard"
                                                />
                                                : null
                                        }
                                    </Visibility>
                            }
                        </Grid.Column>
                        <Grid.Column width="3">
                            <Sticky context={contextRef}>
                                <WelcomeCard person={person} />
                            </Sticky>
                        </Grid.Column>
                    </Grid>
                </Ref>
            </Wrapper >
        </>
    )
}

export default UserPage
