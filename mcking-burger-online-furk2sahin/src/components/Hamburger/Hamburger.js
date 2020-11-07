import React, { useContext } from 'react'
import HamburgerContext from '../../contexts/HamburgerContext';
import { BreadBottom, BreadTop } from '../Ingredients'
import { HamburgerDiv, MessageDiv, Wrapper } from './Hamburger.styles'

const Hamburger = () => {
    const { salad, cheese, meat } = useContext(HamburgerContext);
    return (
        < Wrapper >
            < HamburgerDiv >
                <BreadTop />
                {cheese.length === 0 && salad.length === 0 && meat.length === 0 ?
                    <MessageDiv>"Please start adding ingredients!"</MessageDiv> :
                    <>
                        {cheese}
                        {salad}
                        {meat}
                    </>
                }
                <BreadBottom />
            </HamburgerDiv >
        </Wrapper >
    )
}

export default Hamburger
