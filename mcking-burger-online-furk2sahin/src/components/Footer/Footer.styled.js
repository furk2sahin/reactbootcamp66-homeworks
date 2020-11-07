import styled from 'styled-components'

export const Wrapper = styled.div`
    background-color: #D76516;
    padding: 2%;
    display:flex;    
`
export const GridContainer = styled.div`
    display:grid;
    grid-template-areas:
        'price price price'
        'ingredient addRemove totalPrice'
        'ingredient addRemove totalPrice'
        'order order order';
    margin:0 auto;
`

export const Price = styled.div`
    grid-area: price;
    margin: 0 auto;
`

export const Ingredients = styled.div`
    grid-area: ingredient;
`

export const AddRemoveButton = styled.div`
    grid-area: addRemove;
`

export const TotalPrice = styled.div`
    grid-area: totalPrice;
`

export const OrderButton = styled.div`
    grid-area: order;
    margin: 0 auto;
`

export const Plus = styled.button`
    width:70px;
    margin-left:10px;
    color:black;
    background-color:#CBD716;
    cursor:pointer;
`

export const Minus = styled.button`
    width:70px;
    margin-right:10px;
    border:0
    color:#d4d2c9;
    background-color:#8f8e8b
`

export const Order = styled.button`
    width:100px;
    height:30px;
    border:0;
`

export const Item = styled.div`
    margin:15px;
`
