import styled from 'styled-components';

export const Wrapper = styled.div`
    display:flex;
    justify-content:space-between;
    padding: 1%;
`

export const Input = styled.input`
    border:5px double #D89124;
    background-color:#E1EAC8;
    font-size:17px;
    font-weight:bold;
    width:75%;
    padding:2%;
`

export const Button = styled.button`
    border: 2px dotted black;
    background-color:#D8BD24;
    font-weight:bold;
    cursor:pointer;
    font-size:20px;
    &:hover{
        border-style:solid;
    }
`