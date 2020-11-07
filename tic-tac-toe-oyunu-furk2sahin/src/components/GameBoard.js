import React, { useEffect, useState } from 'react'
import Characters from './Characters';
import Header from './Header/Header';
import ShowStatus from './ShowStatus/ShowStatus';
import NewGameButton from './NewGameButton/NewGameButton';
const GameBoard = ({ theme, toggleThemeOnClick }) => {
    const [characters, setCharacters] = useState(["_", "_", "_", "_", "_", "_", "_", "_", "_"]);
    const [isButtonClicked, setIsButtonClicked] = useState([false, false, false, false, false, false, false, false, false]);
    const [currentPlayer, setCurrentPlayer] = useState('X');
    const [winner, setWinner] = useState('');

    const newGameButtonOnClickHandler = () => {
        setCharacters((prevArray) => prevArray.map(() => '_'));
        setIsButtonClicked((prevArray) => prevArray.map(() => false));
        setCurrentPlayer('X');
        setWinner('');
    }

    // control if any changes on characters array
    useEffect(() => {
        if ((characters[4] === 'X' && ((characters[0] === 'X' && characters[8] === 'X')// 048
            || (characters[2] === 'X' && characters[6] === 'X') //246
            || (characters[1] === 'X' && characters[7] === 'X') //147
            || (characters[3] === 'X' && characters[5] === 'X'))) // 345
            || (characters[0] === 'X' && ((characters[1] === 'X' && characters[2] === 'X') // 012
                || (characters[3] === 'X' && characters[6] === 'X'))) // 036
            || (characters[8] === 'X' && ((characters[5] === 'X' && characters[2] === 'X') //  258
                || (characters[6] === 'X' && characters[7] === 'X')))) { // 345
            setWinner('X');
        } else if ((characters[4] === 'O' && ((characters[0] === 'O' && characters[8] === 'O')// 048
            || (characters[2] === 'O' && characters[6] === 'O') //246
            || (characters[1] === 'O' && characters[7] === 'O') //147
            || (characters[3] === 'O' && characters[5] === 'O'))) // 345
            || (characters[0] === 'O' && ((characters[1] === 'O' && characters[2] === 'O') // 012
                || (characters[3] === 'O' && characters[6] === 'O'))) // 036
            || (characters[8] === 'O' && ((characters[5] === 'O' && characters[2] === 'O') //  258
                || (characters[6] === 'O' && characters[7] === 'O')))) { // 345
            setWinner('O');
        } else if (characters.every((element) => element !== '_')) {
            setWinner('Draw');
        }
    }, [characters])

    const onClickHandler = (event) => {
        const index = parseInt(event.target.value);
        if (characters[index] !== 'X' && characters[index] !== 'O' && winner === '') {
            if (currentPlayer === 'X') {
                setCharacters((prevArray) => prevArray.map((item, i) => i === index ? 'X' : item));
                setIsButtonClicked(isButtonClicked.map((item, i) => i === index ? true : item));
                setCurrentPlayer('O');
            }
            else if (currentPlayer === 'O') {
                setCharacters((prevArray) => prevArray.map((item, i) => i === index ? 'O' : item));
                setIsButtonClicked(isButtonClicked.map((item, i) => i === index ? true : item));
                setCurrentPlayer('X');
            }
        }
    }
    return (
        <div>
            <Header toggleThemeOnClick={toggleThemeOnClick} theme={theme} /><br />
            <ShowStatus currentPlayer={currentPlayer} winner={winner} />
            <Characters characters={characters} theme={theme} isButtonClicked={isButtonClicked} onClickHandler={onClickHandler} /><br />
            <NewGameButton onClickHandler={newGameButtonOnClickHandler} theme={theme} />
        </div>
    )
}
export default GameBoard