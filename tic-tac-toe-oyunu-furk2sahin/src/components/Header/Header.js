import React from 'react'
import ToggleTheme from '../ToggleTheme/ToggleTheme'

const Header = ({ toggleThemeOnClick, theme }) => {
    return (
        <>
            <ToggleTheme toggleThemeOnClick={toggleThemeOnClick} theme={theme} />
            <br />
            <h1 style={{ color: theme === 'light' ? 'black' : 'white' }}>TIC TAC TOE</h1>
        </>
    )
}

export default Header
