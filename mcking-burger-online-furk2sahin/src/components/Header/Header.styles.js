import styled from 'styled-components';

export const Wrapper = styled.div`
    display:flex;
    justify-content: space-between;
    background-color: #a86332;
    padding: 1%;
`
export const Title = styled.h1`
    color: white;
    margin:0;
`
export const HomeButton = styled.button`
    border:2;
    float:right;
    margin:10px 10px 10px 0;
    height: 50px;
    width: 50px;
    background-color:#a86000;
    border-color:white;
    color:white;
    cursor:pointer;
    transition-duration:250ms;
    &:hover{
        height: 70px;
        width: 70px;
        margin:0 0 0 0;
        color:black;
        background-color:white;
        border-color: red;
    }
`