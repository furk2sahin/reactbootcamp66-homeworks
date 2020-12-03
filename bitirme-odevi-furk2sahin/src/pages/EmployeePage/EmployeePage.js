import React, { useContext, useEffect, useState } from 'react'
import { MoonLoader } from 'react-spinners';
import { Grid, Message, Ref, Sticky, Visibility } from 'semantic-ui-react';
import Contents from '../../components/Contents/Contents';
import Header from '../../components/Header/Header'
import { menuItems } from '../../components/MenuItems/MenuItems'
import SearchBar from '../../components/SearchBar/SearchBar';
import WelcomeCard from '../../components/WelcomeCard/WelcomeCard';
import SessionContext from '../../contexts/SessionContext';
import { getEntranceExitLogs, getParkAreas, getParkings, getReportList, getVehicles } from '../../services/api';
import { Wrapper } from '../Wrapper';

const EmployeePage = () => {
    const { user } = useContext(SessionContext);
    const [activeMenu, setActiveMenu] = useState(menuItems.employee[0]);
    const [userInput, setUserInput] = useState('');
    const [parkAreas, setParkAreas] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [reports, setReports] = useState([]);
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [parkings, setParkings] = useState([]);
    const [error, setError] = useState("");

    const contextRef = React.createRef();

    const handleHeaderOnClick = (event, { name }) => {
        setActiveMenu(name);
    }

    const handleReportSearchOnChange = (event) => {
        setUserInput(event.target.value);
    }

    const handleLogSearchOnChange = (event) => {
        setUserInput(event.target.value);
    }

    const updateReports = async () => {
        try {
            const { data } = await getReportList();
            setReports(data);
        } catch (err) {
            setError(err);
        }
    }

    useEffect(() => {
        setUserInput("");
    }, [activeMenu])

    useEffect(() => {
        const init = async () => {
            setLoading(true);
            try {
                let { data } = await getParkAreas();
                data.filter((parkArea) => parkArea.parking_id.toString() === user.parking_id.toString());
                setParkAreas(data);
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
                const { data } = await getReportList();
                setReports(data);
            } catch (err) {
                setError(err);
            }
            try {
                const { data } = await getParkings();
                setParkings(data);
            } catch (err) {
                setError(err);
            }
            try {
                const { data } = await getEntranceExitLogs();
                setLogs(data);
            } catch (err) {
                setError(err);
            }
            setLoading(false);
        }
        init();
    }, [user.parking_id])

    const person = {
        fullname: user.full_name,
        phone: "0" + user.phone,
        registrationDate: new Date(user.starting_date),
    }

    const getFilteredCars = () => {
        const filteredVehicles = vehicles.filter((vehicle) => vehicle.license_plate.toLowerCase().indexOf(userInput.toLowerCase()) !== -1 && Number(vehicle.parking_id) === Number(user.parking_id))
            .map((vehicle) => vehicle.id);
        if (filteredVehicles.length === vehicles.length)
            return parkAreas.filter((area) => filteredVehicles.includes(area.vehicle_id.toString()));
        else
            return parkAreas.filter((area) => filteredVehicles.includes(area.vehicle_id.toString()) && area.is_full);
    }

    const getFilteredLogs = () => {
        const filteredVehicles = vehicles.filter((vehicle) => vehicle.license_plate.toLowerCase().indexOf(userInput.toLowerCase()) !== -1 && Number(vehicle.parking_id) === Number(user.parking_id))
            .map((vehicle) => vehicle.id.toString());
        return logs.filter((log) => filteredVehicles.includes(log.vehicle_id.toString()));
    }

    return (
        <>
            <Header menuItems={menuItems.employee} activeMenu={activeMenu} handleHeaderOnClick={handleHeaderOnClick} />

            <Wrapper>
                <Sticky context={contextRef}>
                    <Grid centered>
                        {!loading ?
                            activeMenu === "Report A Car" ?
                                getFilteredCars().length === 0 && userInput === "" ?
                                    <Message negative header="There is car in park areas." />
                                    :
                                    <SearchBar userInput={userInput} onChange={handleReportSearchOnChange} placeholder="Search by license plate..." />
                                : activeMenu === "Entrance Exit Log" ?
                                    getFilteredLogs().length === 0 && userInput === "" ?
                                        <Message negative header="There is no log." />
                                        :
                                        <SearchBar userInput={userInput} onChange={handleLogSearchOnChange} placeholder="Search by license plate..." />
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
                                        {activeMenu === 'Report A Car' ?
                                            <Contents
                                                contents={getFilteredCars()}
                                                vehicles={vehicles}
                                                parkings={parkings}
                                                reports={reports}
                                                updateReports={updateReports}
                                                getContent="EmployeeReportCard"
                                            /> : activeMenu === "Entrance Exit Log" ?
                                                <Contents
                                                    contents={getFilteredLogs()}
                                                    parkings={parkings}
                                                    vehicles={vehicles}
                                                    getContent="LogCard"
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

export default EmployeePage
