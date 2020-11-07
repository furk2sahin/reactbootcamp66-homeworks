import React from 'react'
import CharacterCard from './CharacterCard/CharacterCard';
import './Characters.css'

const Characters = ({ characters, theme, isButtonClicked, onClickHandler }) => {
    return (
        <div className="grid-container" style={{ backgroundColor: theme === 'light' ? '#E5A192' : 'black' }}>
            {
                characters.map((character, index) => {
                    return <CharacterCard index={index} theme={theme} isButtonClicked={isButtonClicked[index]} character={character} onClickHandler={onClickHandler} key={index} />
                })
            }
        </div>
    )
}

export default Characters