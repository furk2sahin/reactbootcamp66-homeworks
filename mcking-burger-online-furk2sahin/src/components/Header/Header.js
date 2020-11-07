import React from 'react'
import { Title, Wrapper } from './Header.styles'
import GoHome from './GoHome'


const Header = () => {
    return (
        <Wrapper>
            <Title>McKing Burger</Title>
            <GoHome />
        </Wrapper>
    )
}

export default Header
