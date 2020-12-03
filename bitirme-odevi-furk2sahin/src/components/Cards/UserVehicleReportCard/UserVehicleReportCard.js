import React from 'react'
import { Card, Divider } from 'semantic-ui-react'
import DateFormatter from '../../DateFormatter/DateFormatter';
import { WordBreaker } from '../../WelcomeCard/Welcome.styles'

const UserVehicleReportCard = ({ content, vehicles, parkings, employees }) => {
    return (
        <Card>
            <div style={{ border: "5px solid", borderColor: content.is_active ? "greenyellow" : "red" }}>
                <Card.Content >
                    <Card.Header textAlign="center">{vehicles.find((vehicle) => vehicle.id.toString() === content.vehicle_id.toString()).license_plate}</Card.Header>
                    <Divider />
                    <Card.Description textAlign="center">
                        <WordBreaker>Parking name : <strong>{parkings.find((parking) => parking.id.toString() === content.parking_id.toString()).name}</strong></WordBreaker>
                        <WordBreaker>Reported By : <strong>{employees.find((employee) => employee.id.toString() === content.employee_id.toString()).full_name}</strong></WordBreaker>
                        <WordBreaker>Report Reason : <strong style={{ color: "red" }}>{content.report_reason}</strong></WordBreaker>
                        <WordBreaker>Report Time <br />
                            <DateFormatter date={new Date(content.date)} />
                        </WordBreaker>
                        <WordBreaker>Park Area Number : <strong>{content.id}</strong></WordBreaker>
                        <WordBreaker>Status : <strong>{content.is_active ? "Active" : "Forgiven"}</strong></WordBreaker>
                    </Card.Description>
                </Card.Content>
            </div>
        </Card>
    )
}

export default UserVehicleReportCard