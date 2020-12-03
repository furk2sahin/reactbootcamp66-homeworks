import React, { useState } from 'react'
import { Button, Card, Divider, Icon } from 'semantic-ui-react'
import { createBlacklistItem, deleteEntranceExitLog, deleteReportListItem, deleteVehicle, updateParkArea, updateReportListItem } from '../../../services/api'
import DateFormatter from '../../DateFormatter/DateFormatter'
import { WordBreaker } from '../../WelcomeCard/Welcome.styles'

const ParkingOwnerReportCard = ({ content, vehicles, parkings, employees, updateReports, allLogs, parkAreas, allReports }) => {
    const [rejectLoading, setRejectLoading] = useState(false);
    const [blacklistLoading, setBlacklistLoading] = useState(false);


    const rejectOnClickHandle = async (event) => {
        setRejectLoading(true);
        try {
            await updateReportListItem(content.id, { ...content, is_active: false })
            updateReports();
        } catch (err) {

        }
        setRejectLoading(false);
    }

    const addBlacklistOnClickHandle = async (event) => {
        setBlacklistLoading(true);
        try {
            await deleteVehicle(Number(content.vehicle_id));
            const reports = allReports.filter((report) => Number(report.vehicle_id) === Number(content.vehicle_id));
            for (var j = 0; j < reports.length; j++) {
                await deleteReportListItem(Number(reports[j].id));
            }

            if (parkAreas.some((area) => Number(area.vehicle_id) === Number(content.vehicle_id) && area.is_full)) {
                const area = parkAreas.find((area) => Number(area.vehicle_id) === Number(content.vehicle_id) && area.is_full);
                await updateParkArea(Number(area.id), { ...area, vehicle_id: 0, is_full: false })
            }

            await createBlacklistItem({
                date: new Date(),
                parking_id: Number(content.parking_id),
                license_plate: vehicles.find((vehicle) => Number(vehicle.id) === Number(content.vehicle_id)).license_plate
            })

            const logs = allLogs.filter((log) => Number(log.vehicle_id) === Number(content.vehicle_id));
            for (var i = 0; i < logs.length; i++) {
                await deleteEntranceExitLog(Number(logs[i].id))
            }
        } catch (err) {
            console.log(err.toString());
        }
        updateReports();
        setBlacklistLoading(false);
    }

    return (
        <Card>
            <Card.Content >
                <Card.Header textAlign="center">{vehicles.find((vehicle) => vehicle.id.toString() === content.vehicle_id.toString()).license_plate}</Card.Header>
                <Divider />
                <Card.Description textAlign="center">
                    <WordBreaker>Parking name : <strong>{parkings.find((parking) => parking.id.toString() === content.parking_id.toString()).name}</strong></WordBreaker>
                    <WordBreaker>Reported By : <strong>{employees.find((employee) => employee.id.toString() === content.employee_id.toString()).full_name}</strong></WordBreaker>
                    <WordBreaker>Report Reason : <strong style={{ color: "red" }} >{content.report_reason}</strong></WordBreaker>
                    <WordBreaker>Report Time <br />
                        <DateFormatter date={new Date(content.date)} />
                    </WordBreaker>
                </Card.Description>
                <Card.Content extra textAlign="center">
                    <Button.Group>
                        <Button id={content.id} animated="fade" basic positive onClick={rejectOnClickHandle} loading={rejectLoading}>
                            <Button.Content visible>Reject</Button.Content>
                            <Button.Content hidden><Icon name="thumbs up outline" /></Button.Content>
                        </Button>
                        <Button id={content.id} animated="fade" basic negative onClick={addBlacklistOnClickHandle} loading={blacklistLoading}>
                            <Button.Content visible>Add Blacklist</Button.Content>
                            <Button.Content hidden><Icon name="times" /></Button.Content>
                        </Button>
                    </Button.Group>
                </Card.Content>
            </Card.Content>
        </Card>
    )
}

export default ParkingOwnerReportCard
