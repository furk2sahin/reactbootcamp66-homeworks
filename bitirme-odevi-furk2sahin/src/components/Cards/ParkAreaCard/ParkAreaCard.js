import React, { useContext, useState } from 'react'
import { Button, Card, Divider, Icon } from 'semantic-ui-react'
import SessionContext from '../../../contexts/SessionContext'
import { createEntranceExitLog, updateEntranceExitLog, updateParkArea } from '../../../services/api'
import { WordBreaker } from '../../WelcomeCard/Welcome.styles'

const ParkAreaCard = ({ content, vehicles, allVehicles, index, updateVehicles, setCarError, selectedCar, allLogs }) => {
    const { authenticated } = useContext(SessionContext);
    const isDefined = allVehicles.filter((vehicle) => vehicle.id.toString() === content.vehicle_id.toString());
    const [entranceExitLoading, setEntranceExit] = useState(false);


    const handleParkHereOnClick = async () => {
        if (selectedCar !== "") {
            const id = vehicles.find((vehicle) => selectedCar === vehicle.license_plate).id;
            try {
                setEntranceExit(true);
                await updateParkArea(content.id, { ...content, vehicle_id: id, is_full: true });
                await createEntranceExitLog({ entrance_time: new Date(), vehicle_id: id, parking_id: content.parking_id, exit_time: "Still inside", park_area_number: Number(index) + 1 });
            } catch (error) {
            }
            updateVehicles();
            setEntranceExit(true)
        } else {
            setCarError(true);
        }
    }

    const handleExitOnClick = async () => {
        try {
            setEntranceExit(true);
            const logId = allLogs.find((log) => Number(log.vehicle_id) === Number(content.vehicle_id) && log.exit_time === "Still inside").id;
            await updateParkArea(content.id, { ...content, vehicle_id: 0, is_full: false });
            await updateEntranceExitLog(logId, { exit_time: new Date() });
        } catch (error) {
            console.log(error);
        }
        updateVehicles();
        setEntranceExit(false);
    }

    return (
        <Card>
            <div style={{ border: "5px solid", borderColor: !content.is_full ? "greenyellow" : "red" }} >
                <Card.Content >
                    <Card.Header textAlign="center">Park Area <strong>{index + 1}</strong></Card.Header>
                    <Divider />
                    <Card.Description textAlign="center">
                        <WordBreaker>License Plate <br />
                            <h2>
                                {content.is_full && isDefined.length === 1 ?
                                    <div style={{ border: "1px solid red" }}> {isDefined[0].license_plate} <Icon name="car" /></div>
                                    :
                                    "None"
                                }
                            </h2>
                        </WordBreaker>
                    </Card.Description>
                    {authenticated === "User" ?
                        <Card.Content extra textAlign="center">
                            {!content.is_full ?
                                <Button fluid animated="fade" positive onClick={handleParkHereOnClick} loading={entranceExitLoading}>
                                    <Button.Content visible>Park here</Button.Content>
                                    <Button.Content hidden><Icon name="add" /></Button.Content>
                                </Button>
                                : isDefined.length === 1 && vehicles.some((vehicle) => vehicle.license_plate === isDefined[0].license_plate) ?
                                    <Button fluid animated="fade" primary onClick={handleExitOnClick} loading={entranceExitLoading}>
                                        <Button.Content visible>Exit</Button.Content>
                                        <Button.Content hidden><Icon name="sign-out" /></Button.Content>
                                    </Button>
                                    :
                                    <Button fluid disabled negative>Full</Button>
                            }
                        </Card.Content>
                        : null
                    }
                </Card.Content>
            </div>
        </Card>
    )
}

export default ParkAreaCard
