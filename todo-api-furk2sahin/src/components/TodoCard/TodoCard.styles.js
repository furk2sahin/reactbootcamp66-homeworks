import styled from 'styled-components';

export const Card = styled.div`
display:flex;
    border:1;
    border-color:red;
    padding: 10px;
    justify-content:space-between;
`

export const TitleInput = styled.input`
    padding:10px;
    border:none;
    background-color:#E5E7E9;
    font-size:20px;
    font-weight:bold;
    width:70%;
    transition-duration:300ms;
    &:focus{
        font-size:25px;
        background-color:#D3E1F0;
    }
`
export const Icon = styled.div`
    padding:10px;
    margin: 1px;
    cursor:pointer;
    &:hover{
        background-color:#E5E7E9;
    }
`