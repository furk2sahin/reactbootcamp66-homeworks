import React, { useContext } from 'react'
import {
    OrderButton,
    GridContainer,
    Wrapper,
    Ingredients,
    AddRemoveButton,
    Item,
    TotalPrice,
    Price,
    Minus,
    Plus,
    Order
} from './Footer.styled'
import INGREDIENT_UNIT_PRICES from '../../INGREDIENT_UNIT_PRICES';
import HamburgerContext from '../../contexts/HamburgerContext';
import { Cheese, Meat, Salad } from '../Ingredients';
import { useHistory } from 'react-router-dom';
import OrderContext from '../../contexts/OrderContext';
var uniqid = require('uniqid');

const Footer = () => {
    const history = useHistory();
    const { salad, setSalad, cheese, setCheese, meat, setMeat, currentPrice, setCurrentPrice } = useContext(HamburgerContext);
    const { setOrdered } = useContext(OrderContext);

    const plusButtonOnClick = (event) => {
        const value = event.target.value
        if (value === "salad") {
            setSalad((prevSalad) => [...prevSalad, <Salad key={uniqid()} />])
            setCurrentPrice((prevCurrentPrice) => prevCurrentPrice + INGREDIENT_UNIT_PRICES.salad)
        } else if (value === "cheese") {
            setCheese((prevCheese) => [...prevCheese, <Cheese key={uniqid()} />])
            setCurrentPrice((prevCurrentPrice) => prevCurrentPrice + INGREDIENT_UNIT_PRICES.cheese)
        } else if (value === "meat") {
            setMeat((prevMeat) => [...prevMeat, <Meat key={uniqid()} />])
            setCurrentPrice((prevCurrentPrice) => prevCurrentPrice + INGREDIENT_UNIT_PRICES.meat)
        }
    }

    const minusButtonOnClick = (event) => {
        const value = event.target.value;
        if (value === "salad") {
            setSalad((prevSalad) => prevSalad.slice(0, -1))
            setCurrentPrice((prevCurrentPrice) => prevCurrentPrice - INGREDIENT_UNIT_PRICES.salad)
        } else if (value === "cheese") {
            setCheese((prevCheese) => prevCheese.slice(0, -1))
            setCurrentPrice((prevCurrentPrice) => prevCurrentPrice - INGREDIENT_UNIT_PRICES.cheese)
        } else if (value === "meat") {
            setMeat((prevMeat) => prevMeat.slice(0, -1))
            setCurrentPrice((prevCurrentPrice) => prevCurrentPrice - INGREDIENT_UNIT_PRICES.meat)
        }
    }

    const orderOnClickHandler = () => {
        setOrdered(true);
        history.push('/result')
    }

    return (
        <Wrapper>
            <GridContainer>
                <Price>Current Price: <b>$ {currentPrice.toFixed(2)}</b></Price>
                <Ingredients>
                    <Item>
                        <b>Salad ($ {INGREDIENT_UNIT_PRICES.salad.toFixed(2)}):</b>
                    </Item>
                    <Item>
                        <b>Cheese ($ {INGREDIENT_UNIT_PRICES.cheese.toFixed(2)}):</b>
                    </Item>
                    <Item>
                        <b>Meat ($ {INGREDIENT_UNIT_PRICES.meat.toFixed(2)}):</b>
                    </Item>
                </Ingredients>
                <AddRemoveButton>
                    <Item>
                        {salad.length === 0 ?
                            <Minus value="salad" onClick={minusButtonOnClick} style={{ pointerEvents: "none" }}>-</Minus> :
                            <Minus value="salad" onClick={minusButtonOnClick} style={{ cursor: "pointer", backgroundColor: "white" }}>-</Minus>
                        }
                        <b>{salad.length}</b>
                        <Plus value="salad" onClick={plusButtonOnClick}>+</Plus>
                    </Item>
                    <Item>
                        {cheese.length === 0 ?
                            <Minus value="cheese" onClick={minusButtonOnClick} style={{ pointerEvents: "none" }}>-</Minus> :
                            <Minus value="cheese" onClick={minusButtonOnClick} style={{ cursor: "pointer", backgroundColor: "white" }}>-</Minus>
                        }
                        <b>{cheese.length}</b>
                        <Plus value="cheese" onClick={plusButtonOnClick}>+</Plus>
                    </Item>
                    <Item>
                        {meat.length === 0 ?
                            <Minus value="meat" onClick={minusButtonOnClick} style={{ pointerEvents: "none" }}>-</Minus> :
                            <Minus value="meat" onClick={minusButtonOnClick} style={{ cursor: "pointer", backgroundColor: "white" }}>-</Minus>
                        }
                        <b>{meat.length}</b>
                        <Plus value="meat" onClick={plusButtonOnClick}>+</Plus>
                    </Item>
                </AddRemoveButton>
                <TotalPrice>
                    <Item>
                        Total Price: <b>$ {(salad.length * INGREDIENT_UNIT_PRICES.salad).toFixed(2)}</b>
                    </Item>
                    <Item>
                        Total Price: <b>$ {(cheese.length * INGREDIENT_UNIT_PRICES.cheese).toFixed(2)}</b>
                    </Item>
                    <Item>
                        Total Price: <b>$ {(meat.length * INGREDIENT_UNIT_PRICES.meat).toFixed(2)}</b>
                    </Item>
                </TotalPrice>
                <OrderButton>
                    {(salad.length + cheese.length + meat.length) === 0 ?
                        <Order style={{ backgroundColor: "gray", pointerEvents: "none" }}>ORDER</Order> :
                        <Order onClick={orderOnClickHandler} style={{ backgroundColor: "#e09e19", cursor: "pointer" }}>ORDER</Order>
                    }
                </OrderButton>
            </GridContainer>
        </Wrapper >
    )
}

export default Footer
