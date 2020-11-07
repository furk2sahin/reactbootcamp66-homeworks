import React from 'react'
import { Alert, Container } from 'react-bootstrap'

const ShowStatus = ({ currentPlayer, winner }) => {
    return (
        <Container fluid>
            {winner === 'X' ?
                <Alert variant="success">X Won!</Alert> :
                winner === 'O' ?
                    <Alert variant="success">O Won!</Alert> :
                    winner === 'Draw' ?
                        <Alert variant="danger">Draw!</Alert> :
                        currentPlayer === 'X' ?
                            <Alert variant="info">Your turn X!</Alert> :
                            currentPlayer === 'O' ?
                                <Alert variant="warning">Your turn O!</Alert> : null

            }
        </Container>
    )
}

export default ShowStatus
