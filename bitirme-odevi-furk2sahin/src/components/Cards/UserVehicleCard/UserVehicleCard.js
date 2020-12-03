import React, { useState } from 'react'
import { Button, Card, Divider, Header, Icon, Modal } from 'semantic-ui-react'
import { deleteEntranceExitLog, deleteReportListItem, deleteVehicle, updateParkArea } from '../../../services/api';


const UserVehicleCard = ({ content, parkings, updateVehicles, parkAreas, setListedVehicleId, setListLogs, setListReports, allReports, allLogs }) => {
    const parkingName = parkings.find((parking) => parking.id.toString() === content.parking_id.toString()).name;
    const [deleteCarLoading, setDeleteCarLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const listLogClickHandler = (event, { id }) => {
        setListedVehicleId(id);
        setListLogs(true);
    }

    const listReportsClickHandler = (event, { id }) => {
        setListedVehicleId(id);
        setListReports(true);
    }

    const deleteCarClickHandler = async (event, { id }) => {
        setDeleteCarLoading(true);
        try {
            await deleteVehicle(id);
            const vehicleReportIds = allReports.filter((report) => report.vehicle_id.toString() === id.toString())
                .map((report) => report.id);
            const vehicleLogIds = allLogs.filter((log) => log.vehicle_id.toString() === id.toString())
                .map((log) => log.id);
            const areas = parkAreas.filter((area) => area.vehicle_id.toString() === id.toString() && area.is_full);
            areas.forEach(async (area) => await updateParkArea(Number(area.id), { ...area, vehicle_id: 0, is_full: false }));
            vehicleReportIds.forEach(async (report) => await deleteReportListItem(Number(report)));
            vehicleLogIds.forEach(async (log) => await deleteEntranceExitLog(Number(log)));
        } catch (error) {
        }
        setDeleteCarLoading(false);
        updateVehicles();
    }

    return (
        <>
            <Card>
                <Card.Content >
                    <Card.Header textAlign="center">{content.license_plate}</Card.Header>
                    <Divider />
                    <Card.Description textAlign="center">
                        Parking name <br /> <strong>{parkingName}</strong>
                    </Card.Description>
                </Card.Content>
                <Card.Content extra textAlign="center">
                    <Button.Group>
                        <Button id={content.id} animated="fade" basic color='green' onClick={listLogClickHandler}>
                            <Button.Content visible>List Logs</Button.Content>
                            <Button.Content hidden><Icon name="list" /></Button.Content>
                        </Button>
                        <Button id={content.id} animated="fade" basic color='blue' onClick={listReportsClickHandler}>
                            <Button.Content visible>List Reports</Button.Content>
                            <Button.Content hidden><Icon name="list" /></Button.Content>
                        </Button>
                    </Button.Group>
                    <Button
                        animated="fade"
                        basic
                        color='red'
                        onClick={() => setModalOpen(true)}
                    >
                        <Button.Content visible>Delete Car</Button.Content>
                        <Button.Content hidden><Icon name="trash alternate" /></Button.Content>
                    </Button>
                </Card.Content>
            </Card>
            <Modal
                basic
                dimmer="blurring"
                open={modalOpen}
                onClose={() => setModalOpen(false)}
            >
                <Header icon><Icon name="car" /> Delete this car?</Header>
                <Modal.Actions>
                    <Button negative onClick={() => setModalOpen(false)}>
                        No
                                    </Button>
                    <Button id={content.id} positive onClick={deleteCarClickHandler} loading={deleteCarLoading}>
                        Yes
                                    </Button>
                </Modal.Actions>
            </Modal>
        </>
    )
}

export default UserVehicleCard
