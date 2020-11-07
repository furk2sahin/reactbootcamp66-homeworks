import React from 'react'
import { Button } from 'react-bootstrap'

const NewGameButton = ({ onClickHandler, theme }) => {
    console.log(theme);
    return (
        <Button variant={theme === 'light' ? "warning" : "info"} size="lg" style={{ float: "right" }} onClick={onClickHandler}>
            New Game
        </Button>
    )
}

export default NewGameButton
