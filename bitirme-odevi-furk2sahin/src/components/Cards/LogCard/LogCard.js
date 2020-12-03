import React from 'react'
import { Card, Divider } from 'semantic-ui-react'
import DateFormatter from '../../DateFormatter/DateFormatter';
import { WordBreaker } from '../../WelcomeCard/Welcome.styles'
import { Log } from './Logs.styles';

const LogCard = ({ content, vehicles, parkings }) => {
    return (
        <Card>
            <div style={{ border: "5px solid", borderColor: content.exit_time === "Still inside" ? "greenyellow" : "red" }} >
                <Card.Content >
                    <Card.Header textAlign="center"><strong>
                        {vehicles.find((vehicle) => vehicle.id.toString() === content.vehicle_id.toString()).license_plate}
                    </strong>
                    </Card.Header>
                    <Divider />
                    <Card.Description>
                        <WordBreaker>Parking name  <Log>{parkings.find((parking) => parking.id.toString() === content.parking_id.toString()).name}</Log></WordBreaker>
                        <WordBreaker>Entrance Time
                            <Log>
                                <DateFormatter date={new Date(content.entrance_time)}></DateFormatter>
                            </Log>
                        </WordBreaker>
                        <WordBreaker>Exit time
                            <Log>
                                {content.exit_time !== "Still inside" ?
                                    <>
                                        <DateFormatter date={new Date(content.exit_time)} />
                                    </>
                                    : content.exit_time
                                }
                            </Log>
                        </WordBreaker>
                        <WordBreaker>Park Area Number  <Log>{content.park_area_number}</Log></WordBreaker>
                    </Card.Description>
                </Card.Content>
            </div>
        </Card>
    )
}

export default LogCard
