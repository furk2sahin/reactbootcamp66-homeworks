import React, { useContext } from 'react'
import Hamburger from '../../components/Hamburger/Hamburger'
import GoHome from '../../components/Header/GoHome'
import HamburgerContext from '../../contexts/HamburgerContext'
import { ResultMessage, Wrapper } from './Result.styled'

const Result = () => {
    const { currentPrice } = useContext(HamburgerContext);
    return (
        <Wrapper>
            <GoHome />
            <Hamburger />
            <ResultMessage>Your hamburger is ready! Price: $ {currentPrice.toFixed(2)}</ResultMessage>
        </Wrapper>
    )
}

export default Result
