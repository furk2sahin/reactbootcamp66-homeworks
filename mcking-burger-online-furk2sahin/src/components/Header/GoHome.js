import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom';
import HamburgerContext from '../../contexts/HamburgerContext';
import OrderContext from '../../contexts/OrderContext';
import { HomeButton } from './Header.styles'

const GoHome = () => {
    const history = useHistory();
    const { setSalad, setCheese, setMeat, setCurrentPrice } = useContext(HamburgerContext);
    const { setOrdered } = useContext(OrderContext);
    const homeButtonOnClick = () => {
        setSalad([]);
        setCheese([]);
        setMeat([]);
        setCurrentPrice(4);
        setOrdered(false);
        history.push("/home")
    }

    return (
        <HomeButton onClick={homeButtonOnClick}>Home</HomeButton>
    )
}

export default GoHome
