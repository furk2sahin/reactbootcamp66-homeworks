import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Divider, Form, Icon, Message, Modal } from 'semantic-ui-react'
import SessionContext from '../../../contexts/SessionContext';
import { createVehicle } from '../../../services/api';
import LicensePlateInput from './LicensePlateInput';

const AddNewVehicleCard = ({ vehicles, parkings, updateVehicles, blacklist }) => {
    const [parkingError, setParkingError] = useState(false);
    const [licensePlateError, setLicensePlateError] = useState(false);
    const [alreadyError, setAlreadyError] = useState(false);
    const [inBlacklistError, setInBlacklistError] = useState(false);
    const [licensePlate, setLicensePlate] = useState('');
    const [checkedValue, setCheckedValue] = useState('');
    const [createError, setCreateError] = useState("");
    const [createLoading, setCreateLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const { user } = useContext(SessionContext);

    const onClickHandler = () => {
        const checkedLisencePlate = licensePlate.trim().replace(/\s\s+/g, ' ');
        if (vehicles.some((vehicle) => vehicle.license_plate.toUpperCase() === checkedLisencePlate.toUpperCase())) {
            setAlreadyError(true);
            setModalOpen(true);
        } else if (blacklist.some(element => element.license_plate.toUpperCase() === checkedLisencePlate.toUpperCase() &&
            Number(element.parking_id) === Number(parkings.find(parking => parking.name === checkedValue).id))) {
            setInBlacklistError(true);
            setModalOpen(true);
        } else if (!(checkedLisencePlate.split(' ').length === 3) ||
            isNaN(checkedLisencePlate.split(' ')[0]) ||
            checkedLisencePlate.split(' ')[0].length > 2 ||
            !(/^[a-zA-Z]+$/.test(checkedLisencePlate.split(' ')[1])) ||
            checkedLisencePlate.split(' ')[1].length > 3 ||
            isNaN(checkedLisencePlate.split(' ')[2]) ||
            checkedLisencePlate.split(' ')[2].length > 4
        ) {
            setLicensePlateError(true);
        } else {
            setLicensePlateError(false);
            if (checkedValue === '') {
                setParkingError(true);
            } else {
                setModalOpen(true);
            }
        }
    }

    const checkboxOnChangeHandler = (event, { value }) => {
        setCheckedValue(value);
        setInBlacklistError(false);
    }

    const handleLicensePlateChange = (event, { value }) => {
        if (value.length < 12)
            setLicensePlate(value);
        if (licensePlateError)
            setLicensePlateError(false);
        if (alreadyError)
            setAlreadyError(false);
        if (inBlacklistError)
            setInBlacklistError(false);
    }

    useEffect(() => {
        setParkingError(false);
    }, [checkedValue])

    const modalOKButtonHandler = async () => {
        const checkedLisencePlate = licensePlate.trim().replace(/\s\s+/g, ' ');
        const vehicle = {
            license_plate: checkedLisencePlate.toUpperCase(),
            parking_id: parkings.find((parking) => parking.name === checkedValue).id,
            user_id: user.id,
        }
        setCreateLoading(true);
        try {
            await createVehicle(vehicle);
        } catch (err) {
            setCreateError(err);
        }
        setCreateLoading(false);
        updateVehicles();
        setModalOpen(false);
    }
    return (
        <>
            <Card>
                <Card.Content >
                    <Card.Header textAlign="center">Add New Vehicle</Card.Header>
                    <Divider />
                    {!createError ?
                        <Card.Description textAlign="center">
                            <Form size="big">
                                <LicensePlateInput
                                    licensePlate={licensePlate}
                                    handleLicensePlateChange={handleLicensePlateChange}
                                    licensePlateError={licensePlateError}
                                />
                                <strong>Choose parking</strong>
                                {parkings.map((parking, index) =>
                                    <Form.Checkbox
                                        key={index}
                                        radio
                                        label={parking.name}
                                        value={parking.name}
                                        checked={checkedValue === parking.name}
                                        onChange={checkboxOnChangeHandler}
                                        error={parkingError}
                                    />
                                )}
                            </Form>
                        </Card.Description>
                        :
                        <Message negative>{createError.toString()}</Message>
                    }

                </Card.Content>
                <Card.Content extra textAlign="center">
                    <Button fluid animated basic color='green' onClick={onClickHandler}>
                        <Button.Content visible>Add</Button.Content>
                        <Button.Content hidden><Icon name="add" /></Button.Content>
                    </Button>
                </Card.Content>
            </Card>
            <Modal
                dimmer="blurring"
                open={modalOpen}
                onClose={() => setModalOpen(false)}
            >
                <Modal.Header>
                    {
                        alreadyError || inBlacklistError ? "Something wrong!"
                            : "Are you sure?"
                    }
                </Modal.Header>
                <Modal.Content>
                    {
                        alreadyError
                            ?
                            <Message
                                negative
                                header='This license plate already declared.'
                            />
                            : inBlacklistError ?
                                <Message
                                    negative
                                    header='This car in black list.'
                                />
                                :
                                <h3>
                                    License Plate: <i style={{ color: "red" }}>{licensePlate}</i><br />
                                        Parking: <i style={{ color: "red" }}>{checkedValue}</i><br />
                                </h3>
                    }

                </Modal.Content>
                <Modal.Actions>
                    <Button negative onClick={() => setModalOpen(false)}>
                        {
                            alreadyError || inBlacklistError ? "OK!"
                                : "Nope, something wrong"
                        }
                    </Button>

                    {
                        alreadyError || inBlacklistError ? null
                            : <Button positive onClick={modalOKButtonHandler} loading={createLoading}>
                                Add my car
                            </Button>
                    }

                </Modal.Actions>
            </Modal>
        </>
    )
}

export default AddNewVehicleCard
