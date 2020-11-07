import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import './CharacterCard.css'
const CharacterCard = ({ index, theme, isButtonClicked, character, onClickHandler }) => {
    return (
        <button className={theme === 'light' ? (isButtonClicked ? 'grid-div-clicked-light' : 'grid-div-light') : (isButtonClicked ? 'grid-div-clicked-dark' : 'grid-div-dark')} value={index}
            onClick={onClickHandler}>
            {character === 'X' ? <FontAwesomeIcon icon='times' /> :
                character === 'O' ? <FontAwesomeIcon icon="dot-circle" /> : character}
        </button>
    )
}

export default CharacterCard
