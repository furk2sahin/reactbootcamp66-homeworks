import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../FontawesomeIcons';
import React from 'react'
import './ToggleTheme.css'

const ToggleTheme = ({ toggleThemeOnClick, theme }) => {
    return (
        theme === 'light' ?
            < i className="icon-style" style={{ color: "black" }} >
                Light Theme < FontAwesomeIcon style={{ cursor: "pointer" }} icon="toggle-off" onClick={toggleThemeOnClick} />
            </i >
            :
            < i className="icon-style" style={{ color: "white" }}>
                Dark Theme < FontAwesomeIcon style={{ cursor: "pointer" }} icon="toggle-on" onClick={toggleThemeOnClick} />
            </i >
    )
}

export default ToggleTheme
